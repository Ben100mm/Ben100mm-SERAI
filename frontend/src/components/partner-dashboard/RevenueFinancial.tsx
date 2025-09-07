'use client';

import { LazyBarChart3, LazyTrendingUp, LazySettings, LazyFileText, LazyUsers, LazyShield } from '@/components/icons/LazyIcons';
import { PARTNERSHIP_RESTRICTIONS } from '@/data/partnershipData';

interface RevenueFinancialProps {
  partnershipModel: string;
}

export default function RevenueFinancial({ partnershipModel }: RevenueFinancialProps) {
  const isLimitedRevenue = PARTNERSHIP_RESTRICTIONS[partnershipModel as keyof typeof PARTNERSHIP_RESTRICTIONS].limitedFeatures.includes('revenue-financial');
  const isMasterLease = partnershipModel === 'Master Lease';
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Revenue & Financial Management</h2>
        <p className="text-gray-600 mb-6">Track earnings, manage pricing, and access comprehensive financial reports.</p>
        
        {/* Partnership-specific notices */}
        {isMasterLease && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <LazyShield className="h-5 w-5 text-gray-700 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Master Lease - Fixed Rent</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Under your Master Lease agreement, you receive a guaranteed fixed rent. 
                  Serai manages all pricing and revenue optimization.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {isLimitedRevenue && !isMasterLease && (
          <div className="bg-gray-200 border border-gray-400 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <LazyShield className="h-5 w-5 text-gray-700 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Limited Revenue Controls</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Under your {partnershipModel} agreement, you have limited control over pricing. 
                  Serai manages pricing with your oversight.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <LazyBarChart3 className="h-8 w-8 text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              {isMasterLease ? 'Fixed Rent Tracking' : 'Real-time Revenue'}
            </h3>
            <p className="text-sm text-gray-600">
              {isMasterLease 
                ? 'Track your guaranteed monthly rent payments and payment history.'
                : 'Live earnings dashboard with booking and financial performance data.'
              }
            </p>
          </div>
          <div className="p-4 bg-gray-200 border border-gray-400 rounded-lg">
            <LazyTrendingUp className="h-8 w-8 text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Revenue Analytics</h3>
            <p className="text-sm text-gray-600">Historical trends, seasonal analysis, and market comparisons.</p>
          </div>
          <div className="p-4 bg-gray-300 border border-gray-500 rounded-lg">
            <LazySettings className="h-8 w-8 text-gray-800 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Pricing Management</h3>
            <p className="text-sm text-gray-600">
              {isMasterLease 
                ? 'Pricing is managed by Serai under your Master Lease agreement.'
                : isLimitedRevenue 
                  ? 'Limited pricing controls with Serai oversight and approval.'
                  : 'Dynamic pricing controls and rate optimization suggestions.'
              }
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <LazyFileText className="h-8 w-8 text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Payment Tracking</h3>
            <p className="text-sm text-gray-600">Payout schedules, payment history, and transaction details.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <LazyBarChart3 className="h-8 w-8 text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Financial Reports</h3>
            <p className="text-sm text-gray-600">Monthly/quarterly summaries and tax document generation.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <LazyUsers className="h-8 w-8 text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Revenue Share</h3>
            <p className="text-sm text-gray-600">
              {isMasterLease 
                ? 'Not applicable - Fixed rent model.'
                : 'Track revenue share agreements and partnership models.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
