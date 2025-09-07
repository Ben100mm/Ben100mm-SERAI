'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface WebSocketMessage {
  type: 'sync' | 'notification' | 'update' | 'error';
  data: any;
  timestamp: number;
  source: 'management' | 'partner' | 'system';
}

interface WebSocketContextType {
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;
  sendMessage: (message: WebSocketMessage) => void;
  subscribe: (callback: (message: WebSocketMessage) => void) => () => void;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: React.ReactNode;
  url?: string;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ 
  children, 
  url = 'ws://localhost:3001' 
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [subscribers, setSubscribers] = useState<Set<(message: WebSocketMessage) => void>>(new Set());

  const connect = useCallback(() => {
    if (socket?.readyState === WebSocket.OPEN) return;

    setConnectionStatus('connecting');
    
    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionStatus('connected');
        setSocket(ws);
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          setLastMessage(message);
          
          // Notify all subscribers
          subscribers.forEach(callback => {
            try {
              callback(message);
            } catch (error) {
              console.error('Error in WebSocket subscriber:', error);
            }
          });
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        setConnectionStatus('disconnected');
        setSocket(null);
        
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          if (connectionStatus !== 'connected') {
            connect();
          }
        }, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
        setIsConnected(false);
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionStatus('error');
      setIsConnected(false);
      
      // Retry connection after 10 seconds
      setTimeout(() => {
        connect();
      }, 10000);
    }
  }, [url, subscribers, connectionStatus]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
      setIsConnected(false);
      setConnectionStatus('disconnected');
    }
  }, [socket]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected. Message not sent:', message);
    }
  }, [socket]);

  const subscribe = useCallback((callback: (message: WebSocketMessage) => void) => {
    setSubscribers(prev => new Set(Array.from(prev).concat(callback)));
    
    // Return unsubscribe function
    return () => {
      setSubscribers(prev => {
        const newSet = new Set(prev);
        newSet.delete(callback);
        return newSet;
      });
    };
  }, []);

  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const value: WebSocketContextType = {
    isConnected,
    lastMessage,
    sendMessage,
    subscribe,
    connectionStatus
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hooks for specific message types
export const useSyncData = () => {
  const { subscribe, sendMessage } = useWebSocket();
  const [syncData, setSyncData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = subscribe((message) => {
      if (message.type === 'sync') {
        setSyncData(message.data);
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const requestSync = useCallback((dataType: string) => {
    sendMessage({
      type: 'sync',
      data: { action: 'request', dataType },
      timestamp: Date.now(),
      source: 'management'
    });
  }, [sendMessage]);

  const sendSyncUpdate = useCallback((data: any) => {
    sendMessage({
      type: 'sync',
      data: { action: 'update', payload: data },
      timestamp: Date.now(),
      source: 'management'
    });
  }, [sendMessage]);

  return { syncData, requestSync, sendSyncUpdate };
};

export const useNotifications = () => {
  const { subscribe, sendMessage } = useWebSocket();
  const [notifications, setNotifications] = useState<WebSocketMessage[]>([]);

  useEffect(() => {
    const unsubscribe = subscribe((message) => {
      if (message.type === 'notification') {
        setNotifications(prev => [message, ...prev].slice(0, 50)); // Keep last 50 notifications
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const sendNotification = useCallback((title: string, message: string, target?: string) => {
    sendMessage({
      type: 'notification',
      data: { title, message, target },
      timestamp: Date.now(),
      source: 'management'
    });
  }, [sendMessage]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return { notifications, sendNotification, clearNotifications };
};

export const useRealTimeUpdates = () => {
  const { subscribe, sendMessage } = useWebSocket();
  const [updates, setUpdates] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    const unsubscribe = subscribe((message) => {
      if (message.type === 'update') {
        const { entity, id, data } = message.data;
        const key = `${entity}-${id}`;
        setUpdates(prev => new Map(prev.set(key, { ...data, timestamp: message.timestamp })));
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const sendUpdate = useCallback((entity: string, id: string, data: any) => {
    sendMessage({
      type: 'update',
      data: { entity, id, data },
      timestamp: Date.now(),
      source: 'management'
    });
  }, [sendMessage]);

  const getUpdate = useCallback((entity: string, id: string) => {
    const key = `${entity}-${id}`;
    return updates.get(key);
  }, [updates]);

  return { updates, sendUpdate, getUpdate };
};
