'use client';

import { LazyBuilding2, LazySettings, LazyBarChart3, LazyShield, LazySmartphone, LazyFileText } from '@/components/icons/LazyIcons';
import { PARTNERSHIP_RESTRICTIONS } from '@/data/partnershipData';

interface PropertyManagementProps {
  partnershipModel: string;
}

export default function PropertyManagement({ partnershipModel }: PropertyManagementProps) {
  const isLimitedPropertyManagement = PARTNERSHIP_RESTRICTIONS[partnershipModel as keyof typeof PARTNERSHIP_RESTRICTIONS].limitedFeatures.includes('property-management');
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Management</h2>
        <p className="text-gray-600 mb-6">Manage your property portfolio, details, and performance analytics.</p>
        
        {/* Partnership-specific notice */}
        {isLimitedPropertyManagement && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <LazyShield className="h-5 w-5 text-gray-700 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Limited Access</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Under your {partnershipModel} agreement, you have view-only access to property information. 
                  Serai manages property operations and updates.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <LazyBuilding2 className="h-8 w-8 text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Property Portfolio</h3>
            <p className="text-sm text-gray-600">
              {isLimitedPropertyManagement 
                ? 'View property information and basic metrics (read-only).'
                : 'View all properties with key metrics, occupancy rates, and revenue data.'
              }
            </p>
          </div>
          <div className="p-4 bg-gray-200 border border-gray-400 rounded-lg">
            <LazySettings className="h-8 w-8 text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Property Details</h3>
            <p className="text-sm text-gray-600">
              {isLimitedPropertyManagement 
                ? 'View property information and amenities (read-only).'
                : 'Edit property information, amenities, pricing, and availability settings.'
              }
            </p>
          </div>
          <div className="p-4 bg-gray-300 border border-gray-500 rounded-lg">
            <LazyBarChart3 className="h-8 w-8 text-gray-800 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Performance Analytics</h3>
            <p className="text-sm text-gray-600">Track RevPAR, occupancy trends, and property-specific performance metrics.</p>
          </div>
          <div className="p-4 bg-gray-400 border border-gray-600 rounded-lg">
            <LazyShield className="h-8 w-8 text-gray-800 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Status Management</h3>
            <p className="text-sm text-gray-600">
              {isLimitedPropertyManagement 
                ? 'View property status and listing information.'
                : 'Activate/deactivate properties and manage listing status across channels.'
              }
            </p>
          </div>
          <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <LazySmartphone className="h-8 w-8 text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Media Management</h3>
            <p className="text-sm text-gray-600">
              {isLimitedPropertyManagement 
                ? 'View property photos and media (read-only).'
                : 'Upload and organize property photos, videos, and virtual tours.'
              }
            </p>
          </div>
          <div className="p-4 bg-gray-200 border border-gray-400 rounded-lg">
            <LazyFileText className="h-8 w-8 text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Certification</h3>
            <p className="text-sm text-gray-600">Track Serai certification status and compliance requirements.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
