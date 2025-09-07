'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWebSocket, useSyncData, useNotifications, useRealTimeUpdates } from '../contexts/WebSocketContext';

interface DashboardSyncData {
  partners: any[];
  properties: any[];
  revenue: any;
  guestExperience: any;
  operations: any;
  lastSync: number;
}

interface SyncStatus {
  isSyncing: boolean;
  lastSyncTime: number | null;
  error: string | null;
  syncCount: number;
}

export const useDashboardSync = () => {
  const { isConnected, connectionStatus } = useWebSocket();
  const { syncData, requestSync, sendSyncUpdate } = useSyncData();
  const { notifications, sendNotification } = useNotifications();
  const { updates, sendUpdate, getUpdate } = useRealTimeUpdates();
  
  const [dashboardData, setDashboardData] = useState<DashboardSyncData>({
    partners: [],
    properties: [],
    revenue: {},
    guestExperience: {},
    operations: {},
    lastSync: 0
  });
  
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isSyncing: false,
    lastSyncTime: null,
    error: null,
    syncCount: 0
  });

  // Sync all dashboard data
  const syncAllData = useCallback(async () => {
    setSyncStatus(prev => ({ ...prev, isSyncing: true, error: null }));

    try {
      if (isConnected) {
        // Request sync for all data types via WebSocket
        const dataTypes = ['partners', 'properties', 'revenue', 'guestExperience', 'operations'];
        
        for (const dataType of dataTypes) {
          requestSync(dataType);
        }

        // Send notification about successful sync
        sendNotification(
          'Dashboard Sync Complete',
          'All dashboard data has been synchronized successfully',
          'management-dashboard'
        );
      } else {
        // Fallback to mock data when WebSocket is not available
        console.log('WebSocket not connected, using mock data');
        
        // Simulate API calls for mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDashboardData(prev => ({
          ...prev,
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
          },
          lastSync: Date.now()
        }));
      }

      setSyncStatus(prev => ({
        ...prev,
        lastSyncTime: Date.now(),
        syncCount: prev.syncCount + 1,
        isSyncing: false
      }));

    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Sync failed',
        isSyncing: false
      }));
    }
  }, [isConnected, requestSync, sendNotification]);

  // Sync specific data type
  const syncDataType = useCallback(async (dataType: string) => {
    setSyncStatus(prev => ({ ...prev, isSyncing: true, error: null }));

    try {
      if (isConnected) {
        requestSync(dataType);
      } else {
        // Fallback to mock data for specific data type
        console.log(`WebSocket not connected, using mock data for ${dataType}`);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      setSyncStatus(prev => ({
        ...prev,
        lastSyncTime: Date.now(),
        syncCount: prev.syncCount + 1,
        isSyncing: false
      }));

    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Sync failed',
        isSyncing: false
      }));
    }
  }, [isConnected, requestSync]);

  // Send update to partner dashboard
  const sendPartnerUpdate = useCallback((updateType: string, data: any) => {
    sendUpdate('partner-dashboard', updateType, data);
    
    // Also send notification
    sendNotification(
      'Partner Dashboard Updated',
      `${updateType} has been updated and synchronized`,
      'partner-dashboard'
    );
  }, [sendUpdate, sendNotification]);

  // Send update to specific partner
  const sendPartnerSpecificUpdate = useCallback((partnerId: string, updateType: string, data: any) => {
    sendUpdate(`partner-${partnerId}`, updateType, data);
    
    sendNotification(
      'Partner Update Sent',
      `Update sent to partner ${partnerId}`,
      `partner-${partnerId}`
    );
  }, [sendUpdate, sendNotification]);

  // Handle incoming sync data
  useEffect(() => {
    if (syncData) {
      const { action, dataType, payload } = syncData;
      
      if (action === 'update' && payload) {
        setDashboardData(prev => ({
          ...prev,
          [dataType]: payload,
          lastSync: Date.now()
        }));
      }
    }
  }, [syncData]);

  // Handle real-time updates
  useEffect(() => {
    if (updates.size > 0) {
      // Process updates and update dashboard data
      const newData = { ...dashboardData };
      
      updates.forEach((update, key) => {
        const [entity, id] = key.split('-');
        
        if (entity === 'partner') {
          // Update partner data
          const partnerIndex = newData.partners.findIndex((p: any) => p.id === id);
          if (partnerIndex !== -1) {
            newData.partners[partnerIndex] = { ...newData.partners[partnerIndex], ...update };
          }
        } else if (entity === 'property') {
          // Update property data
          const propertyIndex = newData.properties.findIndex((p: any) => p.id === id);
          if (propertyIndex !== -1) {
            newData.properties[propertyIndex] = { ...newData.properties[propertyIndex], ...update };
          }
        }
      });
      
      setDashboardData(newData);
    }
  }, [updates, dashboardData]);

  // Auto-sync on connection
  useEffect(() => {
    if (isConnected && connectionStatus === 'connected') {
      // Initial sync when connected
      syncAllData();
      
      // Set up periodic sync (every 5 minutes)
      const interval = setInterval(() => {
        syncAllData();
      }, 5 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [isConnected, connectionStatus, syncAllData]);

  // Connection status monitoring
  useEffect(() => {
    if (connectionStatus === 'error') {
      setSyncStatus(prev => ({
        ...prev,
        error: 'WebSocket connection error',
        isSyncing: false
      }));
    } else if (connectionStatus === 'disconnected') {
      setSyncStatus(prev => ({
        ...prev,
        error: 'WebSocket disconnected',
        isSyncing: false
      }));
    }
  }, [connectionStatus]);

  return {
    // Data
    dashboardData,
    syncStatus,
    notifications,
    
    // Connection status
    isConnected,
    connectionStatus,
    
    // Sync functions
    syncAllData,
    syncDataType,
    sendPartnerUpdate,
    sendPartnerSpecificUpdate,
    
    // Real-time updates
    getUpdate,
    
    // Status helpers
    isDataStale: () => {
      const now = Date.now();
      const staleThreshold = 10 * 60 * 1000; // 10 minutes
      return !syncStatus.lastSyncTime || (now - syncStatus.lastSyncTime) > staleThreshold;
    },
    
    getLastSyncTime: () => {
      return syncStatus.lastSyncTime ? new Date(syncStatus.lastSyncTime).toLocaleString() : 'Never';
    }
  };
};
