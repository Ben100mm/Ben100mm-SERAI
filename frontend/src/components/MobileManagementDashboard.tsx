'use client';

import { useState } from 'react';
import { 
  Building2, 
  BarChart3, 
  Users, 
  Star, 
  Settings, 
  TrendingUp, 
  MessageSquare, 
  Shield, 
  Smartphone, 
  FileText, 
  Database,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  RefreshCw,
  ChevronRight,
  Home,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  Award,
  ThumbsUp,
  MessageCircle,
  Send,
  Headphones,
  Lightbulb,
  AlertCircle
} from 'lucide-react';

interface MobileManagementDashboardProps {
  managementRole: string;
  isConnected: boolean;
  syncStatus: any;
  onSync: () => void;
  onSectionChange: (section: string) => void;
  activeSection: string;
}

export default function MobileManagementDashboard({
  managementRole,
  isConnected,
  syncStatus,
  onSync,
  onSectionChange,
  activeSection
}: MobileManagementDashboardProps) {
  const [bottomNavOpen, setBottomNavOpen] = useState(false);

  const mobileFeatures = [
    {
      id: 'overview',
      title: 'Overview',
      icon: <Home className="h-5 w-5" />,
      color: 'blue'
    },
    {
      id: 'partner-management',
      title: 'Partners',
      icon: <Users className="h-5 w-5" />,
      color: 'green'
    },
    {
      id: 'property-operations',
      title: 'Properties',
      icon: <Building2 className="h-5 w-5" />,
      color: 'purple'
    },
    {
      id: 'revenue-financial',
      title: 'Revenue',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'yellow'
    },
    {
      id: 'guest-experience',
      title: 'Guests',
      icon: <Star className="h-5 w-5" />,
      color: 'pink'
    },
    {
      id: 'operations-management',
      title: 'Operations',
      icon: <Settings className="h-5 w-5" />,
      color: 'indigo'
    }
  ];

  const getQuickStats = () => {
    return [
      {
        label: 'Total Revenue',
        value: '$2.4M',
        color: 'green',
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        label: 'Active Properties',
        value: '156',
        color: 'blue',
        icon: <Building2 className="h-6 w-6" />
      },
      {
        label: 'Partners',
        value: '89',
        color: 'purple',
        icon: <Users className="h-6 w-6" />
      },
      {
        label: 'Guest Rating',
        value: '4.8',
        color: 'yellow',
        icon: <Star className="h-6 w-6" />
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building2 className="h-6 w-6 text-red-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">Serai Management</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Connection Status */}
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <button
                onClick={onSync}
                disabled={syncStatus.isSyncing}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <RefreshCw className={`h-4 w-4 ${syncStatus.isSyncing ? 'animate-spin' : ''}`} />
              </button>
              <Bell className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          
          {/* Role and Status */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">{managementRole.replace('_', ' ')}</span>
            <span className="text-xs text-gray-500">
              {isConnected ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {getQuickStats().map((stat, index) => (
            <div key={index} className={`bg-${stat.color}-50 p-3 rounded-lg border border-${stat.color}-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs text-${stat.color}-600`}>{stat.label}</p>
                  <p className={`text-lg font-bold text-${stat.color}-900`}>{stat.value}</p>
                </div>
                <div className={`text-${stat.color}-600`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Management Tools</h3>
        <div className="grid grid-cols-2 gap-3">
          {mobileFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => onSectionChange(feature.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                activeSection === feature.id
                  ? `border-${feature.color}-500 bg-${feature.color}-50`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`text-${feature.color}-600`}>
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-gray-900">{feature.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Property Updated</p>
              <p className="text-xs text-gray-500">Luxury Resort - Bali status changed</p>
            </div>
            <span className="text-xs text-gray-400">2m ago</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New Partner Added</p>
              <p className="text-xs text-gray-500">Sarah Johnson joined the platform</p>
            </div>
            <span className="text-xs text-gray-400">1h ago</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Maintenance Alert</p>
              <p className="text-xs text-gray-500">AC issue reported in Room 205</p>
            </div>
            <span className="text-xs text-gray-400">3h ago</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          {mobileFeatures.slice(0, 4).map((feature) => (
            <button
              key={feature.id}
              onClick={() => onSectionChange(feature.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${
                activeSection === feature.id
                  ? `bg-${feature.color}-50 text-${feature.color}-600`
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {feature.icon}
              <span className="text-xs">{feature.title}</span>
            </button>
          ))}
          <button
            onClick={() => setBottomNavOpen(!bottomNavOpen)}
            className="flex flex-col items-center space-y-1 p-2 rounded-lg text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>

      {/* Expanded Bottom Navigation */}
      {bottomNavOpen && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">All Features</h3>
              <button
                onClick={() => setBottomNavOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {mobileFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => {
                    onSectionChange(feature.id);
                    setBottomNavOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    activeSection === feature.id
                      ? `bg-${feature.color}-50 text-${feature.color}-600`
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {feature.icon}
                  <span className="text-sm font-medium">{feature.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
