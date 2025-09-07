# WebSocket Setup for Serai Management Dashboard

## 🚀 Quick Start

The Serai Management Dashboard now includes WebSocket support for real-time synchronization. Here's how to set it up:

### 1. **Backend WebSocket Server**

The WebSocket server is already integrated into the main backend server. To start it:

```bash
cd backend
npm run dev
```

The WebSocket server will start on the same port as your backend server (default: 4001).

### 2. **Frontend Connection**

The frontend will automatically attempt to connect to the WebSocket server. If the server is not running, the dashboard will fall back to mock data mode.

### 3. **Connection Status**

You'll see the connection status in the top-right corner of the management dashboard:
- 🟢 **Green dot**: Connected to WebSocket server
- 🔴 **Red dot**: Disconnected (using mock data)

## 🔧 Configuration

### Environment Variables

Add these to your `.env` file:

```env
# WebSocket Configuration
WS_PORT=4001
WS_URL=ws://localhost:4001

# JWT Secret for WebSocket authentication
JWT_SECRET=your-jwt-secret-key
```

### WebSocket URL

The WebSocket connection URL is automatically configured to use the same port as your backend server. If you need to change it, update the `WebSocketProvider` in `/frontend/src/contexts/WebSocketContext.tsx`.

## 📱 Features

### Real-Time Synchronization
- **Live Updates**: Changes in the management dashboard sync to partner dashboards
- **Bidirectional Sync**: Partner changes sync back to management
- **Auto-Reconnection**: Automatically reconnects if connection is lost

### Fallback Mode
- **Mock Data**: When WebSocket is not available, the dashboard uses mock data
- **Full Functionality**: All features work in both connected and offline modes
- **Seamless Experience**: No interruption to user workflow

## 🛠️ Development

### Testing WebSocket Connection

1. **Start Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Check Connection**: Look for the connection indicator in the management dashboard

### WebSocket Events

The WebSocket server supports these events:

- **Connection**: Client authentication and room subscription
- **Sync**: Data synchronization between dashboards
- **Update**: Real-time data updates
- **Notification**: System notifications and alerts

### Debugging

Check the browser console for WebSocket connection logs:
- `WebSocket connected` - Successfully connected
- `WebSocket disconnected` - Connection lost
- `WebSocket error` - Connection error
- `WebSocket not connected, using mock data` - Fallback mode

## 🚨 Troubleshooting

### Common Issues

1. **"useWebSocket must be used within a WebSocketProvider"**
   - **Solution**: The WebSocketProvider is now properly set up in the layout

2. **WebSocket Connection Failed**
   - **Check**: Backend server is running
   - **Check**: Port 4001 is available
   - **Check**: No firewall blocking the connection

3. **Mock Data Mode**
   - **Normal**: This is expected when WebSocket server is not running
   - **Features**: All dashboard features work with mock data

### Connection Issues

If you're having connection issues:

1. **Verify Backend**: Make sure the backend server is running
2. **Check Ports**: Ensure port 4001 is not blocked
3. **Browser Console**: Check for WebSocket errors
4. **Network**: Verify localhost connectivity

## 📊 Monitoring

### Connection Status
- **Connected**: Real-time sync active
- **Disconnected**: Using mock data
- **Error**: Connection failed, retrying

### Sync Status
- **Last Sync**: Timestamp of last successful sync
- **Sync Count**: Number of sync operations
- **Error**: Any sync errors

## 🎯 Next Steps

1. **Start the Backend**: Run `npm run dev` in the backend directory
2. **Open Dashboard**: Navigate to `http://localhost:4000/serai-management-dashboard`
3. **Check Connection**: Look for the green connection indicator
4. **Test Features**: Try the sync button and real-time updates

The dashboard will work perfectly with or without the WebSocket server running!
