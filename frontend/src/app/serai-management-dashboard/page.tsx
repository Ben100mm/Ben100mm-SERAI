'use client';

import { useState, useEffect } from 'react';
import { useDashboardSync } from '../../hooks/useDashboardSync';
import MobileManagementDashboard from '../../components/MobileManagementDashboard';
import TopAppBar from '../../components/TopAppBar';
import ManagementMessages from '../../components/management-dashboard/ManagementMessages';
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
  FileText, 
  TrendingUp, 
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
  Eye,
  Building,
  UserCheck,
  PieChart,
  Activity,
  Target,
  Zap,
  Database,
  Layers,
  Briefcase,
  Headphones,
  Star,
  Flag,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  Filter,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  Minus,
  Plus as PlusIcon,
  X as XIcon,
  Check,
  AlertCircle,
  Info,
  Lightbulb,
  Award,
  Gift,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
  Archive,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Link,
  Share2,
  Copy as CopyIcon,
  QrCode,
  Barcode,
  Camera,
  Image,
  Video,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Scissors,
  Palette,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Terminal,
  Command,
  Keyboard,
  MousePointer,
  Hand,
  Fingerprint,
  Key,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Shield as ShieldIcon,
  Eye as EyeIcon,
  EyeOff,
  Search as SearchIcon,
  Filter as FilterIcon,
  ArrowUpDown as SortIcon,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight as ArrowUpRightIcon,
  ArrowDownLeft,
  ArrowDownRight as ArrowDownRightIcon,
  CornerUpLeft,
  CornerUpRight,
  CornerDownLeft,
  CornerDownRight,
  Move as MoveIcon,
  RotateCcw as RotateCcwIcon,
  RotateCw as RotateCwIcon,
  RefreshCw as RefreshCwIcon
} from 'lucide-react';

// Type definitions
type ManagementRole = 'ADMIN' | 'SUPER_ADMIN' | 'PROPERTY_MANAGER' | 'OPERATIONS_MANAGER' | 'REVENUE_MANAGER' | 'GUEST_SERVICES';

interface ManagementRestrictions {
  hiddenFeatures: string[];
  limitedFeatures: string[];
  accessMethods: string[];
  quickStats: string[];
}

interface ManagementRestrictionsMap {
  [key: string]: ManagementRestrictions;
}

export default function SeraiManagementDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [managementRole, setManagementRole] = useState<ManagementRole>('ADMIN');
  const [activeSubTab, setActiveSubTab] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [communicationHubTab, setCommunicationHubTab] = useState('communication-hub');
  
  // WebSocket and real-time sync
  const {
    dashboardData,
    syncStatus,
    notifications,
    isConnected,
    connectionStatus,
    syncAllData,
    syncDataType,
    sendPartnerUpdate,
    sendPartnerSpecificUpdate,
    isDataStale,
    getLastSyncTime
  } = useDashboardSync();

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const managementFeatures = [
    {
      id: 'overview',
      title: 'Management Overview',
      icon: <Home className="h-5 w-5" />,
      description: 'Executive dashboard with key metrics and platform performance'
    },
    {
      id: 'partner-management',
      title: 'Partner Management',
      icon: <Users className="h-5 w-5" />,
      description: 'Manage partner relationships, contracts, and performance'
    },
    {
      id: 'property-operations',
      title: 'Property Operations',
      icon: <Building2 className="h-5 w-5" />,
      description: 'Oversee all properties, maintenance, and operational excellence'
    },
    {
      id: 'revenue-financial',
      title: 'Revenue & Financial',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Platform revenue, partner payouts, and financial analytics'
    },
    {
      id: 'guest-experience',
      title: 'Guest Experience',
      icon: <Star className="h-5 w-5" />,
      description: 'Guest satisfaction, reviews, and experience optimization'
    },
    {
      id: 'operations-management',
      title: 'Operations Management',
      icon: <Settings className="h-5 w-5" />,
      description: 'Task management, staff coordination, and quality assurance'
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence',
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Market analytics, predictive insights, and strategic planning'
    },
    {
      id: 'communication-hub',
      title: 'Communication Hub',
      icon: <MessageSquare className="h-5 w-5" />,
      description: 'Centralized communication with partners, guests, and team'
    },
    {
      id: 'compliance-legal',
      title: 'Compliance & Legal',
      icon: <Shield className="h-5 w-5" />,
      description: 'Regulatory compliance, legal matters, and risk management'
    },
    {
      id: 'technology-management',
      title: 'Technology Management',
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Platform technology, integrations, and system management'
    },
    {
      id: 'reporting-analytics',
      title: 'Reporting & Analytics',
      icon: <FileText className="h-5 w-5" />,
      description: 'Comprehensive reporting and data analytics'
    },
    {
      id: 'system-administration',
      title: 'System Administration',
      icon: <Database className="h-5 w-5" />,
      description: 'User management, system settings, and platform configuration'
    }
  ];

  // Management role restrictions
  const managementRestrictions: ManagementRestrictionsMap = {
    'SUPER_ADMIN': {
      hiddenFeatures: [],
      limitedFeatures: [],
      accessMethods: ['web', 'mobile', 'api'],
      quickStats: ['Total Revenue', 'Active Properties', 'Partner Count', 'Guest Satisfaction']
    },
    'ADMIN': {
      hiddenFeatures: ['system-administration'],
      limitedFeatures: [],
      accessMethods: ['web', 'mobile'],
      quickStats: ['Total Revenue', 'Active Properties', 'Partner Count', 'Guest Satisfaction']
    },
    'PROPERTY_MANAGER': {
      hiddenFeatures: ['revenue-financial', 'business-intelligence', 'system-administration'],
      limitedFeatures: ['partner-management'],
      accessMethods: ['web', 'mobile'],
      quickStats: ['Property Performance', 'Maintenance Issues', 'Guest Satisfaction', 'Compliance Status']
    },
    'OPERATIONS_MANAGER': {
      hiddenFeatures: ['revenue-financial', 'business-intelligence', 'system-administration'],
      limitedFeatures: ['partner-management'],
      accessMethods: ['web', 'mobile'],
      quickStats: ['Task Completion', 'Staff Performance', 'Quality Score', 'Efficiency Metrics']
    },
    'REVENUE_MANAGER': {
      hiddenFeatures: ['operations-management', 'system-administration'],
      limitedFeatures: ['property-operations'],
      accessMethods: ['web', 'mobile'],
      quickStats: ['Revenue Growth', 'Pricing Performance', 'Market Share', 'Profit Margins']
    },
    'GUEST_SERVICES': {
      hiddenFeatures: ['revenue-financial', 'business-intelligence', 'system-administration', 'compliance-legal'],
      limitedFeatures: ['partner-management', 'property-operations'],
      accessMethods: ['web', 'mobile'],
      quickStats: ['Guest Satisfaction', 'Response Time', 'Issue Resolution', 'Review Score']
    }
  };

  // Get visible features based on management role
  const getVisibleFeatures = () => {
    const restrictions = managementRestrictions[managementRole];
    return managementFeatures.filter(feature => 
      !restrictions.hiddenFeatures.includes(feature.id)
    );
  };

  // Get access methods based on management role
  const getAccessMethods = () => {
    const restrictions = managementRestrictions[managementRole];
    const allMethods = [
      {
        title: 'Web Application',
        description: 'Full-featured web dashboard for comprehensive management',
        icon: <Globe className="h-6 w-6 text-serai-navy-500" />
      },
      {
        title: 'Mobile App',
        description: 'Mobile-optimized interface for on-the-go management',
        icon: <Smartphone className="h-6 w-6 text-serai-forest-500" />
      },
      {
        title: 'API Access',
        description: 'REST API for integrations and custom applications',
        icon: <Settings className="h-6 w-6 text-serai-gold-500" />
      }
    ];

    return allMethods.filter(method => 
      restrictions.accessMethods.includes(method.title.toLowerCase().replace(' ', '-').replace(' app', '').replace(' access', ''))
    );
  };

  // Get quick stats based on management role
  const getQuickStats = () => {
    const restrictions = managementRestrictions[managementRole];
    const stats = restrictions.quickStats;
    
    return [
      {
        label: stats[0],
        value: managementRole === 'REVENUE_MANAGER' ? '$2.4M' : managementRole === 'PROPERTY_MANAGER' ? '98%' : '$2.4M',
        color: 'serai-navy',
        icon: <DollarSign className="h-8 w-8" />
      },
      {
        label: stats[1],
        value: managementRole === 'PROPERTY_MANAGER' ? '156' : managementRole === 'OPERATIONS_MANAGER' ? '94%' : '156',
        color: 'serai-forest',
        icon: <Building2 className="h-8 w-8" />
      },
      {
        label: stats[2],
        value: managementRole === 'OPERATIONS_MANAGER' ? '89%' : managementRole === 'GUEST_SERVICES' ? '2.3min' : '89',
        color: 'serai-cream',
        icon: <Users className="h-8 w-8" />
      },
      {
        label: stats[3],
        value: managementRole === 'GUEST_SERVICES' ? '4.8' : managementRole === 'REVENUE_MANAGER' ? '23%' : '4.8',
        color: 'serai-gold',
        icon: <Star className="h-8 w-8" />
      }
    ];
  };

  const renderPartnerManagementContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
          <h2 className="text-2xl font-bold text-serai-charcoal-500 mb-4">Partner Management</h2>
          <p className="text-serai-neutral-500 mb-6">Manage partner relationships, contracts, and performance across all partnership models.</p>
          
          {/* Partnership Model Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <h3 className="font-semibold text-gray-900">Master Lease</h3>
              <p className="text-2xl font-bold text-gray-700">12</p>
              <p className="text-sm text-gray-600">Properties</p>
            </div>
            <div className="p-4 bg-gray-200 rounded-lg border border-gray-400">
              <h3 className="font-semibold text-gray-900">Hybrid Lease</h3>
              <p className="text-2xl font-bold text-gray-700">8</p>
              <p className="text-sm text-gray-600">Properties</p>
            </div>
            <div className="p-4 bg-gray-300 rounded-lg border border-gray-500">
              <h3 className="font-semibold text-gray-900">Revenue Share</h3>
              <p className="text-2xl font-bold text-gray-800">45</p>
              <p className="text-sm text-gray-700">Properties</p>
            </div>
            <div className="p-4 bg-gray-400 rounded-lg border border-gray-600">
              <h3 className="font-semibold text-gray-900">Management Agreement</h3>
              <p className="text-2xl font-bold text-gray-800">23</p>
              <p className="text-sm text-gray-700">Properties</p>
            </div>
            <div className="p-4 bg-gray-500 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-gray-900">Franchise Model</h3>
              <p className="text-2xl font-bold text-gray-800">15</p>
              <p className="text-sm text-gray-700">Properties</p>
            </div>
          </div>

          {/* Partner List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-serai-charcoal-500">Recent Partners</h3>
              <button className="px-4 py-2 bg-serai-red-600 text-white rounded-lg hover:bg-serai-red-700 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Partner</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-serai-neutral-200">
                <thead className="bg-serai-neutral-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-serai-neutral-600 uppercase">Partner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-serai-neutral-600 uppercase">Partnership Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-serai-neutral-600 uppercase">Properties</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-serai-neutral-600 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-serai-neutral-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-serai-neutral-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-serai-neutral-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                          <div className="text-sm text-gray-500">sarah.johnson@email.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-serai-navy-100 text-serai-navy-800">
                        Master Lease
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$25,500</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-serai-forest-100 text-serai-forest-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-serai-navy-600 hover:text-serai-navy-900 mr-3 font-medium">View</button>
                      <button className="text-serai-navy-600 hover:text-serai-navy-900">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Michael Chen</div>
                          <div className="text-sm text-gray-500">michael.chen@email.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-serai-gold-100 text-serai-gold-800">
                        Revenue Share
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">7</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$42,300</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-serai-forest-100 text-serai-forest-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-serai-navy-600 hover:text-serai-navy-900 mr-3 font-medium">View</button>
                      <button className="text-serai-navy-600 hover:text-serai-navy-900">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPropertyOperationsContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Operations</h2>
          <p className="text-gray-600 mb-6">Oversee all properties, maintenance, and operational excellence across the platform.</p>
          
          {/* Property Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Active Properties</h3>
                  <p className="text-2xl font-bold text-gray-700">142</p>
                </div>
                <CheckCircle className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-200 rounded-lg border border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Maintenance Issues</h3>
                  <p className="text-2xl font-bold text-gray-700">8</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-300 rounded-lg border border-gray-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Pending Inspections</h3>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <Calendar className="h-8 w-8 text-gray-800" />
              </div>
            </div>
            <div className="p-4 bg-gray-400 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Certification Rate</h3>
                  <p className="text-2xl font-bold text-gray-800">94%</p>
                </div>
                <Award className="h-8 w-8 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Property List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Property Portfolio</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Filter className="h-4 w-4 inline mr-1" />
                  Filter
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Download className="h-4 w-4 inline mr-1" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Luxury Resort - Bali</h4>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-serai-forest-100 text-serai-forest-800">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Master Lease • 3 Properties</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Revenue: $8,500/mo</span>
                  <span className="text-serai-forest-600">98% Occupancy</span>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Boutique Hotel - Paris</h4>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-serai-cream-100 text-serai-cream-800">
                    Maintenance
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Revenue Share • 1 Property</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Revenue: $12,300/mo</span>
                  <span className="text-serai-cream-600">AC Issue</span>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Eco Lodge - Costa Rica</h4>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-serai-forest-100 text-serai-forest-800">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Management Agreement • 2 Properties</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Revenue: $6,800/mo</span>
                  <span className="text-serai-forest-600">92% Occupancy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRevenueFinancialContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Revenue & Financial Management</h2>
          <p className="text-gray-600 mb-6">Platform revenue, partner payouts, and comprehensive financial analytics.</p>
          
          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Total Revenue</h3>
                  <p className="text-2xl font-bold text-gray-700">$2.4M</p>
                  <p className="text-sm text-gray-600">+12% vs last month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-200 rounded-lg border border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Partner Payouts</h3>
                  <p className="text-2xl font-bold text-gray-700">$1.8M</p>
                  <p className="text-sm text-gray-600">75% of revenue</p>
                </div>
                <Users className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-300 rounded-lg border border-gray-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Platform Fee</h3>
                  <p className="text-2xl font-bold text-gray-800">$600K</p>
                  <p className="text-sm text-gray-700">25% of revenue</p>
                </div>
                <DollarSign className="h-8 w-8 text-gray-800" />
              </div>
            </div>
            <div className="p-4 bg-gray-400 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Profit Margin</h3>
                  <p className="text-2xl font-bold text-gray-800">18%</p>
                  <p className="text-sm text-gray-700">+3% vs last month</p>
                </div>
                <BarChart3 className="h-8 w-8 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Revenue by Partnership Model */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Partnership Model</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Revenue Share</span>
                  <span className="font-semibold text-gray-900">$1.2M (50%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-serai-gold-600 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Management Agreement</span>
                  <span className="font-semibold text-gray-900">$720K (30%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-serai-cream-600 h-2 rounded-full" style={{width: '30%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Master Lease</span>
                  <span className="font-semibold text-gray-900">$360K (15%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-serai-navy-600 h-2 rounded-full" style={{width: '15%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Other Models</span>
                  <span className="font-semibold text-gray-900">$120K (5%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-serai-forest-600 h-2 rounded-full" style={{width: '5%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Partner Payout - Sarah Johnson</p>
                    <p className="text-xs text-gray-500">Master Lease • 3 Properties</p>
                  </div>
                  <span className="text-sm font-semibold text-serai-forest-600">+$25,500</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Platform Fee - Michael Chen</p>
                    <p className="text-xs text-gray-500">Revenue Share • 7 Properties</p>
                  </div>
                  <span className="text-sm font-semibold text-serai-red-600">-$8,460</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Partner Payout - David Wilson</p>
                    <p className="text-xs text-gray-500">Management Agreement • 2 Properties</p>
                  </div>
                  <span className="text-sm font-semibold text-serai-forest-600">+$13,600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGuestExperienceContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Guest Experience Management</h2>
          <p className="text-gray-600 mb-6">Guest satisfaction, reviews, and experience optimization across all properties.</p>
          
          {/* Guest Experience Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Overall Satisfaction</h3>
                  <p className="text-2xl font-bold text-gray-700">4.8/5</p>
                  <p className="text-sm text-gray-600">+0.2 vs last month</p>
                </div>
                <Star className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-200 rounded-lg border border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                  <p className="text-2xl font-bold text-gray-700">2.3min</p>
                  <p className="text-sm text-gray-600">Average response</p>
                </div>
                <Clock className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-300 rounded-lg border border-gray-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Issue Resolution</h3>
                  <p className="text-2xl font-bold text-gray-800">94%</p>
                  <p className="text-sm text-gray-700">Within 24 hours</p>
                </div>
                <CheckCircle className="h-8 w-8 text-gray-800" />
              </div>
            </div>
            <div className="p-4 bg-gray-400 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Review Score</h3>
                  <p className="text-2xl font-bold text-gray-800">4.7/5</p>
                  <p className="text-sm text-gray-700">Platform average</p>
                </div>
                <ThumbsUp className="h-8 w-8 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Sarah M.</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-serai-gold-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-700">"Amazing experience! The property was exactly as described and the service was exceptional."</p>
                  <p className="text-xs text-gray-500 mt-1">Luxury Resort - Bali</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Michael R.</p>
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-serai-gold-400 fill-current" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">5 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-700">"Great location and comfortable stay. Minor issue with WiFi but resolved quickly."</p>
                  <p className="text-xs text-gray-500 mt-1">Boutique Hotel - Paris</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Support Tickets</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-serai-red-50 rounded-lg border border-serai-red-200">
                  <div>
                    <p className="text-sm font-medium text-serai-red-900">High Priority</p>
                    <p className="text-xs text-serai-red-700">AC not working - Room 205</p>
                  </div>
                  <span className="text-xs text-serai-red-600">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-serai-cream-50 rounded-lg border border-serai-cream-200">
                  <div>
                    <p className="text-sm font-medium text-serai-cream-900">Medium Priority</p>
                    <p className="text-xs text-serai-cream-700">WiFi connectivity issues</p>
                  </div>
                  <span className="text-xs text-serai-cream-600">4 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-serai-forest-50 rounded-lg border border-serai-forest-200">
                  <div>
                    <p className="text-sm font-medium text-serai-forest-900">Resolved</p>
                    <p className="text-xs text-serai-forest-700">Late check-in request</p>
                  </div>
                  <span className="text-xs text-serai-forest-600">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOperationsManagementContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Operations Management</h2>
          <p className="text-gray-600 mb-6">Task management, staff coordination, and quality assurance across all properties.</p>
          
          {/* Operations Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Task Completion</h3>
                  <p className="text-2xl font-bold text-gray-700">94%</p>
                  <p className="text-sm text-gray-600">This week</p>
                </div>
                <CheckCircle className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-200 rounded-lg border border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Staff Performance</h3>
                  <p className="text-2xl font-bold text-gray-700">89%</p>
                  <p className="text-sm text-gray-600">Average rating</p>
                </div>
                <Users className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-300 rounded-lg border border-gray-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Quality Score</h3>
                  <p className="text-2xl font-bold text-gray-800">4.6/5</p>
                  <p className="text-sm text-gray-700">Inspection average</p>
                </div>
                <Award className="h-8 w-8 text-gray-800" />
              </div>
            </div>
            <div className="p-4 bg-gray-400 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Efficiency Metrics</h3>
                  <p className="text-2xl font-bold text-gray-800">87%</p>
                  <p className="text-sm text-gray-700">Time optimization</p>
                </div>
                <Target className="h-8 w-8 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Task Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Tasks</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-serai-red-50 rounded-lg border border-serai-red-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-serai-serai-red-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-serai-red-900">Urgent: AC Repair</p>
                      <p className="text-xs text-serai-red-700">Luxury Resort - Bali • Room 205</p>
                    </div>
                  </div>
                  <span className="text-xs text-serai-red-600">Due: 2 hours</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-serai-cream-50 rounded-lg border border-serai-cream-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-serai-cream-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-serai-cream-900">Housekeeping Inspection</p>
                      <p className="text-xs text-serai-cream-700">Boutique Hotel - Paris • All rooms</p>
                    </div>
                  </div>
                  <span className="text-xs text-serai-cream-600">Due: 4 hours</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-serai-forest-50 rounded-lg border border-serai-forest-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-serai-forest-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-serai-forest-900">Pool Maintenance</p>
                      <p className="text-xs text-serai-forest-700">Eco Lodge - Costa Rica • Completed</p>
                    </div>
                  </div>
                  <span className="text-xs text-serai-forest-600">Completed</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Maria Rodriguez</p>
                    <p className="text-xs text-gray-600">Housekeeping Manager</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">8:00 AM - 4:00 PM</p>
                    <p className="text-xs text-serai-forest-600">On Duty</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">James Wilson</p>
                    <p className="text-xs text-gray-600">Maintenance Technician</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">6:00 AM - 2:00 PM</p>
                    <p className="text-xs text-serai-navy-600">Break</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sarah Chen</p>
                    <p className="text-xs text-gray-600">Guest Services</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">12:00 PM - 8:00 PM</p>
                    <p className="text-xs text-serai-cream-600">Starting Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBusinessIntelligenceContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Intelligence</h2>
          <p className="text-gray-600 mb-6">Market analytics, predictive insights, and strategic planning for platform growth.</p>
          
          {/* Market Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Market Share</h3>
                  <p className="text-2xl font-bold text-gray-700">23%</p>
                  <p className="text-sm text-gray-600">+3% vs last quarter</p>
                </div>
                <TrendingUp className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-200 rounded-lg border border-gray-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Revenue Growth</h3>
                  <p className="text-2xl font-bold text-gray-700">18%</p>
                  <p className="text-sm text-gray-600">Year over year</p>
                </div>
                <BarChart3 className="h-8 w-8 text-gray-700" />
              </div>
            </div>
            <div className="p-4 bg-gray-300 rounded-lg border border-gray-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Customer Acquisition</h3>
                  <p className="text-2xl font-bold text-gray-800">1,247</p>
                  <p className="text-sm text-gray-700">New guests this month</p>
                </div>
                <Users className="h-8 w-8 text-gray-800" />
              </div>
            </div>
            <div className="p-4 bg-gray-400 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Predictive Score</h3>
                  <p className="text-2xl font-bold text-gray-800">87%</p>
                  <p className="text-sm text-gray-700">Growth probability</p>
                </div>
                <Target className="h-8 w-8 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Luxury Segment Growth</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-serai-forest-600">+15%</span>
                    <TrendingUp className="h-4 w-4 text-serai-forest-600" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-serai-forest-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Boutique Hotel Demand</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-serai-navy-600">+8%</span>
                    <TrendingUp className="h-4 w-4 text-serai-navy-600" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-serai-navy-600 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Eco-Tourism Interest</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-serai-gold-600">+22%</span>
                    <TrendingUp className="h-4 w-4 text-serai-gold-600" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-serai-gold-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictive Insights</h3>
              <div className="space-y-3">
                <div className="p-3 bg-serai-navy-50 rounded-lg border border-serai-navy-200">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="h-5 w-5 text-serai-navy-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-serai-navy-900">Revenue Opportunity</p>
                      <p className="text-xs text-serai-navy-700">Bali properties could increase rates by 12% during peak season</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-serai-forest-50 rounded-lg border border-serai-forest-200">
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="h-5 w-5 text-serai-forest-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-serai-forest-900">Growth Prediction</p>
                      <p className="text-xs text-serai-forest-700">Paris market shows 18% growth potential for Q2</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-serai-cream-50 rounded-lg border border-serai-cream-200">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-serai-cream-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-serai-cream-900">Risk Alert</p>
                      <p className="text-xs text-serai-cream-700">Costa Rica properties may face weather-related cancellations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCommunicationHubContent = () => {
    return (
      <div className="h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-serai-neutral-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Communication Hub</h2>
          <p className="text-gray-600">Centralized communication with partners, guests, and team members.</p>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mt-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setCommunicationHubTab('communication-hub')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  communicationHubTab === 'communication-hub'
                    ? 'border-serai-red-500 text-serai-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Communication Hub
              </button>
              <button
                onClick={() => setCommunicationHubTab('messages')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  communicationHubTab === 'messages'
                    ? 'border-serai-red-500 text-serai-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Messages
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {communicationHubTab === 'communication-hub' && (
            <div className="h-full overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              <div className="space-y-6">
                {/* Communication Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Active Conversations</h3>
                        <p className="text-2xl font-bold text-gray-700">24</p>
                        <p className="text-sm text-gray-600">Across all channels</p>
                      </div>
                      <MessageCircle className="h-8 w-8 text-gray-700" />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-200 rounded-lg border border-gray-400">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Response Rate</h3>
                        <p className="text-2xl font-bold text-gray-700">98%</p>
                        <p className="text-sm text-gray-600">Within 2 hours</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-gray-700" />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-300 rounded-lg border border-gray-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Partner Messages</h3>
                        <p className="text-2xl font-bold text-gray-800">156</p>
                        <p className="text-sm text-gray-700">This month</p>
                      </div>
                      <Users className="h-8 w-8 text-gray-800" />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-400 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Guest Inquiries</h3>
                        <p className="text-2xl font-bold text-gray-800">89</p>
                        <p className="text-sm text-gray-700">Pending resolution</p>
                      </div>
                      <Headphones className="h-8 w-8 text-gray-800" />
                    </div>
                  </div>
                </div>

                {/* Communication Channels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-serai-navy-50 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-serai-navy-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-serai-navy-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                            <span className="text-xs text-gray-500">2 min ago</span>
                          </div>
                          <p className="text-sm text-gray-700">"The maintenance issue in Room 205 has been resolved. Please update the status."</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button className="text-xs text-serai-navy-600 hover:text-serai-navy-800">Reply</button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">Mark as Read</button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-serai-forest-50 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-serai-forest-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-serai-forest-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Michael Chen</p>
                            <span className="text-xs text-gray-500">15 min ago</span>
                          </div>
                          <p className="text-sm text-gray-700">"Revenue share payment received. Thank you for the quick processing!"</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button className="text-xs text-serai-navy-600 hover:text-serai-navy-800">Reply</button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">Mark as Read</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-serai-navy-600 text-white rounded-lg hover:bg-serai-navy-700 transition-colors">
                        <Send className="h-4 w-4" />
                        <span>Send Announcement</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-serai-forest-600 text-white rounded-lg hover:bg-serai-forest-700 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>Start Group Chat</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-serai-gold-600 text-white rounded-lg hover:bg-serai-gold-700 transition-colors">
                        <Bell className="h-4 w-4" />
                        <span>Send Notification</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        <FileText className="h-4 w-4" />
                        <span>Create Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Serai Management Dashboard</h2>
                  <p className="text-gray-600 mt-2">
                    Comprehensive platform management and operational oversight for Serai Hotels.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Management Role:</span>
                  <select
                    value={managementRole}
                    onChange={(e) => setManagementRole(e.target.value as ManagementRole)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500"
                  >
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="ADMIN">Admin</option>
                    <option value="PROPERTY_MANAGER">Property Manager</option>
                    <option value="OPERATIONS_MANAGER">Operations Manager</option>
                    <option value="REVENUE_MANAGER">Revenue Manager</option>
                    <option value="GUEST_SERVICES">Guest Services</option>
                  </select>
                </div>
              </div>
              
              {/* Management Role Info */}
              <div className="bg-serai-navy-50 border border-serai-navy-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-serai-navy-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-serai-navy-900">
                      {managementRole.replace('_', ' ')} Access Level
                    </h3>
                    <p className="text-sm text-serai-navy-700 mt-1">
                      {managementRole === 'SUPER_ADMIN' && 'Full platform access with complete administrative privileges.'}
                      {managementRole === 'ADMIN' && 'Comprehensive management access with administrative oversight.'}
                      {managementRole === 'PROPERTY_MANAGER' && 'Property-focused management with operational oversight.'}
                      {managementRole === 'OPERATIONS_MANAGER' && 'Operations-focused management with task coordination.'}
                      {managementRole === 'REVENUE_MANAGER' && 'Revenue-focused management with financial oversight.'}
                      {managementRole === 'GUEST_SERVICES' && 'Guest-focused management with service excellence.'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {getQuickStats().map((stat, index) => {
                  const colorClasses = {
                    'serai-navy': {
                      bg: 'bg-gray-100',
                      border: 'border-gray-300',
                      text: 'text-gray-600',
                      textDark: 'text-gray-900'
                    },
                    'serai-forest': {
                      bg: 'bg-gray-200',
                      border: 'border-gray-400',
                      text: 'text-gray-700',
                      textDark: 'text-gray-900'
                    },
                    'serai-cream': {
                      bg: 'bg-gray-300',
                      border: 'border-gray-500',
                      text: 'text-gray-700',
                      textDark: 'text-gray-900'
                    },
                    'serai-gold': {
                      bg: 'bg-gray-400',
                      border: 'border-gray-600',
                      text: 'text-gray-800',
                      textDark: 'text-gray-900'
                    }
                  };
                  
                  const classes = colorClasses[stat.color as keyof typeof colorClasses];
                  
                  return (
                    <div key={index} className={`${classes.bg} ${classes.border} border rounded-lg p-4`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm ${classes.text}`}>{stat.label}</p>
                          <p className={`text-2xl font-bold ${classes.textDark}`}>{stat.value}</p>
                        </div>
                        <div className={classes.text}>
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Access Methods */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Access Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getAccessMethods().map((method, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-serai-neutral-100 rounded-lg border border-serai-neutral-200">
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

      case 'partner-management':
        return renderPartnerManagementContent();

      case 'property-operations':
        return renderPropertyOperationsContent();

      case 'revenue-financial':
        return renderRevenueFinancialContent();

      case 'guest-experience':
        return renderGuestExperienceContent();

      case 'operations-management':
        return renderOperationsManagementContent();

      case 'business-intelligence':
        return renderBusinessIntelligenceContent();

      case 'communication-hub':
        return renderCommunicationHubContent();

      default:
        return (
          <div className="space-y-6">
            <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
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

  // Render mobile dashboard if on mobile
  if (isMobile) {
    return (
      <MobileManagementDashboard
        managementRole={managementRole}
        isConnected={isConnected}
        syncStatus={syncStatus}
        onSync={syncAllData}
        onSectionChange={setActiveSection}
        activeSection={activeSection}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopAppBar 
        backHref="/tabs" 
        logoHref="/tabs" 
        showListingButton={false} 
        showLanguageButton={true} 
        showMenuButton={true}
        hiddenDropdownItems={[]}
      />

      <div className="flex pt-20">
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
                    <Building className="h-8 w-8" style={{ color: '#660f0f' }} />
                    <span className="ml-2 text-xl font-bold text-gray-900">Management Dashboard</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Role:</span>
                    <div className="text-sm font-medium text-gray-700">{managementRole.replace('_', ' ')}</div>
                  </div>
                </div>
                <nav className="mt-5 px-2 space-y-3">
                  {getVisibleFeatures().map((feature) => {
                    const isHidden = managementRestrictions[managementRole].hiddenFeatures.includes(feature.id);
                    const isLimited = managementRestrictions[managementRole].limitedFeatures.includes(feature.id);
                    
                    return (
                      <button
                        key={feature.id}
                        onClick={() => {
                          setActiveSection(feature.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          activeSection === feature.id
                            ? 'bg-serai-red-100 text-serai-red-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {feature.icon}
                        <span className="ml-3 flex-1 text-left">{feature.title}</span>
                        {isLimited && (
                          <span className="ml-2 text-xs text-serai-cream-600 bg-serai-cream-100 px-2 py-1 rounded">
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
                    <Building className="h-8 w-8" style={{ color: '#660f0f' }} />
                    <span className="ml-2 text-xl font-bold text-gray-900">Management Dashboard</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Role:</span>
                    <div className="text-sm font-medium text-gray-700">{managementRole.replace('_', ' ')}</div>
                  </div>
                </div>
                <nav className="mt-5 flex-1 px-2 space-y-3">
                  {getVisibleFeatures().map((feature) => {
                    const isHidden = managementRestrictions[managementRole].hiddenFeatures.includes(feature.id);
                    const isLimited = managementRestrictions[managementRole].limitedFeatures.includes(feature.id);
                    
                    return (
                      <button
                        key={feature.id}
                        onClick={() => setActiveSection(feature.id)}
                        className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          activeSection === feature.id
                            ? 'bg-serai-red-100 text-serai-red-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {feature.icon}
                        <span className="ml-3 flex-1 text-left">{feature.title}</span>
                        {isLimited && (
                          <span className="ml-2 text-xs text-serai-cream-600 bg-serai-cream-100 px-2 py-1 rounded">
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
          <div className="lg:hidden pl-1 pt-5 sm:pl-3 sm:pt-5">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-serai-serai-red-500"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Page Content */}
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" style={{ maxHeight: 'calc(100vh - 80px)' }}>
            {activeSection === 'communication-hub' && communicationHubTab === 'messages' ? (
              <div className="h-full">
                <ManagementMessages />
              </div>
            ) : (
            <div className="pt-4 pb-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {renderDashboardContent()}
              </div>
            </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
