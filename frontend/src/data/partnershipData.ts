// Externalized data to reduce bundle size
export const DASHBOARD_FEATURES = [
  {
    id: 'overview',
    title: 'Dashboard Overview',
    iconName: 'Home',
    description: 'Main dashboard with key metrics and quick actions'
  },
  {
    id: 'property-management',
    title: 'Property Management',
    iconName: 'Building2',
    description: 'Manage your property portfolio, details, and performance'
  },
  {
    id: 'revenue-financial',
    title: 'Revenue & Financial',
    iconName: 'BarChart3',
    description: 'Track earnings, pricing, payments, and financial reports'
  },
  {
    id: 'booking-management',
    title: 'Booking Management',
    iconName: 'Calendar',
    description: 'Manage bookings, calendar, and guest check-ins/outs'
  },
  {
    id: 'guest-experience',
    title: 'Guest Experience',
    iconName: 'Users',
    description: 'Guest communication, reviews, and feedback management'
  },
  {
    id: 'operations',
    title: 'Operations Management',
    iconName: 'Settings',
    description: 'Housekeeping, maintenance, inventory, and staff management'
  },
  {
    id: 'analytics-insights',
    title: 'Analytics & Insights',
    iconName: 'TrendingUp',
    description: 'Performance metrics, market intelligence, and optimization'
  },
  {
    id: 'channel-management',
    title: 'Channel Management',
    iconName: 'Globe',
    description: 'Multi-channel distribution and rate parity management'
  },
  {
    id: 'partnership',
    title: 'Partnership Management',
    iconName: 'Shield',
    description: 'Partnership details, contracts, and support access'
  },
  {
    id: 'technology',
    title: 'Technology Features',
    iconName: 'Smartphone',
    description: 'Smart locks, IoT monitoring, and automated systems'
  },
  {
    id: 'communication',
    title: 'Communication & Support',
    iconName: 'MessageSquare',
    description: 'Partner news, support tickets, and community forum'
  },
  {
    id: 'compliance',
    title: 'Compliance & Legal',
    iconName: 'FileText',
    description: 'Regulatory compliance, insurance, and safety standards'
  },
  {
    id: 'development',
    title: 'Development & Growth',
    iconName: 'TrendingUp',
    description: 'Expansion planning, investment analysis, and market research'
  },
  {
    id: 'customization',
    title: 'Customization & Preferences',
    iconName: 'Settings',
    description: 'Dashboard customization, notifications, and preferences'
  }
] as const;

export const MASTER_LEASE_FEATURES = [
  {
    id: 'financial-overview',
    title: 'Financial Overview',
    iconName: 'BarChart3',
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
    iconName: 'Building2',
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
    iconName: 'MessageSquare',
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
    iconName: 'FileText',
    description: 'Monthly summaries and annual performance reports',
    subTabs: [
      { id: 'monthly-summary', title: 'Monthly Occupancy Summary', description: 'Monthly occupancy and performance summary' },
      { id: 'annual-report', title: 'Annual Performance Report', description: 'Comprehensive annual performance analysis' },
      { id: 'compliance-status', title: 'Lease Compliance Status', description: 'Current compliance status and requirements' },
      { id: 'property-value', title: 'Property Value Tracking', description: 'Property value trends and assessments' }
    ]
  }
] as const;

export const PARTNERSHIP_RESTRICTIONS = {
  'Master Lease': {
    hiddenFeatures: ['revenue-financial', 'booking-management', 'guest-experience', 'operations', 'analytics-insights', 'channel-management', 'partnership', 'technology', 'communication', 'compliance', 'development', 'customization'] as string[],
    limitedFeatures: [] as string[],
    accessMethods: ['web'] as string[],
    quickStats: ['Monthly Rent Payment', 'Property Status', 'Lease Compliance', 'Next Inspection'] as string[],
    customFeatures: MASTER_LEASE_FEATURES
  },
  'Hybrid Lease': {
    hiddenFeatures: ['development', 'customization'] as string[],
    limitedFeatures: ['pricing-management', 'channel-management'] as string[],
    accessMethods: ['web', 'mobile'] as string[],
    quickStats: ['Monthly Revenue', 'Revenue Share %', 'Occupancy Rate', 'Guest Rating'] as string[]
  },
  'Revenue Share': {
    hiddenFeatures: [] as string[],
    limitedFeatures: ['development', 'customization'] as string[],
    accessMethods: ['web', 'mobile', 'api'] as string[],
    quickStats: ['Monthly Revenue', 'Revenue Share %', 'Occupancy Rate', 'Guest Rating'] as string[]
  },
  'Management Agreement': {
    hiddenFeatures: ['operations', 'staff-management', 'development', 'technology', 'customization'] as string[],
    limitedFeatures: ['property-management'] as string[],
    accessMethods: ['web'] as string[],
    quickStats: ['Revenue Performance', 'Occupancy Rate', 'Guest Satisfaction', 'Maintenance Status'] as string[]
  },
  'Franchise Model': {
    hiddenFeatures: ['development'] as string[],
    limitedFeatures: ['customization'] as string[],
    accessMethods: ['web', 'mobile', 'api'] as string[],
    quickStats: ['Monthly Revenue', 'Franchise Performance', 'Brand Compliance', 'Guest Rating'] as string[]
  }
};
