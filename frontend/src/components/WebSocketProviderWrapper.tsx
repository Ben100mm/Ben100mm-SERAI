'use client';

import { WebSocketProvider } from '@/contexts/WebSocketContext';

interface WebSocketProviderWrapperProps {
  children: React.ReactNode;
}

export default function WebSocketProviderWrapper({ children }: WebSocketProviderWrapperProps) {
  return (
    <WebSocketProvider>
      {children}
    </WebSocketProvider>
  );
}
