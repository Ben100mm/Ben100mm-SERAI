// Externalized data for hosts dashboard
export const HOSTS_DASHBOARD_FEATURES = [
  {
    id: 'overview',
    title: 'Dashboard',
    iconName: 'Home',
    description: 'Main dashboard with key metrics and quick actions'
  },
  {
    id: 'calendar',
    title: 'Calendar',
    iconName: 'Calendar',
    description: 'Manage bookings, availability, and guest check-ins/outs'
  },
  {
    id: 'listings',
    title: 'Listings',
    iconName: 'Building2',
    description: 'Create and manage property, experience, and service listings'
  },
  {
    id: 'messages',
    title: 'Messages',
    iconName: 'MessageSquare',
    description: 'Communicate with guests, handle inquiries and reviews'
  },
  {
    id: 'earnings',
    title: 'Earnings',
    iconName: 'DollarSign',
    description: 'Track earnings, payments, and financial performance'
  },
  {
    id: 'insights',
    title: 'Insights',
    iconName: 'BarChart3',
    description: 'Analytics, performance metrics, and business intelligence'
  },
  {
    id: 'hosting-resources',
    title: 'Hosting Resources',
    iconName: 'Settings',
    description: 'Guides, tips, and tools for successful hosting'
  },
  {
    id: 'get-help',
    title: 'Get Help',
    iconName: 'HelpCircle',
    description: 'Support, assistance, and troubleshooting'
  },
  {
    id: 'find-cohost',
    title: 'Find a Co-host',
    iconName: 'Users',
    description: 'Connect with partners and co-hosts'
  },
  {
    id: 'create-listing',
    title: 'Create a New Listing',
    iconName: 'Plus',
    description: 'Add property, experience, or service listing'
  },
  {
    id: 'refer-host',
    title: 'Refer a Host',
    iconName: 'Share2',
    description: 'Earn rewards by referring new hosts to Serai'
  }
] as const;

export const HOSTS_RESTRICTIONS = {
  'Property Host': {
    hiddenFeatures: [] as string[],
    limitedFeatures: [] as string[],
    accessMethods: ['web', 'mobile'] as string[],
    quickStats: ['Active Properties', 'Monthly Revenue', 'Occupancy Rate', 'Guest Rating'] as string[]
  },
  'Experience Host': {
    hiddenFeatures: [] as string[],
    limitedFeatures: [] as string[],
    accessMethods: ['web', 'mobile'] as string[],
    quickStats: ['Active Experiences', 'Monthly Bookings', 'Guest Satisfaction', 'Average Rating'] as string[]
  },
  'Service Host': {
    hiddenFeatures: [] as string[],
    limitedFeatures: [] as string[],
    accessMethods: ['web', 'mobile'] as string[],
    quickStats: ['Active Services', 'Monthly Bookings', 'Service Rating', 'Repeat Customers'] as string[]
  },
  'Multi-Host': {
    hiddenFeatures: [] as string[],
    limitedFeatures: [] as string[],
    accessMethods: ['web', 'mobile', 'api'] as string[],
    quickStats: ['Total Listings', 'Monthly Revenue', 'Overall Rating', 'Active Bookings'] as string[]
  }
};

export const SAMPLE_PROPERTIES = [
  {
    id: '1',
    title: 'Luxury Downtown Apartment',
    type: 'Apartment',
    location: 'Toronto, ON',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    price: 150,
    rating: 4.8,
    reviews: 24,
    status: 'Active',
    image: '/images/serai-images/placeholder.txt'
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin',
    type: 'Cabin',
    location: 'Whistler, BC',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    price: 200,
    rating: 4.9,
    reviews: 18,
    status: 'Active',
    image: '/images/serai-images/placeholder.txt'
  },
  {
    id: '3',
    title: 'Beachfront Villa',
    type: 'Villa',
    location: 'Tofino, BC',
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    price: 350,
    rating: 4.7,
    reviews: 31,
    status: 'Draft',
    image: '/images/serai-images/placeholder.txt'
  }
];

export const SAMPLE_EXPERIENCES = [
  {
    id: '1',
    title: 'Wine Tasting Tour',
    type: 'Food & Drink',
    location: 'Niagara-on-the-Lake, ON',
    duration: '4 hours',
    price: 85,
    rating: 4.9,
    reviews: 12,
    status: 'Active',
    image: '/images/serai-images/placeholder.txt'
  },
  {
    id: '2',
    title: 'Photography Workshop',
    type: 'Arts & Culture',
    location: 'Vancouver, BC',
    duration: '3 hours',
    price: 120,
    rating: 4.8,
    reviews: 8,
    status: 'Active',
    image: '/images/serai-images/placeholder.txt'
  },
  {
    id: '3',
    title: 'Hiking Adventure',
    type: 'Outdoor',
    location: 'Banff, AB',
    duration: '6 hours',
    price: 95,
    rating: 4.6,
    reviews: 15,
    status: 'Draft',
    image: '/images/serai-images/placeholder.txt'
  }
];

export const SAMPLE_SERVICES = [
  {
    id: '1',
    title: 'Private Chef Service',
    type: 'Culinary',
    location: 'Toronto, ON',
    duration: '3 hours',
    price: 200,
    rating: 4.9,
    reviews: 6,
    status: 'Active',
    image: '/images/serai-images/placeholder.txt'
  },
  {
    id: '2',
    title: 'Spa & Wellness Package',
    type: 'Wellness',
    location: 'Vancouver, BC',
    duration: '2 hours',
    price: 150,
    rating: 4.7,
    reviews: 9,
    status: 'Active',
    image: '/images/serai-images/placeholder.txt'
  },
  {
    id: '3',
    title: 'Concierge Service',
    type: 'Lifestyle',
    location: 'Montreal, QC',
    duration: 'Flexible',
    price: 50,
    rating: 4.8,
    reviews: 4,
    status: 'Draft',
    image: '/images/serai-images/placeholder.txt'
  }
];
