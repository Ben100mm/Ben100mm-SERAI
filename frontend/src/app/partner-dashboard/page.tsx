'use client';

import { useState, Suspense, lazy } from 'react';
import Image from 'next/image';
import TopAppBar from '@/components/TopAppBar';
import { DASHBOARD_FEATURES, PARTNERSHIP_RESTRICTIONS } from '@/data/partnershipData';
import * as LazyIcons from '@/components/icons/LazyIcons';
import { Building2 } from 'lucide-react';

// Lazy load heavy components
const DashboardOverview = lazy(() => import('@/components/partner-dashboard/DashboardOverview'));
const PropertyManagement = lazy(() => import('@/components/partner-dashboard/PropertyManagement'));
const RevenueFinancial = lazy(() => import('@/components/partner-dashboard/RevenueFinancial'));
const MasterLeaseContent = lazy(() => import('@/components/partner-dashboard/MasterLeaseContent'));

// Type definitions
type PartnershipModel = 'Master Lease' | 'Hybrid Lease' | 'Revenue Share' | 'Management Agreement' | 'Franchise Model';

interface PartnershipRestrictions {
  hiddenFeatures: string[];
  limitedFeatures: string[];
  accessMethods: string[];
  quickStats: string[];
  customFeatures?: any[];
}

type PartnershipRestrictionsMap = {
  [K in PartnershipModel]: PartnershipRestrictions;
};

export default function PartnerDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [partnershipModel, setPartnershipModel] = useState<PartnershipModel>('Revenue Share'); // Default partnership model
  const [activeSubTab, setActiveSubTab] = useState('');

  // Use external data for better tree-shaking
  const dashboardFeatures = DASHBOARD_FEATURES;

  // Use external data for better tree-shaking
  const masterLeaseFeatures = PARTNERSHIP_RESTRICTIONS['Master Lease'].customFeatures;

  // Use external data for better tree-shaking
  const partnershipRestrictions = PARTNERSHIP_RESTRICTIONS;

  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Home': LazyIcons.LazyHome,
      'Building2': LazyIcons.LazyBuilding2,
      'BarChart3': LazyIcons.LazyBarChart3,
      'Calendar': LazyIcons.LazyCalendar,
      'Users': LazyIcons.LazyUsers,
      'Settings': LazyIcons.LazySettings,
      'TrendingUp': LazyIcons.LazyTrendingUp,
      'Globe': LazyIcons.LazyGlobe,
      'Shield': LazyIcons.LazyShield,
      'Smartphone': LazyIcons.LazySmartphone,
      'MessageSquare': LazyIcons.LazyMessageSquare,
      'FileText': LazyIcons.LazyFileText,
    };
    const IconComponent = iconMap[iconName] || LazyIcons.LazySettings;
    return IconComponent;
  };

  // Get visible features based on partnership model
  const getVisibleFeatures = () => {
    const restrictions = partnershipRestrictions[partnershipModel as keyof typeof partnershipRestrictions];
    
    if (partnershipModel === 'Master Lease') {
      return masterLeaseFeatures;
    }
    
    return dashboardFeatures.filter(feature => 
      !restrictions.hiddenFeatures.includes(feature.id)
    );
  };

  // Functions moved to separate components for better performance

  // Master lease content now handled by lazy-loaded component

  const renderDashboardContent = () => {
    // Handle Master Lease special case
    if (partnershipModel === 'Master Lease' && activeSection !== 'overview') {
      return (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {masterLeaseFeatures.find(f => f.id === activeSection)?.title || 'Feature'}
            </h2>
            <p className="text-gray-600 mb-6">
              {masterLeaseFeatures.find(f => f.id === activeSection)?.description || 'Feature description'}
            </p>
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded" />}>
              <MasterLeaseContent 
                featureId={activeSection} 
                activeSubTab={activeSubTab}
                setActiveSubTab={setActiveSubTab}
              />
            </Suspense>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome to Your Partner Dashboard</h2>
                  <p className="text-gray-600 mt-2">
                    Manage your properties, track performance, and grow your business with Serai's comprehensive partner tools.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Partnership Model:</span>
                  <select
                    value={partnershipModel}
                    onChange={(e) => setPartnershipModel(e.target.value as PartnershipModel)}
                    className="px-3 py-1 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="Master Lease">Master Lease</option>
                    <option value="Hybrid Lease">Hybrid Lease</option>
                    <option value="Revenue Share">Revenue Share</option>
                    <option value="Management Agreement">Management Agreement</option>
                    <option value="Franchise Model">Franchise Model</option>
                  </select>
                </div>
              </div>
              
              {/* Partnership Model Info */}
              <div className="bg-gray-200 border border-gray-400 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="h-5 w-5 bg-gray-700 rounded mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {partnershipModel} Partnership
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {partnershipModel === 'Master Lease' && 'Guaranteed fixed rent with Serai managing all operations and pricing.'}
                      {partnershipModel === 'Hybrid Lease' && 'Base rent plus revenue share with limited pricing controls.'}
                      {partnershipModel === 'Revenue Share' && 'Full revenue sharing with complete pricing and channel control.'}
                      {partnershipModel === 'Management Agreement' && 'Serai operates your property while you retain upside potential.'}
                      {partnershipModel === 'Franchise Model' && 'Complete access to Serai brand and technology suite.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded mb-6" />}>
                <DashboardOverview 
                  partnershipModel={partnershipModel}
                  setPartnershipModel={(model: string) => setPartnershipModel(model as PartnershipModel)}
                />
              </Suspense>
            </div>
          </div>
        );

      case 'property-management':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Management</h2>
              <p className="text-gray-600 mb-6">Manage your property portfolio, details, and performance analytics.</p>
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded" />}>
                <PropertyManagement partnershipModel={partnershipModel} />
              </Suspense>
            </div>
          </div>
        );

      case 'revenue-financial':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Revenue & Financial Management</h2>
              <p className="text-gray-600 mb-6">Track earnings, manage pricing, and access comprehensive financial reports.</p>
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded" />}>
                <RevenueFinancial partnershipModel={partnershipModel} />
              </Suspense>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {getVisibleFeatures().find(f => f.id === activeSection)?.title || 'Feature'}
              </h2>
              <p className="text-gray-600 mb-6">
                {getVisibleFeatures().find(f => f.id === activeSection)?.description || 'Feature description'}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <div className="animate-pulse bg-gray-300 h-12 w-12 mx-auto rounded" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Coming Soon</h3>
                <p className="text-gray-500">This feature is under development and will be available soon.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopAppBar 
        backHref="/tabs" 
        logoHref="/tabs" 
        showListingButton={false} 
        showLanguageButton={true} 
        showMenuButton={true}
        hiddenDropdownItems={['Gift Cards', 'Clubs & Badges', 'Memberships']}
      />
      
      <div className="flex pt-16">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 flex z-40 md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="h-6 w-6 bg-white rounded" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-20 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 px-4">
                  <div className="flex items-center">
                    <Building2 className="h-8 w-8" style={{ color: '#660f0f' }} />
                    <div className="ml-3">
                      <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
                      <div className="mt-1">
                        <span className="text-xs text-gray-500">Agreement:</span>
                        <div className="text-sm font-medium text-gray-700">{partnershipModel}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <nav className="mt-5 px-2 space-y-3">
                  {getVisibleFeatures().map((feature) => {
                    const isHidden = partnershipRestrictions[partnershipModel as keyof typeof partnershipRestrictions].hiddenFeatures.includes(feature.id);
                    const isLimited = partnershipRestrictions[partnershipModel as keyof typeof partnershipRestrictions].limitedFeatures.includes(feature.id);
                    
                    if (isHidden) return null;
                    
                    return (
                      <button
                        key={feature.id}
                        onClick={() => {
                          setActiveSection(feature.id);
                          setSidebarOpen(false);
                        }}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left ${
                          activeSection === feature.id
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {(() => {
                          const IconComponent = getIconComponent(feature.iconName);
                          return <IconComponent className="h-5 w-5 text-gray-600" />;
                        })()}
                        <span className="ml-3">{feature.title}</span>
                        {isLimited && (
                          <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            Limited
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-20 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Building2 className="h-8 w-8" style={{ color: '#660f0f' }} />
                <div className="ml-3">
                  <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
                  <div className="mt-1">
                    <span className="text-xs text-gray-500">Agreement:</span>
                    <div className="text-sm font-medium text-gray-700">{partnershipModel}</div>
                  </div>
                </div>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-3">
                {getVisibleFeatures().map((feature) => {
                  const isHidden = partnershipRestrictions[partnershipModel as keyof typeof partnershipRestrictions].hiddenFeatures.includes(feature.id);
                  const isLimited = partnershipRestrictions[partnershipModel as keyof typeof partnershipRestrictions].limitedFeatures.includes(feature.id);
                  
                  if (isHidden) return null;
                  
                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActiveSection(feature.id)}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                        activeSection === feature.id
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {(() => {
                        const IconComponent = getIconComponent(feature.iconName);
                        return <IconComponent className="h-5 w-5 text-gray-600" />;
                      })()}
                      <span className="ml-3">{feature.title}</span>
                      {isLimited && (
                        <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Limited
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-serai-serai-red-500"
              onClick={() => setSidebarOpen(true)}
            >
              <div className="h-6 w-6 bg-gray-400 rounded" />
            </button>
          </div>

          {/* Page Content */}
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="pt-8 pb-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {renderDashboardContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}