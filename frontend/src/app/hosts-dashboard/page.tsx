'use client';

import { useState, Suspense, lazy, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import TopAppBar from '@/components/TopAppBar';
import { HOSTS_DASHBOARD_FEATURES, HOSTS_RESTRICTIONS } from '../../data/hostsData';
import { 
  LazyHome, 
  LazyBuilding2, 
  LazyBarChart3, 
  LazyCalendar, 
  LazyUsers, 
  LazySettings, 
  LazyTrendingUp, 
  LazyGlobe, 
  LazyShield, 
  LazySmartphone, 
  LazyMessageSquare, 
  LazyFileText, 
  LazyStar, 
  LazyPlus, 
  LazyMapPin, 
  LazyClock, 
  LazyDollarSign, 
  LazyCheckCircle 
} from '@/components/icons/LazyIcons';
import { Home, Building2, Star, Settings, Plus, Menu, X, Calendar, MessageSquare, DollarSign, BarChart3, Clock, HelpCircle, Users, Share2 } from 'lucide-react';

// Lazy load heavy components
const HostsOverview = lazy(() => import('../../components/hosts-dashboard/HostsOverview'));
const PropertyManagement = lazy(() => import('../../components/hosts-dashboard/PropertyManagement'));
const ExperienceManagement = lazy(() => import('../../components/hosts-dashboard/ExperienceManagement'));
const ServiceManagement = lazy(() => import('../../components/hosts-dashboard/ServiceManagement'));

// Type definitions
type HostType = 'Property Host' | 'Experience Host' | 'Service Host' | 'Multi-Host';

interface HostRestrictions {
  hiddenFeatures: string[];
  limitedFeatures: string[];
  accessMethods: string[];
  quickStats: string[];
}

type HostRestrictionsMap = {
  [K in HostType]: HostRestrictions;
};

export default function HostsDashboardPage() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hostType, setHostType] = useState<HostType>('Multi-Host'); // Default host type
  const [activeSubTab, setActiveSubTab] = useState('properties');

  // Handle URL parameters for direct navigation
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && HOSTS_DASHBOARD_FEATURES.some((f: any) => f.id === section)) {
      setActiveSection(section);
    }
  }, [searchParams]);

  // Use external data for better tree-shaking
  const dashboardFeatures = HOSTS_DASHBOARD_FEATURES;
  const hostRestrictions = HOSTS_RESTRICTIONS;

  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Home': LazyHome,
      'Building2': LazyBuilding2,
      'BarChart3': LazyBarChart3,
      'Calendar': LazyCalendar,
      'Users': LazyUsers,
      'Settings': LazySettings,
      'TrendingUp': LazyTrendingUp,
      'Globe': LazyGlobe,
      'Shield': LazyShield,
      'Smartphone': LazySmartphone,
      'MessageSquare': LazyMessageSquare,
      'FileText': LazyFileText,
      'Star': LazyStar,
      'Plus': LazyPlus,
      'MapPin': LazyMapPin,
      'Clock': LazyClock,
      'DollarSign': LazyDollarSign,
      'CheckCircle': LazyCheckCircle,
    };
    const IconComponent = iconMap[iconName] || LazySettings;
    return IconComponent;
  };

  // Get visible features based on host type
  const getVisibleFeatures = () => {
    const restrictions = hostRestrictions[hostType as keyof typeof hostRestrictions];
    return dashboardFeatures.filter((feature: any) => 
      !restrictions.hiddenFeatures.includes(feature.id)
    );
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome to Your Host Dashboard</h2>
                  <p className="text-gray-600 mt-2">
                    Manage your properties, experiences, and services all in one place. Create listings, track performance, and grow your hosting business.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Host Type:</span>
                  <select
                    value={hostType}
                    onChange={(e) => setHostType(e.target.value as HostType)}
                    className="px-3 py-1 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="Property Host">Property Host</option>
                    <option value="Experience Host">Experience Host</option>
                    <option value="Service Host">Service Host</option>
                    <option value="Multi-Host">Multi-Host</option>
                  </select>
                </div>
              </div>
              
              {/* Host Type Info */}
              <div className="bg-gray-200 border border-gray-400 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="h-5 w-5 bg-gray-700 rounded mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {hostType} Access
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {hostType === 'Property Host' && 'Focus on property listings with full management tools.'}
                      {hostType === 'Experience Host' && 'Create and manage unique experiences for guests.'}
                      {hostType === 'Service Host' && 'Offer specialized services to enhance guest stays.'}
                      {hostType === 'Multi-Host' && 'Complete access to all hosting features and tools.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded mb-6" />}>
                <HostsOverview 
                  hostType={hostType}
                  setHostType={(type: string) => setHostType(type as HostType)}
                />
              </Suspense>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Calendar</h2>
              <p className="text-gray-600 mb-6">Manage your bookings, availability, and guest check-ins/outs.</p>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-96 bg-gray-50 rounded flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Calendar view will be implemented here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'listings':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Listings</h2>
              <p className="text-gray-600 mb-6">Create and manage property, experience, and service listings.</p>
              
              {/* Tabs for different listing types */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button 
                    onClick={() => setActiveSubTab('properties')}
                    className={`py-2 px-1 border-b-2 text-sm font-medium ${
                      activeSubTab === 'properties'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Properties
                  </button>
                  <button 
                    onClick={() => setActiveSubTab('experiences')}
                    className={`py-2 px-1 border-b-2 text-sm font-medium ${
                      activeSubTab === 'experiences'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Experiences
                  </button>
                  <button 
                    onClick={() => setActiveSubTab('services')}
                    className={`py-2 px-1 border-b-2 text-sm font-medium ${
                      activeSubTab === 'services'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Services
                  </button>
                </nav>
              </div>

              {/* Tab content */}
              {(() => {
                switch (activeSubTab) {
                  case 'properties':
                    return (
                      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded" />}>
                        <PropertyManagement hostType={hostType} />
                      </Suspense>
                    );
                  case 'experiences':
                    return (
                      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded" />}>
                        <ExperienceManagement hostType={hostType} />
                      </Suspense>
                    );
                  case 'services':
                    return (
                      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded" />}>
                        <ServiceManagement hostType={hostType} />
                      </Suspense>
                    );
                  default:
                    return (
                      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded" />}>
                        <PropertyManagement hostType={hostType} />
                      </Suspense>
                    );
                }
              })()}
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
              <p className="text-gray-600 mb-6">Communicate with guests, handle inquiries and reviews.</p>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-96 bg-gray-50 rounded flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Messages interface will be implemented here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'earnings':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Earnings</h2>
              <p className="text-gray-600 mb-6">Track your earnings, payments, and financial performance.</p>
              
              {/* Earnings Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">$3,240</p>
                      <p className="text-sm text-green-600">+12% vs last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-gray-900">$1,850</p>
                      <p className="text-sm text-gray-500">15 bookings</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-gray-900">$420</p>
                      <p className="text-sm text-yellow-600">3 payments</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average per Booking</p>
                      <p className="text-2xl font-bold text-gray-900">$123</p>
                      <p className="text-sm text-gray-500">All time</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Luxury Downtown Apartment</p>
                      <p className="text-xs text-gray-500">Booking #12345 • Dec 15, 2024</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">+$450</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Wine Tasting Tour</p>
                      <p className="text-xs text-gray-500">Booking #12346 • Dec 14, 2024</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">+$170</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Private Chef Service</p>
                      <p className="text-xs text-gray-500">Booking #12347 • Dec 13, 2024</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">+$200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'insights':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Insights</h2>
              <p className="text-gray-600 mb-6">Analytics, performance metrics, and business intelligence.</p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Occupancy Rate</p>
                      <p className="text-2xl font-bold text-gray-900">87%</p>
                      <p className="text-sm text-green-600">+5% vs last month</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Guest Rating</p>
                      <p className="text-2xl font-bold text-gray-900">4.8</p>
                      <p className="text-sm text-gray-500">Based on 24 reviews</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Response Time</p>
                      <p className="text-2xl font-bold text-gray-900">2.3h</p>
                      <p className="text-sm text-green-600">-0.5h vs last month</p>
                    </div>
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Performance Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                  <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Revenue chart will be implemented here</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Sources</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Direct Bookings</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Serai Platform</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '30%'}}></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Other Channels</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{width: '10%'}}></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'hosting-resources':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hosting Resources</h2>
              <p className="text-gray-600 mb-6">Guides, tips, and tools for successful hosting.</p>
              
              {/* Resource Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Settings className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Getting Started</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Hosting basics and best practices</li>
                    <li>• Setting up your first listing</li>
                    <li>• Pricing strategies guide</li>
                    <li>• Photography tips for listings</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Guest Experience</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Creating memorable experiences</li>
                    <li>• Communication best practices</li>
                    <li>• Handling guest requests</li>
                    <li>• Managing reviews and feedback</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Business Growth</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Scaling your hosting business</li>
                    <li>• Marketing your listings</li>
                    <li>• Financial management tips</li>
                    <li>• Legal and compliance guides</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'get-help':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Help</h2>
              <p className="text-gray-600 mb-6">Support, assistance, and troubleshooting resources.</p>
              
              {/* Help Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Help Center</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Browse our comprehensive knowledge base for answers to common questions.</p>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Browse Help Center
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Contact Support</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Get personalized help from our support team via chat or email.</p>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Contact Support
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Community Forum</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Connect with other hosts and share experiences in our community.</p>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Join Community
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Schedule Call</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Book a one-on-one call with our hosting experts.</p>
                  <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'find-cohost':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Find a Co-host</h2>
              <p className="text-gray-600 mb-6">Connect with partners and co-hosts to grow your hosting business.</p>
              
              {/* Co-host Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Browse Co-hosts</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Find experienced co-hosts in your area who can help manage your listings.</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                        <p className="text-xs text-gray-500">Toronto, ON • 4.9 rating</p>
                      </div>
                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                        Connect
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Mike Chen</p>
                        <p className="text-xs text-gray-500">Vancouver, BC • 4.8 rating</p>
                      </div>
                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Plus className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Post Your Need</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Create a listing for the type of co-host you're looking for.</p>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Post Co-host Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'create-listing':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create a New Listing</h2>
              <p className="text-gray-600 mb-6">Add property, experience, or service listing to start earning.</p>
              
              {/* Listing Types */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-red-300 hover:shadow-md transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                      <Building2 className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Property</h3>
                    <p className="text-sm text-gray-600 mb-4">List your space for guests to book and stay.</p>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Create Property
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Star className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
                    <p className="text-sm text-gray-600 mb-4">Create unique experiences for guests to enjoy.</p>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Create Experience
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 hover:shadow-md transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Settings className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Service</h3>
                    <p className="text-sm text-gray-600 mb-4">Offer specialized services to enhance guest stays.</p>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Create Service
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'refer-host':
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refer a Host</h2>
              <p className="text-gray-600 mb-6">Earn rewards by referring new hosts to Serai.</p>
              
              {/* Referral Program */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Share2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Referral Program</h3>
                    <p className="text-sm text-blue-700">Earn $50 for each successful referral</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-900">$150</p>
                    <p className="text-sm text-blue-700">Total Earned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-900">3</p>
                    <p className="text-sm text-blue-700">Successful Referrals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-900">$50</p>
                    <p className="text-sm text-blue-700">Per Referral</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Get Referral Link
                </button>
              </div>

              {/* How It Works */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-gray-600">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Link</h3>
                  <p className="text-sm text-gray-600">Send your unique referral link to potential hosts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-gray-600">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">They Sign Up</h3>
                  <p className="text-sm text-gray-600">Your referral creates their first listing</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-gray-600">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">You Earn</h3>
                  <p className="text-sm text-gray-600">Get $50 credited to your account</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {getVisibleFeatures().find((f: any) => f.id === activeSection)?.title || 'Feature'}
              </h2>
              <p className="text-gray-600 mb-6">
                {getVisibleFeatures().find((f: any) => f.id === activeSection)?.description || 'Feature description'}
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
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-20 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 px-4">
                  <div className="flex items-center">
                    <Home className="h-8 w-8" style={{ color: '#660f0f' }} />
                    <div className="ml-3">
                      <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
                      <div className="mt-1">
                        <span className="text-xs text-gray-500">Type:</span>
                        <div className="text-sm font-medium text-gray-700">{hostType}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <nav className="mt-5 px-2 space-y-3">
                  {getVisibleFeatures().map((feature: any) => {
                    const isHidden = hostRestrictions[hostType as keyof typeof hostRestrictions].hiddenFeatures.includes(feature.id);
                    const isLimited = hostRestrictions[hostType as keyof typeof hostRestrictions].limitedFeatures.includes(feature.id);
                    
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
                <Home className="h-8 w-8" style={{ color: '#660f0f' }} />
                <div className="ml-3">
                  <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
                  <div className="mt-1">
                    <span className="text-xs text-gray-500">Type:</span>
                    <div className="text-sm font-medium text-gray-700">{hostType}</div>
                  </div>
                </div>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-3">
                {getVisibleFeatures().map((feature: any) => {
                  const isHidden = hostRestrictions[hostType as keyof typeof hostRestrictions].hiddenFeatures.includes(feature.id);
                  const isLimited = hostRestrictions[hostType as keyof typeof hostRestrictions].limitedFeatures.includes(feature.id);
                  
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
              <Menu className="h-6 w-6" />
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
