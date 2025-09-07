const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map(); // Store connected clients
    this.rooms = new Map(); // Store room subscriptions
    
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.wss.on('connection', (ws, req) => {
      console.log('New WebSocket connection attempt');
      
      // Extract token from query parameters or headers
      const token = this.extractToken(req);
      
      if (!token) {
        ws.close(1008, 'Authentication required');
        return;
      }

      try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const clientId = decoded.userId;
        const userRole = decoded.role;

        // Store client information
        this.clients.set(ws, {
          id: clientId,
          role: userRole,
          connectedAt: new Date(),
          subscriptions: new Set()
        });

        console.log(`Client ${clientId} (${userRole}) connected`);

        // Send welcome message
        this.sendMessage(ws, {
          type: 'connection',
          data: { 
            status: 'connected',
            clientId,
            role: userRole,
            timestamp: Date.now()
          },
          timestamp: Date.now(),
          source: 'system'
        });

        // Handle incoming messages
        ws.on('message', (message) => {
          try {
            const data = JSON.parse(message);
            this.handleMessage(ws, data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
            this.sendError(ws, 'Invalid message format');
          }
        });

        // Handle client disconnect
        ws.on('close', () => {
          console.log(`Client ${clientId} disconnected`);
          this.clients.delete(ws);
          this.cleanupSubscriptions(ws);
        });

        // Handle errors
        ws.on('error', (error) => {
          console.error(`WebSocket error for client ${clientId}:`, error);
          this.clients.delete(ws);
          this.cleanupSubscriptions(ws);
        });

      } catch (error) {
        console.error('JWT verification failed:', error);
        ws.close(1008, 'Invalid token');
      }
    });
  }

  extractToken(req) {
    // Try to get token from query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const tokenFromQuery = url.searchParams.get('token');
    
    if (tokenFromQuery) {
      return tokenFromQuery;
    }

    // Try to get token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return null;
  }

  handleMessage(ws, message) {
    const client = this.clients.get(ws);
    if (!client) return;

    const { type, data } = message;

    switch (type) {
      case 'subscribe':
        this.handleSubscribe(ws, data);
        break;
      case 'unsubscribe':
        this.handleUnsubscribe(ws, data);
        break;
      case 'sync':
        this.handleSync(ws, data);
        break;
      case 'update':
        this.handleUpdate(ws, data);
        break;
      case 'notification':
        this.handleNotification(ws, data);
        break;
      default:
        this.sendError(ws, `Unknown message type: ${type}`);
    }
  }

  handleSubscribe(ws, data) {
    const client = this.clients.get(ws);
    if (!client) return;

    const { room } = data;
    if (!room) {
      this.sendError(ws, 'Room is required for subscription');
      return;
    }

    // Add to client's subscriptions
    client.subscriptions.add(room);

    // Add to room
    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }
    this.rooms.get(room).add(ws);

    console.log(`Client ${client.id} subscribed to room: ${room}`);

    this.sendMessage(ws, {
      type: 'subscription',
      data: { room, status: 'subscribed' },
      timestamp: Date.now(),
      source: 'system'
    });
  }

  handleUnsubscribe(ws, data) {
    const client = this.clients.get(ws);
    if (!client) return;

    const { room } = data;
    if (!room) return;

    // Remove from client's subscriptions
    client.subscriptions.delete(room);

    // Remove from room
    if (this.rooms.has(room)) {
      this.rooms.get(room).delete(ws);
      if (this.rooms.get(room).size === 0) {
        this.rooms.delete(room);
      }
    }

    console.log(`Client ${client.id} unsubscribed from room: ${room}`);

    this.sendMessage(ws, {
      type: 'subscription',
      data: { room, status: 'unsubscribed' },
      timestamp: Date.now(),
      source: 'system'
    });
  }

  handleSync(ws, data) {
    const client = this.clients.get(ws);
    if (!client) return;

    const { action, dataType } = data;

    if (action === 'request') {
      // Handle sync request
      this.handleSyncRequest(ws, dataType);
    } else if (action === 'update') {
      // Handle sync update
      this.handleSyncUpdate(ws, data);
    }
  }

  handleSyncRequest(ws, dataType) {
    // In a real implementation, this would fetch data from the database
    // and send it back to the client
    const mockData = this.getMockData(dataType);
    
    this.sendMessage(ws, {
      type: 'sync',
      data: {
        action: 'update',
        dataType,
        payload: mockData
      },
      timestamp: Date.now(),
      source: 'system'
    });
  }

  handleSyncUpdate(ws, data) {
    const client = this.clients.get(ws);
    if (!client) return;

    // Broadcast update to relevant subscribers
    this.broadcastToRoom('management-dashboard', {
      type: 'sync',
      data: {
        action: 'update',
        dataType: data.dataType,
        payload: data.payload
      },
      timestamp: Date.now(),
      source: 'management'
    });

    // Also broadcast to partner dashboard if it's partner-related data
    if (data.dataType === 'partners' || data.dataType === 'properties') {
      this.broadcastToRoom('partner-dashboard', {
        type: 'sync',
        data: {
          action: 'update',
          dataType: data.dataType,
          payload: data.payload
        },
        timestamp: Date.now(),
        source: 'management'
      });
    }
  }

  handleUpdate(ws, data) {
    const client = this.clients.get(ws);
    if (!client) return;

    const { entity, id, data: updateData } = data;

    // Broadcast update to relevant subscribers
    this.broadcastToRoom('management-dashboard', {
      type: 'update',
      data: {
        entity,
        id,
        data: updateData
      },
      timestamp: Date.now(),
      source: 'management'
    });

    // Broadcast to partner dashboard if it's partner-related
    if (entity === 'partner' || entity === 'property') {
      this.broadcastToRoom('partner-dashboard', {
        type: 'update',
        data: {
          entity,
          id,
          data: updateData
        },
        timestamp: Date.now(),
        source: 'management'
      });
    }
  }

  handleNotification(ws, data) {
    const client = this.clients.get(ws);
    if (!client) return;

    const { title, message, target } = data;

    // Send notification to target room or broadcast
    if (target) {
      this.broadcastToRoom(target, {
        type: 'notification',
        data: { title, message, from: client.id },
        timestamp: Date.now(),
        source: 'management'
      });
    } else {
      // Broadcast to all connected clients
      this.broadcastToAll({
        type: 'notification',
        data: { title, message, from: client.id },
        timestamp: Date.now(),
        source: 'management'
      });
    }
  }

  sendMessage(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  sendError(ws, errorMessage) {
    this.sendMessage(ws, {
      type: 'error',
      data: { message: errorMessage },
      timestamp: Date.now(),
      source: 'system'
    });
  }

  broadcastToRoom(room, message) {
    if (this.rooms.has(room)) {
      this.rooms.get(room).forEach(ws => {
        this.sendMessage(ws, message);
      });
    }
  }

  broadcastToAll(message) {
    this.clients.forEach((client, ws) => {
      this.sendMessage(ws, message);
    });
  }

  cleanupSubscriptions(ws) {
    this.rooms.forEach((clients, room) => {
      clients.delete(ws);
      if (clients.size === 0) {
        this.rooms.delete(room);
      }
    });
  }

  getMockData(dataType) {
    // Mock data for different data types
    const mockData = {
      partners: [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          partnershipModel: 'Master Lease',
          properties: 3,
          revenue: 25500,
          status: 'Active'
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
          partnershipModel: 'Revenue Share',
          properties: 7,
          revenue: 42300,
          status: 'Active'
        }
      ],
      properties: [
        {
          id: '1',
          name: 'Luxury Resort - Bali',
          status: 'Active',
          revenue: 8500,
          occupancy: 98
        },
        {
          id: '2',
          name: 'Boutique Hotel - Paris',
          status: 'Maintenance',
          revenue: 12300,
          occupancy: 92
        }
      ],
      revenue: {
        total: 2400000,
        partnerPayouts: 1800000,
        platformFees: 600000,
        profitMargin: 18
      },
      guestExperience: {
        satisfaction: 4.8,
        responseTime: 2.3,
        issueResolution: 94,
        reviewScore: 4.7
      },
      operations: {
        taskCompletion: 94,
        staffPerformance: 89,
        qualityScore: 4.6,
        efficiencyMetrics: 87
      }
    };

    return mockData[dataType] || {};
  }

  // Public methods for external use
  notifyPartners(partnerIds, message) {
    partnerIds.forEach(partnerId => {
      this.broadcastToRoom(`partner-${partnerId}`, message);
    });
  }

  notifyManagement(message) {
    this.broadcastToRoom('management-dashboard', message);
  }

  getConnectedClients() {
    return Array.from(this.clients.values());
  }

  getRoomSubscribers(room) {
    return this.rooms.get(room)?.size || 0;
  }
}

module.exports = WebSocketServer;
