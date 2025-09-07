'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Building2, 
  BarChart3, 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings, 
  Shield, 
  Globe, 
  Smartphone, 
  Headphones, 
  FileText, 
  TrendingUp, 
  Wifi, 
  Lock, 
  Bell, 
  ChevronRight, 
  ChevronDown,
  Home,
  Search,
  Plus,
  Menu,
  X,
  LogOut,
  User,
  HelpCircle,
  Bell as NotificationIcon,
  DollarSign,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import PartnerTopAppBar from '@/components/PartnerTopAppBar';

// Type definitions
type PartnershipModel = 'Master Lease' | 'Hybrid Lease' | 'Revenue Share' | 'Management Agreement' | 'Franchise Model';

interface PartnershipRestrictions {
  hiddenFeatures: string[];
  limitedFeatures: string[];
  accessMethods: string[];
  quickStats: string[];
  customFeatures?: any[];
}

interface PartnershipRestrictionsMap {
  [key: string]: PartnershipRestrictions;
}

export default function PartnerDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [partnershipModel, setPartnershipModel] = useState<PartnershipModel>('Revenue Share'); // Default partnership model
  const [activeSubTab, setActiveSubTab] = useState('');

  const dashboardFeatures = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      icon: <Home className="h-5 w-5" />,
      description: 'Main dashboard with key metrics and quick actions'
    },
    {
      id: 'property-management',
      title: 'Property Management',
      icon: <Building2 className="h-5 w-5" />,
      description: 'Manage your property portfolio, details, and performance'
    },
    {
      id: 'revenue-financial',
      title: 'Revenue & Financial',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Track earnings, pricing, payments, and financial reports'
    },
    {
      id: 'booking-management',
      title: 'Booking Management',
      icon: <Calendar className="h-5 w-5" />,
      description: 'Manage bookings, calendar, and guest check-ins/outs'
    },
    {
      id: 'guest-experience',
      title: 'Guest Experience',
      icon: <Users className="h-5 w-5" />,
      description: 'Guest communication, reviews, and feedback management'
    },
    {
      id: 'operations',
      title: 'Operations Management',
      icon: <Settings className="h-5 w-5" />,
      description: 'Housekeeping, maintenance, inventory, and staff management'
    },
    {
      id: 'analytics-insights',
      title: 'Analytics & Insights',
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Performance metrics, market intelligence, and optimization'
    },
    {
      id: 'channel-management',
      title: 'Channel Management',
      icon: <Globe className="h-5 w-5" />,
      description: 'Multi-channel distribution and rate parity management'
    },
    {
      id: 'partnership',
      title: 'Partnership Management',
      icon: <Shield className="h-5 w-5" />,
      description: 'Partnership details, contracts, and support access'
    },
    {
      id: 'technology',
      title: 'Technology Features',
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Smart locks, IoT monitoring, and automated systems'
    },
    {
      id: 'communication',
      title: 'Communication & Support',
      icon: <MessageSquare className="h-5 w-5" />,
      description: 'Partner news, support tickets, and community forum'
    },
    {
      id: 'compliance',
      title: 'Compliance & Legal',
      icon: <FileText className="h-5 w-5" />,
      description: 'Regulatory compliance, insurance, and safety standards'
    },
    {
      id: 'development',
      title: 'Development & Growth',
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Expansion planning, investment analysis, and market research'
    },
    {
      id: 'customization',
      title: 'Customization & Preferences',
      icon: <Settings className="h-5 w-5" />,
      description: 'Dashboard customization, notifications, and preferences'
    }
  ];

  // Master Lease specific features
  const masterLeaseFeatures = [
    {
      id: 'financial-overview',
      title: 'Financial Overview',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Monthly rent payments, history, and lease renewal tracking',
      subTabs: [
        { id: 'rent-payments', title: 'Rent Payment Status', description: 'Current payment status and schedule' },
        { id: 'payment-history', title: 'Payment History', description: 'Complete payment history and records' },
        { id: 'lease-renewal', title: 'Lease Renewal Dates', description: 'Important lease dates and renewal tracking' },
        { id: 'basic-performance', title: 'Basic Performance', description: 'High-level property performance metrics' }
      ]
    },
    {
      id: 'property-status',
      title: 'Property Status',
      icon: <Building2 className="h-5 w-5" />,
      description: 'Property condition, maintenance, and compliance tracking',
      subTabs: [
        { id: 'condition-reports', title: 'Condition Reports', description: 'Property condition assessments and updates' },
        { id: 'maintenance-requests', title: 'Maintenance Requests', description: 'Maintenance status and request tracking' },
        { id: 'lease-compliance', title: 'Lease Compliance', description: 'Compliance tracking and requirements' },
        { id: 'inspection-schedules', title: 'Inspection Schedules', description: 'Property inspection dates and reports' }
      ]
    },
    {
      id: 'communication-hub',
      title: 'Communication Hub',
      icon: <MessageSquare className="h-5 w-5" />,
      description: 'Direct contact and important property communications',
      subTabs: [
        { id: 'property-manager', title: 'Property Manager Contact', description: 'Direct contact with Serai property manager' },
        { id: 'announcements', title: 'Announcements & Updates', description: 'Important property-related announcements' },
        { id: 'lease-notifications', title: 'Lease Notifications', description: 'Lease-related notifications and updates' },
        { id: 'emergency-contact', title: 'Emergency Contact', description: 'Emergency contact information and procedures' }
      ]
    },
    {
      id: 'basic-reporting',
      title: 'Basic Reporting',
      icon: <FileText className="h-5 w-5" />,
      description: 'Monthly summaries and annual performance reports',
      subTabs: [
        { id: 'monthly-summary', title: 'Monthly Occupancy Summary', description: 'Monthly occupancy and performance summary' },
        { id: 'annual-report', title: 'Annual Performance Report', description: 'Comprehensive annual performance analysis' },
        { id: 'compliance-status', title: 'Lease Compliance Status', description: 'Current compliance status and requirements' },
        { id: 'property-value', title: 'Property Value Tracking', description: 'Property value trends and assessments' }
      ]
    }
  ];

  // Partnership model restrictions - Updated with recommendations
  const partnershipRestrictions: PartnershipRestrictionsMap = {
    'Master Lease': {
      hiddenFeatures: ['revenue-financial', 'booking-management', 'guest-experience', 'operations', 'analytics-insights', 'channel-management', 'partnership', 'technology', 'communication', 'compliance', 'development', 'customization'],
      limitedFeatures: [],
      accessMethods: ['web'],
      quickStats: ['Monthly Rent Payment', 'Property Status', 'Lease Compliance', 'Next Inspection'],
      customFeatures: masterLeaseFeatures
    },
    'Hybrid Lease': {
      hiddenFeatures: ['development', 'customization'],
      limitedFeatures: ['pricing-management', 'channel-management'],
      accessMethods: ['web', 'mobile'],
      quickStats: ['Monthly Revenue', 'Revenue Share %', 'Occupancy Rate', 'Guest Rating']
    },
    'Revenue Share': {
      hiddenFeatures: [],
      limitedFeatures: ['development', 'customization'],
      accessMethods: ['web', 'mobile', 'api'],
      quickStats: ['Monthly Revenue', 'Revenue Share %', 'Occupancy Rate', 'Guest Rating']
    },
    'Management Agreement': {
      hiddenFeatures: ['operations', 'staff-management', 'development', 'technology', 'customization'],
      limitedFeatures: ['property-management'],
      accessMethods: ['web'],
      quickStats: ['Revenue Performance', 'Occupancy Rate', 'Guest Satisfaction', 'Maintenance Status']
    },
    'Franchise Model': {
      hiddenFeatures: ['development'],
      limitedFeatures: ['customization'],
      accessMethods: ['web', 'mobile', 'api'],
      quickStats: ['Monthly Revenue', 'Franchise Performance', 'Brand Compliance', 'Guest Rating']
    }
  };

  // Get visible features based on partnership model
  const getVisibleFeatures = () => {
    const restrictions = partnershipRestrictions[partnershipModel];
    
    if (partnershipModel === 'Master Lease') {
      return masterLeaseFeatures;
    }
    
    return dashboardFeatures.filter(feature => 
      !restrictions.hiddenFeatures.includes(feature.id)
    );
  };

  // Get access methods based on partnership model
  const getAccessMethods = () => {
    const restrictions = partnershipRestrictions[partnershipModel];
    const allMethods = [
      {
        title: 'Web Application',
        description: 'Direct access via https://serai.com/partner-dashboard',
        icon: <Globe className="h-6 w-6 text-blue-600" />
      },
      {
        title: 'Mobile Responsive',
        description: 'Fully responsive design for mobile and tablet access',
        icon: <Smartphone className="h-6 w-6 text-green-600" />
      },
      {
        title: 'API Integration',
        description: 'REST API endpoints for third-party integrations',
        icon: <Settings className="h-6 w-6 text-purple-600" />
      },
      {
        title: 'Role-Based Access',
        description: 'HOST role authentication with secure session management',
        icon: <Shield className="h-6 w-6 text-red-600" />
      }
    ];

    return allMethods.filter(method => 
      restrictions.accessMethods.includes(method.title.toLowerCase().replace(' ', '-').replace(' responsive', '').replace(' integration', ''))
    );
  };

  // Get quick stats based on partnership model
  const getQuickStats = () => {
    const restrictions = partnershipRestrictions[partnershipModel];
    const stats = restrictions.quickStats;
    
    if (partnershipModel === 'Master Lease') {
      return [
        {
          label: stats[0],
          value: '$8,500',
          color: 'blue',
          icon: <DollarSign className="h-8 w-8" />
        },
        {
          label: stats[1],
          value: 'Active',
          color: 'green',
          icon: <CheckCircle className="h-8 w-8" />
        },
        {
          label: stats[2],
          value: 'Compliant',
          color: 'yellow',
          icon: <Shield className="h-8 w-8" />
        },
        {
          label: stats[3],
          value: 'Dec 15',
          color: 'purple',
          icon: <Calendar className="h-8 w-8" />
        }
      ];
    }
    
    return [
      {
        label: stats[0],
        value: '$12,450',
        color: 'blue',
        icon: <Building2 className="h-8 w-8" />
      },
      {
        label: stats[1],
        value: partnershipModel === 'Franchise Model' ? '95%' : '87%',
        color: 'green',
        icon: <BarChart3 className="h-8 w-8" />
      },
      {
        label: stats[2],
        value: '87%',
        color: 'yellow',
        icon: <Calendar className="h-8 w-8" />
      },
      {
        label: stats[3],
        value: '4.8',
        color: 'purple',
        icon: <Users className="h-8 w-8" />
      }
    ];
  };

  const renderMasterLeaseContent = (featureId: string) => {
    const feature = masterLeaseFeatures.find(f => f.id === featureId);
    if (!feature) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h2>
          <p className="text-gray-600 mb-6">{feature.description}</p>
          
          {/* Sub-tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {feature.subTabs.map((subTab) => (
              <button
                key={subTab.id}
                onClick={() => setActiveSubTab(subTab.id)}
                className={`p-4 text-left border rounded-lg transition-colors ${
                  activeSubTab === subTab.id
                    ? 'border-red-500 bg-red-50 text-red-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-2">{subTab.title}</h3>
                <p className="text-sm text-gray-600">{subTab.description}</p>
              </button>
            ))}
          </div>

          {/* Sub-tab content */}
          {activeSubTab && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {feature.subTabs.find(st => st.id === activeSubTab)?.title}
              </h3>
              <div className="space-y-4">
                {renderMasterLeaseSubContent(activeSubTab)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMasterLeaseSubContent = (subTabId: string) => {
    switch (subTabId) {
      case 'rent-payments':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-900">Current Month Status</h4>
                <p className="text-sm text-green-700">Rent payment received on time</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <h5 className="font-medium text-gray-900">Monthly Rent</h5>
                <p className="text-2xl font-bold text-gray-900">$8,500</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h5 className="font-medium text-gray-900">Due Date</h5>
                <p className="text-2xl font-bold text-gray-900">1st of Month</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h5 className="font-medium text-gray-900">Next Payment</h5>
                <p className="text-2xl font-bold text-gray-900">Jan 1, 2025</p>
              </div>
            </div>
          </div>
        );

      case 'payment-history':
        return (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dec 1, 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$8,500</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bank Transfer</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nov 1, 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$8,500</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bank Transfer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'condition-reports':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <h5 className="font-medium text-gray-900 mb-2">Last Inspection</h5>
                <p className="text-sm text-gray-600">December 1, 2024</p>
                <p className="text-sm text-green-600 font-medium">Excellent Condition</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <h5 className="font-medium text-gray-900 mb-2">Next Inspection</h5>
                <p className="text-sm text-gray-600">March 1, 2025</p>
                <p className="text-sm text-blue-600 font-medium">Scheduled</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Recent Notes</h5>
              <p className="text-sm text-blue-700">Property is in excellent condition. All systems functioning properly. No maintenance issues identified.</p>
            </div>
          </div>
        );

      case 'property-manager':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border">
              <h5 className="font-medium text-gray-900 mb-2">Primary Contact</h5>
              <p className="text-sm text-gray-600">Sarah Johnson - Property Manager</p>
              <div className="flex space-x-4 mt-2">
                <a href="tel:+1234567890" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <Phone className="h-4 w-4 mr-1" />
                  (123) 456-7890
                </a>
                <a href="mailto:sarah.johnson@serai.com" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <Mail className="h-4 w-4 mr-1" />
                  sarah.johnson@serai.com
                </a>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h5 className="font-medium text-gray-900 mb-2">Emergency Contact</h5>
              <p className="text-sm text-gray-600">24/7 Emergency Hotline</p>
              <a href="tel:+1234567891" className="flex items-center text-sm text-red-600 hover:text-red-800 mt-1">
                <Phone className="h-4 w-4 mr-1" />
                (123) 456-7891
              </a>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <Eye className="h-12 w-12 mx-auto" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Coming Soon</h4>
            <p className="text-gray-500">This section is under development and will be available soon.</p>
          </div>
        );
    }
  };

  const renderDashboardContent = () => {
    // Handle Master Lease special case
    if (partnershipModel === 'Master Lease' && activeSection !== 'overview') {
      return renderMasterLeaseContent(activeSection);
    }

    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome to Your Partner Dashboard</h2>
                  <p className="text-gray-600 mt-2">
                    Manage your properties, track performance, and grow your business with Serai's comprehensive partner tools.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Partnership Model:</span>
                  <select
                    value={partnershipModel}
                    onChange={(e) => setPartnershipModel(e.target.value as PartnershipModel)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">
                      {partnershipModel} Partnership
                    </h3>
                    <p className="text-sm text-blue-700 mt-1">
                      {partnershipModel === 'Master Lease' && 'Guaranteed fixed rent with Serai managing all operations and pricing.'}
                      {partnershipModel === 'Hybrid Lease' && 'Base rent plus revenue share with limited pricing controls.'}
                      {partnershipModel === 'Revenue Share' && 'Full revenue sharing with complete pricing and channel control.'}
                      {partnershipModel === 'Management Agreement' && 'Serai operates your property while you retain upside potential.'}
                      {partnershipModel === 'Franchise Model' && 'Complete access to Serai brand and technology suite.'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {getQuickStats().map((stat, index) => (
                  <div key={index} className={`bg-${stat.color}-50 p-4 rounded-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm text-${stat.color}-600`}>{stat.label}</p>
                        <p className={`text-2xl font-bold text-${stat.color}-900`}>{stat.value}</p>
                      </div>
                      <div className={`text-${stat.color}-600`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Access Methods */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Access Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getAccessMethods().map((method, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      {method.icon}
                      <div>
                        <h4 className="font-medium text-gray-900">{method.title}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'property-management':
        const isLimitedPropertyManagement = partnershipRestrictions[partnershipModel].limitedFeatures.includes('property-management');
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Management</h2>
              <p className="text-gray-600 mb-6">Manage your property portfolio, details, and performance analytics.</p>
              
              {/* Partnership-specific notice */}
              {isLimitedPropertyManagement && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-900">Limited Access</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Under your {partnershipModel} agreement, you have view-only access to property information. 
                        Serai manages property operations and updates.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Building2 className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Property Portfolio</h3>
                  <p className="text-sm text-gray-600">
                    {isLimitedPropertyManagement 
                      ? 'View property information and basic metrics (read-only).'
                      : 'View all properties with key metrics, occupancy rates, and revenue data.'
                    }
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Settings className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Property Details</h3>
                  <p className="text-sm text-gray-600">
                    {isLimitedPropertyManagement 
                      ? 'View property information and amenities (read-only).'
                      : 'Edit property information, amenities, pricing, and availability settings.'
                    }
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Performance Analytics</h3>
                  <p className="text-sm text-gray-600">Track RevPAR, occupancy trends, and property-specific performance metrics.</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Shield className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Status Management</h3>
                  <p className="text-sm text-gray-600">
                    {isLimitedPropertyManagement 
                      ? 'View property status and listing information.'
                      : 'Activate/deactivate properties and manage listing status across channels.'
                    }
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Smartphone className="h-8 w-8 text-yellow-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Media Management</h3>
                  <p className="text-sm text-gray-600">
                    {isLimitedPropertyManagement 
                      ? 'View property photos and media (read-only).'
                      : 'Upload and organize property photos, videos, and virtual tours.'
                    }
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <FileText className="h-8 w-8 text-indigo-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Certification</h3>
                  <p className="text-sm text-gray-600">Track Serai certification status and compliance requirements.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'revenue-financial':
        const isLimitedRevenue = partnershipRestrictions[partnershipModel].limitedFeatures.includes('revenue-financial');
        const isMasterLease = partnershipModel === 'Master Lease';
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Revenue & Financial Management</h2>
              <p className="text-gray-600 mb-6">Track earnings, manage pricing, and access comprehensive financial reports.</p>
              
              {/* Partnership-specific notices */}
              {isMasterLease && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-900">Master Lease - Fixed Rent</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Under your Master Lease agreement, you receive a guaranteed fixed rent. 
                        Serai manages all pricing and revenue optimization.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {isLimitedRevenue && !isMasterLease && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">Limited Revenue Controls</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Under your {partnershipModel} agreement, you have limited control over pricing. 
                        Serai manages pricing with your oversight.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-green-600 mb-3" />
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
                <div className="p-4 border border-gray-200 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Revenue Analytics</h3>
                  <p className="text-sm text-gray-600">Historical trends, seasonal analysis, and market comparisons.</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Settings className="h-8 w-8 text-purple-600 mb-3" />
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
                  <FileText className="h-8 w-8 text-yellow-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Tracking</h3>
                  <p className="text-sm text-gray-600">Payout schedules, payment history, and transaction details.</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Financial Reports</h3>
                  <p className="text-sm text-gray-600">Monthly/quarterly summaries and tax document generation.</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Users className="h-8 w-8 text-indigo-600 mb-3" />
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

      default:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {getVisibleFeatures().find(f => f.id === activeSection)?.title || 'Feature'}
              </h2>
              <p className="text-gray-600 mb-6">
                {getVisibleFeatures().find(f => f.id === activeSection)?.description || 'Feature description'}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  {getVisibleFeatures().find(f => f.id === activeSection)?.icon}
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
    <div className="min-h-screen bg-gray-50">
      {/* Partner Top App Bar */}
      <PartnerTopAppBar 
        backHref="/tabs"
        logoHref="/tabs"
        showLanguageButton={true}
        showMenuButton={true}
      />

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
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
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 px-4">
                  <div className="flex items-center">
                    <Building2 className="h-8 w-8 text-red-600" />
                    <span className="ml-2 text-xl font-bold text-gray-900">Partner Dashboard</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Partnership Model:</span>
                    <div className="text-sm font-medium text-gray-700">{partnershipModel}</div>
                  </div>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {getVisibleFeatures().map((feature) => {
                    const isHidden = partnershipRestrictions[partnershipModel].hiddenFeatures.includes(feature.id);
                    const isLimited = partnershipRestrictions[partnershipModel].limitedFeatures.includes(feature.id);
                    
                    return (
                      <button
                        key={feature.id}
                        onClick={() => {
                          setActiveSection(feature.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          activeSection === feature.id
                            ? 'bg-red-100 text-red-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {feature.icon}
                        <span className="ml-3 flex-1 text-left">{feature.title}</span>
                        {isLimited && (
                          <span className="ml-2 text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
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

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 px-4">
                  <div className="flex items-center">
                    <Building2 className="h-8 w-8 text-red-600" />
                    <span className="ml-2 text-xl font-bold text-gray-900">Partner Dashboard</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Partnership Model:</span>
                    <div className="text-sm font-medium text-gray-700">{partnershipModel}</div>
                  </div>
                </div>
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {getVisibleFeatures().map((feature) => {
                    const isHidden = partnershipRestrictions[partnershipModel].hiddenFeatures.includes(feature.id);
                    const isLimited = partnershipRestrictions[partnershipModel].limitedFeatures.includes(feature.id);
                    
                    return (
                      <button
                        key={feature.id}
                        onClick={() => setActiveSection(feature.id)}
                        className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          activeSection === feature.id
                            ? 'bg-red-100 text-red-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {feature.icon}
                        <span className="ml-3 flex-1 text-left">{feature.title}</span>
                        {isLimited && (
                          <span className="ml-2 text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
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
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile header */}
          <div className="lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Page Content */}
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
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