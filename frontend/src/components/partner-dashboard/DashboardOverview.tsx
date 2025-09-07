'use client';

import { Suspense, lazy } from 'react';
import { DASHBOARD_FEATURES, PARTNERSHIP_RESTRICTIONS } from '@/data/partnershipData';
import { LazyBuilding2, LazyBarChart3, LazyCalendar, LazyUsers, LazyShield, LazyDollarSign, LazyCheckCircle, LazyGlobe, LazySmartphone, LazySettings } from '@/components/icons/LazyIcons';

// Lazy load heavy components
const PartnershipModelSelector = lazy(() => import('./PartnershipModelSelector'));
const QuickStats = lazy(() => import('./QuickStats'));
const AccessMethods = lazy(() => import('./AccessMethods'));

interface DashboardOverviewProps {
  partnershipModel: string;
  setPartnershipModel: (model: string) => void;
}

export default function DashboardOverview({ partnershipModel, setPartnershipModel }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded mb-6" />}>
        <QuickStats partnershipModel={partnershipModel} />
      </Suspense>

      {/* Access Methods */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded" />}>
        <AccessMethods partnershipModel={partnershipModel} />
      </Suspense>
    </div>
  );
}