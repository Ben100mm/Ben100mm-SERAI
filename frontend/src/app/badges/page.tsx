'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TopAppBar from '@/components/TopAppBar';
import { 
  Award, 
  MapPin, 
  Home, 
  Activity, 
  Clock, 
  User, 
  Star, 
  Globe, 
  Mountain, 
  Castle, 
  Building, 
  Waves, 
  Crown, 
  Heart, 
  Calendar, 
  Users, 
  Compass,
  Zap,
  Repeat,
  ThumbsUp,
  Shield,
  BookOpen,
  Navigation,
  Eye,
  Coffee,
  Target
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  requirement: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Club {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  memberCount: number;
  status: 'member' | 'invited' | 'eligible' | 'not-eligible';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  requirements: string;
  userType: 'traveler' | 'host' | 'both';
}

export default function BadgesPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'clubs' | 'badges'>('clubs');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const badges: Badge[] = [
    // Journey Milestones
    {
      id: 'first-journey',
      name: 'First Journey',
      description: 'Completed your first booking',
      icon: <Award className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: 'First booking completed',
      rarity: 'common',
      earned: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 'the-wayfarer',
      name: 'The Wayfarer',
      description: 'Completed your first stay',
      icon: <MapPin className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: '1 stay completed',
      rarity: 'common',
      earned: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 'explorer',
      name: 'Explorer',
      description: 'Completed 10 stays',
      icon: <Compass className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: '10 stays',
      rarity: 'uncommon',
      earned: true,
      progress: 10,
      maxProgress: 10
    },
    {
      id: 'traveler',
      name: 'Traveler',
      description: 'Completed 20 stays',
      icon: <Globe className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: '20 stays',
      rarity: 'uncommon',
      earned: false,
      progress: 10,
      maxProgress: 20
    },
    {
      id: 'voyager',
      name: 'Voyager',
      description: 'Completed 30 stays',
      icon: <Star className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: '30 stays',
      rarity: 'rare',
      earned: false,
      progress: 10,
      maxProgress: 30
    },
    {
      id: 'globetrotter',
      name: 'Globetrotter',
      description: '50 stays outside country of residence',
      icon: <Globe className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: '50 stays outside country of residence',
      rarity: 'epic',
      earned: false,
      progress: 5,
      maxProgress: 50
    },
    {
      id: 'bedouin',
      name: 'Bedouin',
      description: '50 stays within country of residence',
      icon: <Home className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: '50 stays within country of residence',
      rarity: 'epic',
      earned: false,
      progress: 10,
      maxProgress: 50
    },
    {
      id: 'worldly-nomad',
      name: 'Worldly Nomad',
      description: '100 stays outside country of residence',
      icon: <Compass className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: '100 stays outside country of residence',
      rarity: 'legendary',
      earned: false,
      progress: 5,
      maxProgress: 100
    },
    {
      id: 'atlas-crown',
      name: 'The Atlas Crown',
      description: "Serai's top explorer badge",
      icon: <Crown className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: "Serai's top explorer badge",
      rarity: 'legendary',
      earned: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'eternal-serai',
      name: 'The Eternal Serai',
      description: 'Lifetime loyalty milestone',
      icon: <Heart className="h-6 w-6" />,
      category: 'Journey Milestones',
      requirement: 'Lifetime loyalty milestone',
      rarity: 'legendary',
      earned: false,
      progress: 0,
      maxProgress: 1
    },

    // Global Exploration
    {
      id: 'local-explorer',
      name: 'Local Explorer',
      description: '5 trips within home country',
      icon: <MapPin className="h-6 w-6" />,
      category: 'Global Exploration',
      requirement: '5 trips within home country',
      rarity: 'common',
      earned: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: 'nomads-mark',
      name: "Nomad's Mark",
      description: '15 different cities visited',
      icon: <MapPin className="h-6 w-6" />,
      category: 'Global Exploration',
      requirement: '15 different cities visited',
      rarity: 'uncommon',
      earned: false,
      progress: 8,
      maxProgress: 15
    },
    {
      id: 'mapmaker',
      name: 'Mapmaker',
      description: '10 regions explored',
      icon: <MapPin className="h-6 w-6" />,
      category: 'Global Exploration',
      requirement: '10 regions explored',
      rarity: 'uncommon',
      earned: false,
      progress: 3,
      maxProgress: 10
    },
    {
      id: 'horizon-seeker',
      name: 'Horizon Seeker',
      description: '4+ continents traveled',
      icon: <Globe className="h-6 w-6" />,
      category: 'Global Exploration',
      requirement: '4+ continents traveled',
      rarity: 'rare',
      earned: false,
      progress: 2,
      maxProgress: 4
    },
    {
      id: 'global-atlas',
      name: 'Global Atlas',
      description: '25+ countries',
      icon: <Globe className="h-6 w-6" />,
      category: 'Global Exploration',
      requirement: '25+ countries',
      rarity: 'epic',
      earned: false,
      progress: 5,
      maxProgress: 25
    },
    {
      id: 'world-compass',
      name: 'World Compass',
      description: 'Visited all continents',
      icon: <Compass className="h-6 w-6" />,
      category: 'Global Exploration',
      requirement: 'Visited all continents',
      rarity: 'legendary',
      earned: false,
      progress: 2,
      maxProgress: 7
    },
    {
      id: 'silk-route-adventurer',
      name: 'Silk Route Adventurer',
      description: '3 trips booked through Serai Routes',
      icon: <MapPin className="h-6 w-6" />,
      category: 'Global Exploration',
      requirement: '3 trips booked through Serai Routes',
      rarity: 'rare',
      earned: false,
      progress: 1,
      maxProgress: 3
    },
    {
      id: 'world-nomad',
      name: 'World Nomad',
      description: 'Milestone for global travel',
      icon: <Globe className="h-6 w-6" />,
      category: 'Global Exploration',
      requirement: 'Milestone for global travel',
      rarity: 'epic',
      earned: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'pirate',
      name: 'Pirate',
      description: '5+ Island stays',
      icon: <Waves className="h-6 w-6" />,
      category: 'Global Exploration',
      requirement: '5+ Island stays',
      rarity: 'rare',
      earned: false,
      progress: 2,
      maxProgress: 5
    },

    // Stay Styles
    {
      id: 'cabin-dweller',
      name: 'Cabin Dweller',
      description: 'Booked 5+ cabins',
      icon: <Mountain className="h-6 w-6" />,
      category: 'Stay Styles',
      requirement: '5+ cabins',
      rarity: 'uncommon',
      earned: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: 'castle-seeker',
      name: 'Castle Seeker',
      description: 'Booked 3+ castle/manor',
      icon: <Castle className="h-6 w-6" />,
      category: 'Stay Styles',
      requirement: '3+ castle/manor',
      rarity: 'rare',
      earned: false,
      progress: 1,
      maxProgress: 3
    },
    {
      id: 'city-soul',
      name: 'City Soul',
      description: '10+ urban condos',
      icon: <Building className="h-6 w-6" />,
      category: 'Stay Styles',
      requirement: '10+ urban condos',
      rarity: 'uncommon',
      earned: false,
      progress: 3,
      maxProgress: 10
    },
    {
      id: 'coastal-dreamer',
      name: 'Coastal Dreamer',
      description: '5+ seaside stays',
      icon: <Waves className="h-6 w-6" />,
      category: 'Stay Styles',
      requirement: '5+ seaside stays',
      rarity: 'uncommon',
      earned: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: 'luxury-lover',
      name: 'Luxury Lover',
      description: '10 premium Serais',
      icon: <Crown className="h-6 w-6" />,
      category: 'Stay Styles',
      requirement: '10 premium Serais',
      rarity: 'epic',
      earned: false,
      progress: 1,
      maxProgress: 10
    },
    {
      id: 'hidden-gem-hunter',
      name: 'Hidden Gem Hunter',
      description: '5 boutique/offbeat stays',
      icon: <Star className="h-6 w-6" />,
      category: 'Stay Styles',
      requirement: '5 boutique/offbeat stays',
      rarity: 'rare',
      earned: false,
      progress: 1,
      maxProgress: 5
    },
    {
      id: 'circle-keeper',
      name: 'Circle Keeper',
      description: '20 repeat stays',
      icon: <Repeat className="h-6 w-6" />,
      category: 'Stay Styles',
      requirement: '20 repeat stays',
      rarity: 'epic',
      earned: false,
      progress: 3,
      maxProgress: 20
    },
    {
      id: 'shepheard',
      name: 'Shepheard',
      description: 'Frequent traveler, 5+ trips per month',
      icon: <Calendar className="h-6 w-6" />,
      category: 'Stay Styles',
      requirement: '5+ trips per month',
      rarity: 'legendary',
      earned: false,
      progress: 0,
      maxProgress: 5
    },

    // Experiences & Activities
    {
      id: 'curious-cat',
      name: 'Curious Cat',
      description: '5 experiences',
      icon: <Activity className="h-6 w-6" />,
      category: 'Experiences & Activities',
      requirement: '5 experiences',
      rarity: 'common',
      earned: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: 'culture-curator',
      name: 'Culture Curator',
      description: '15 cultural activities',
      icon: <Award className="h-6 w-6" />,
      category: 'Experiences & Activities',
      requirement: '15 cultural activities',
      rarity: 'uncommon',
      earned: false,
      progress: 7,
      maxProgress: 15
    },
    {
      id: 'culinary-explorer',
      name: 'Culinary Explorer',
      description: '8 food experiences',
      icon: <Heart className="h-6 w-6" />,
      category: 'Experiences & Activities',
      requirement: '8 food experiences',
      rarity: 'uncommon',
      earned: false,
      progress: 3,
      maxProgress: 8
    },
    {
      id: 'wellness-seeker',
      name: 'Wellness Seeker',
      description: '15 spa/wellness stays',
      icon: <Heart className="h-6 w-6" />,
      category: 'Experiences & Activities',
      requirement: '15 spa/wellness stays',
      rarity: 'rare',
      earned: false,
      progress: 4,
      maxProgress: 15
    },
    {
      id: 'adventure-spirit',
      name: 'Adventure Spirit',
      description: '8 adventure/active experiences',
      icon: <Mountain className="h-6 w-6" />,
      category: 'Experiences & Activities',
      requirement: '8 adventure/active experiences',
      rarity: 'uncommon',
      earned: false,
      progress: 2,
      maxProgress: 8
    },

    // Loyalty & Time
    {
      id: 'seasoned-traveler',
      name: 'Seasoned Traveler',
      description: '2 years of Serai stays',
      icon: <Clock className="h-6 w-6" />,
      category: 'Loyalty & Time',
      requirement: '2 years of Serai stays',
      rarity: 'uncommon',
      earned: false,
      progress: 1,
      maxProgress: 2
    },
    {
      id: 'frequent-voyager',
      name: 'Frequent Voyager',
      description: '10 trips in a year',
      icon: <Calendar className="h-6 w-6" />,
      category: 'Loyalty & Time',
      requirement: '10 trips in a year',
      rarity: 'rare',
      earned: false,
      progress: 4,
      maxProgress: 10
    },
    {
      id: 'weekend-wanderer',
      name: 'Weekend Wanderer',
      description: '5 weekend trips',
      icon: <Calendar className="h-6 w-6" />,
      category: 'Loyalty & Time',
      requirement: '5 weekend trips',
      rarity: 'common',
      earned: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: '365-explorer',
      name: '365 Explorer',
      description: 'Stayed all 4 seasons',
      icon: <Calendar className="h-6 w-6" />,
      category: 'Loyalty & Time',
      requirement: 'Stayed all 4 seasons',
      rarity: 'rare',
      earned: false,
      progress: 2,
      maxProgress: 4
    },
    {
      id: 'silver-voyager',
      name: 'Silver Voyager',
      description: '3 year loyalty',
      icon: <Award className="h-6 w-6" />,
      category: 'Loyalty & Time',
      requirement: '3 years loyalty',
      rarity: 'epic',
      earned: false,
      progress: 0,
      maxProgress: 3
    },
    {
      id: 'golden-voyager',
      name: 'Golden Voyager',
      description: '6 years loyalty',
      icon: <Crown className="h-6 w-6" />,
      category: 'Loyalty & Time',
      requirement: '6 years loyalty',
      rarity: 'legendary',
      earned: false,
      progress: 0,
      maxProgress: 6
    },
    {
      id: 'timeless-voyager',
      name: 'Timeless Voyager',
      description: '10+ years loyalty',
      icon: <Clock className="h-6 w-6" />,
      category: 'Loyalty & Time',
      requirement: '10+ years loyalty',
      rarity: 'legendary',
      earned: false,
      progress: 0,
      maxProgress: 10
    },

    // Behavior & Personality
    {
      id: 'last-minute-maverick',
      name: 'Last-Minute Maverick',
      description: 'Booked <24 hrs in advance',
      icon: <Zap className="h-6 w-6" />,
      category: 'Behavior & Personality',
      requirement: 'Booked <24 hrs in advance',
      rarity: 'uncommon',
      earned: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Booked 3+ months in advance',
      icon: <Calendar className="h-6 w-6" />,
      category: 'Behavior & Personality',
      requirement: 'Booked 3+ months in advance',
      rarity: 'uncommon',
      earned: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 'caravan-leader',
      name: 'Caravan Leader',
      description: 'Booked for 5+ guests',
      icon: <Users className="h-6 w-6" />,
      category: 'Behavior & Personality',
      requirement: 'Booked for 5+ guests',
      rarity: 'rare',
      earned: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'solo-nomad',
      name: 'Solo Nomad',
      description: '5 solo stays',
      icon: <User className="h-6 w-6" />,
      category: 'Behavior & Personality',
      requirement: '5 solo stays',
      rarity: 'uncommon',
      earned: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: 'repeat-guest',
      name: 'Repeat Guest',
      description: 'Stayed at same property twice',
      icon: <Repeat className="h-6 w-6" />,
      category: 'Behavior & Personality',
      requirement: 'Stayed at same property twice',
      rarity: 'common',
      earned: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 'hosts-favorite',
      name: "Host's Favorite",
      description: 'Glowing reviews from 20+ hosts',
      icon: <ThumbsUp className="h-6 w-6" />,
      category: 'Behavior & Personality',
      requirement: 'Glowing reviews from 20+ hosts',
      rarity: 'epic',
      earned: false,
      progress: 8,
      maxProgress: 20
    }
  ];

  const clubs: Club[] = [
    // Traveler Clubs
    {
      id: 'the-caravan',
      name: 'The Caravan',
      description: 'Exclusive community for group travelers and adventure seekers who prefer shared experiences',
      icon: <Users className="h-6 w-6" />,
      memberCount: 1247,
      status: 'member',
      tier: 'gold',
      requirements: 'Complete 5+ group bookings with 4+ people',
      userType: 'traveler'
    },
    {
      id: 'silk-route-circle',
      name: 'The Silk Route Circle',
      description: 'Sophisticated travelers who appreciate luxury, culture, and the art of refined hospitality',
      icon: <Navigation className="h-6 w-6" />,
      memberCount: 234,
      status: 'member',
      tier: 'silver',
      requirements: 'Book 20+ luxury stays with 4.7+ average rating',
      userType: 'traveler'
    },
    {
      id: 'travelers-table',
      name: "Travelers' Table",
      description: 'Warm community where travelers share stories, tips, and build lasting friendships',
      icon: <Coffee className="h-6 w-6" />,
      memberCount: 1876,
      status: 'member',
      tier: 'bronze',
      requirements: 'Complete 10+ stays and write 5+ reviews',
      userType: 'traveler'
    },
    {
      id: 'compass-club',
      name: 'The Compass Club',
      description: 'Mentorship network of experienced travelers who guide newcomers and share wisdom',
      icon: <Compass className="h-6 w-6" />,
      memberCount: 567,
      status: 'eligible',
      tier: 'gold',
      requirements: 'Complete 30+ stays and help 5+ new travelers',
      userType: 'traveler'
    },
    {
      id: 'horizon-club',
      name: 'Horizon Club',
      description: 'Forward-thinking travelers who seek cutting-edge experiences and emerging destinations',
      icon: <Eye className="h-6 w-6" />,
      memberCount: 445,
      status: 'not-eligible',
      tier: 'silver',
      requirements: 'Visit 15+ new destinations in the past year',
      userType: 'traveler'
    },
    {
      id: 'nomad-society',
      name: 'The Nomad Society',
      description: 'Global community of digital nomads and long-term travelers living location-independent lifestyles',
      icon: <Globe className="h-6 w-6" />,
      memberCount: 2103,
      status: 'member',
      tier: 'bronze',
      requirements: 'Complete 25+ stays across 5+ countries',
      userType: 'traveler'
    },
    // Host Clubs
    {
      id: 'the-guild',
      name: 'The Guild',
      description: 'Elite network of verified hosts with exceptional hospitality and property standards',
      icon: <Shield className="h-6 w-6" />,
      memberCount: 892,
      status: 'invited',
      tier: 'platinum',
      requirements: 'Host 50+ stays with 4.8+ average rating',
      userType: 'host'
    },
    {
      id: 'atlas-club',
      name: 'The Atlas Club',
      description: 'Curated collection of hosts offering the most unique and extraordinary stays worldwide',
      icon: <MapPin className="h-6 w-6" />,
      memberCount: 156,
      status: 'not-eligible',
      tier: 'diamond',
      requirements: 'Host unique properties in 10+ countries with 4.9+ rating',
      userType: 'host'
    },
    // Universal Clubs
    {
      id: 'inner-serai',
      name: 'The Inner Serai',
      description: 'Ultra-exclusive circle of SERAI founders, partners, and most distinguished community members',
      icon: <Crown className="h-6 w-6" />,
      memberCount: 43,
      status: 'not-eligible',
      tier: 'diamond',
      requirements: 'Invitation only - SERAI leadership discretion',
      userType: 'both'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Badges', icon: <Award className="h-5 w-5" /> },
    { id: 'Journey Milestones', name: 'Journey Milestones', icon: <MapPin className="h-5 w-5" /> },
    { id: 'Global Exploration', name: 'Global Exploration', icon: <Globe className="h-5 w-5" /> },
    { id: 'Stay Styles', name: 'Stay Styles', icon: <Home className="h-5 w-5" /> },
    { id: 'Experiences & Activities', name: 'Experiences & Activities', icon: <Activity className="h-5 w-5" /> },
    { id: 'Loyalty & Time', name: 'Loyalty & Time', icon: <Clock className="h-5 w-5" /> },
    { id: 'Behavior & Personality', name: 'Behavior & Personality', icon: <User className="h-5 w-5" /> }
  ];

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'uncommon': return 'text-amber-600 bg-amber-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-red-600 bg-red-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600 bg-amber-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'platinum': return 'text-blue-600 bg-blue-100';
      case 'diamond': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'member': return 'text-red-600 bg-red-100';
      case 'invited': return 'text-blue-600 bg-blue-100';
      case 'eligible': return 'text-amber-600 bg-amber-100';
      case 'not-eligible': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'member': return 'Member';
      case 'invited': return 'Invited';
      case 'eligible': return 'Eligible';
      case 'not-eligible': return 'Not Eligible';
      default: return 'Unknown';
    }
  };

  const earnedBadges = badges.filter(badge => badge.earned).length;
  const totalBadges = badges.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top App Bar */}
      <TopAppBar 
        backHref="/tabs"
        logoHref="/tabs"
        showListingButton={true}
        showLanguageButton={true}
        showMenuButton={true}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Clubs & Badges</h1>
          <p className="text-gray-600">
            Join exclusive clubs and unlock achievements as you explore the world with SERAI.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('clubs')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'clubs'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Clubs
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'badges'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Badges
            </button>
          </div>
        </div>

        {/* Clubs Section */}
        {activeTab === 'clubs' && (
          <>
            {/* Clubs Overview */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Club Status</h2>
                
                {/* Traveler Clubs Stats */}
                <div className="bg-amber-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Traveler Clubs</h3>
                        <p className="text-sm text-gray-600">
                          {clubs.filter(club => club.userType === 'traveler' && club.status === 'member').length} memberships • 
                          {clubs.filter(club => club.userType === 'traveler' && club.status === 'invited').length} invitations • 
                          {clubs.filter(club => club.userType === 'traveler' && club.status === 'eligible').length} eligible
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">
                        {clubs.filter(club => club.userType === 'traveler' && club.status === 'member').length}
                      </div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                  </div>
                </div>

                {/* Host Clubs Stats */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Host Clubs</h3>
                        <p className="text-sm text-gray-600">
                          {clubs.filter(club => club.userType === 'host' && club.status === 'member').length} memberships • 
                          {clubs.filter(club => club.userType === 'host' && club.status === 'invited').length} invitations • 
                          {clubs.filter(club => club.userType === 'host' && club.status === 'eligible').length} eligible
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {clubs.filter(club => club.userType === 'host' && club.status === 'member').length}
                      </div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                  </div>
                </div>

                {/* Universal Clubs Stats */}
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Crown className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Universal Clubs</h3>
                        <p className="text-sm text-gray-600">
                          {clubs.filter(club => club.userType === 'both' && club.status === 'member').length} memberships • 
                          {clubs.filter(club => club.userType === 'both' && club.status === 'invited').length} invitations • 
                          {clubs.filter(club => club.userType === 'both' && club.status === 'eligible').length} eligible
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">
                        {clubs.filter(club => club.userType === 'both' && club.status === 'member').length}
                      </div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Traveler Clubs Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Traveler Clubs</h3>
                  <p className="text-gray-600 text-sm">Communities for travelers and guests</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubs.filter(club => club.userType === 'traveler').map((club) => (
                  <div
                    key={club.id}
                    className={`bg-white rounded-xl p-5 transition-all duration-200 hover:shadow-md border ${
                      club.status === 'member' 
                        ? 'border-red-200 shadow-sm' 
                        : club.status === 'invited'
                        ? 'border-blue-200 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Club Icon, Tier, and Status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${
                        club.status === 'member' 
                          ? 'bg-red-100 text-red-600' 
                          : club.status === 'invited'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {club.icon}
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTierColor(club.tier)}`}>
                          {club.tier}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(club.status)}`}>
                          {getStatusText(club.status)}
                        </span>
                      </div>
                    </div>

                    {/* Club Name and Description */}
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">{club.name}</h3>
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed">{club.description}</p>
                    
                    {/* Member Count and Requirements */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{club.memberCount.toLocaleString()} members</span>
                      </div>
                      
                      {/* Requirements */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 font-medium mb-1">Requirements:</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{club.requirements}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Clubs Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Host Clubs</h3>
                  <p className="text-gray-600 text-sm">Elite networks for property hosts</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubs.filter(club => club.userType === 'host').map((club) => (
                  <div
                    key={club.id}
                    className={`bg-white rounded-xl p-5 transition-all duration-200 hover:shadow-md border ${
                      club.status === 'member' 
                        ? 'border-red-200 shadow-sm' 
                        : club.status === 'invited'
                        ? 'border-blue-200 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Club Icon, Tier, and Status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${
                        club.status === 'member' 
                          ? 'bg-red-100 text-red-600' 
                          : club.status === 'invited'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {club.icon}
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTierColor(club.tier)}`}>
                          {club.tier}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(club.status)}`}>
                          {getStatusText(club.status)}
                        </span>
                      </div>
                    </div>

                    {/* Club Name and Description */}
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">{club.name}</h3>
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed">{club.description}</p>
                    
                    {/* Member Count and Requirements */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{club.memberCount.toLocaleString()} members</span>
                      </div>
                      
                      {/* Requirements */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 font-medium mb-1">Requirements:</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{club.requirements}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Universal Clubs Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Crown className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Universal Clubs</h3>
                  <p className="text-gray-600 text-sm">Exclusive communities for all SERAI members</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubs.filter(club => club.userType === 'both').map((club) => (
                  <div
                    key={club.id}
                    className={`bg-white rounded-xl p-5 transition-all duration-200 hover:shadow-md border ${
                      club.status === 'member' 
                        ? 'border-red-200 shadow-sm' 
                        : club.status === 'invited'
                        ? 'border-blue-200 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Club Icon, Tier, and Status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${
                        club.status === 'member' 
                          ? 'bg-red-100 text-red-600' 
                          : club.status === 'invited'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {club.icon}
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTierColor(club.tier)}`}>
                          {club.tier}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(club.status)}`}>
                          {getStatusText(club.status)}
                        </span>
                      </div>
                    </div>

                    {/* Club Name and Description */}
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">{club.name}</h3>
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed">{club.description}</p>
                    
                    {/* Member Count and Requirements */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{club.memberCount.toLocaleString()} members</span>
                      </div>
                      
                      {/* Requirements */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 font-medium mb-1">Requirements:</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{club.requirements}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Badges Section */}
        {activeTab === 'badges' && (
          <>
            {/* Progress Overview */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Your Collection</h2>
                  <p className="text-gray-600 text-sm">{earnedBadges} of {totalBadges} badges earned</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{Math.round((earnedBadges / totalBadges) * 100)}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(earnedBadges / totalBadges) * 100}%` }}
                ></div>
              </div>
            </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              className={`bg-white rounded-xl p-5 transition-all duration-200 hover:shadow-md border ${
                badge.earned 
                  ? 'border-red-200 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Badge Icon and Rarity */}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  badge.earned ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {badge.icon}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRarityColor(badge.rarity)}`}>
                  {badge.rarity}
                </span>
              </div>

              {/* Badge Name and Description */}
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">{badge.name}</h3>
              <p className="text-gray-600 text-xs mb-3 leading-relaxed">{badge.description}</p>
              
              {/* Progress Bar */}
              {badge.progress !== undefined && badge.maxProgress && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress}/{badge.maxProgress}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        badge.earned ? 'bg-red-500' : 'bg-gray-900'
                      }`}
                      style={{ width: `${Math.min((badge.progress / badge.maxProgress) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Earned Status */}
              {badge.earned && (
                <div className="flex items-center text-red-600 text-xs font-medium">
                  <Award className="h-3 w-3 mr-1" />
                  Earned
                </div>
              )}
            </div>
          ))}
        </div>

            {/* Empty State */}
            {filteredBadges.length === 0 && (
              <div className="text-center py-16">
                <Award className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No badges found</h3>
                <p className="text-gray-500 text-sm">Try selecting a different category.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
