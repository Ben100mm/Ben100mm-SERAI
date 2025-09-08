'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, CheckCircle, Building2, Users, TrendingUp, Shield, Zap, Globe, ArrowRight, Star, Award, BarChart3, Smartphone, Wifi, Lock, Headphones, Target, Lightbulb, UserCheck, Brain, Wrench } from 'lucide-react';
import TopAppBar from '@/components/TopAppBar';
import VerticalFlowModal from '@/components/VerticalFlowModal';

export default function PartnerPage() {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Select a city');
  const [isMasterLeaseModalOpen, setIsMasterLeaseModalOpen] = useState(false);
  const [isHybridLeaseModalOpen, setIsHybridLeaseModalOpen] = useState(false);
  const [isRevenueShareModalOpen, setIsRevenueShareModalOpen] = useState(false);
  const [isManagementAgreementModalOpen, setIsManagementAgreementModalOpen] = useState(false);
  const [isFranchiseModelModalOpen, setIsFranchiseModelModalOpen] = useState(false);

  const cities = [
    'New York City',
    'Los Angeles',
    'San Francisco',
    'Santa Monica',
    'San Diego',
    'Boston',
    'Washington D.C.',
    'Seattle',
    'Chicago',
    'Vancouver',
    'Toronto',
    'Montreal',
    'Paris',
    'Barcelona',
    'Berlin',
    'Amsterdam',
    'Madrid',
    'Valencia',
    'Florence',
    'Lisbon',
    'Athens',
    'Vienna',
    'Dublin',
    'Brussels',
    'San Sebastián',
    'Singapore',
    'Hong Kong',
    'Tokyo',
    'Kyoto',
    'Bangkok',
    'Penang',
    'Bali',
    'Sydney',
    'Queenstown',
    'Dubai',
    'Seoul'
  ];

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-serai-red-600" />,
      title: "Expedited Occupancy",
      description: "Full occupancy from the moment your project launches."
    },
    {
      icon: <Building2 className="h-8 w-8 text-serai-red-600" />,
      title: "No Vacancies",
      description: "Eliminate credit loss, turnover, and leasing commissions."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-serai-red-600" />,
      title: "Predictable Returns",
      description: "Choose between fixed rent or revenue share upside."
    },
    {
      icon: <Users className="h-8 w-8 text-serai-red-600" />,
      title: "Operational Ease",
      description: "Serai manages every aspect of pricing, bookings, and guest care."
    },
    {
      icon: <Shield className="h-8 w-8 text-serai-red-600" />,
      title: "Risk Protection",
      description: "Comprehensive insurance and regulatory compliance handled by Serai."
    }
  ];

  const partnerTypes = [
    "Institutional owners",
    "Hotel owners & operators", 
    "Private equity funds",
    "REITs & property companies",
    "Boutique & family offices",
    "Entrepreneurial developers"
  ];

  const partnershipModels = [
    {
      title: "Master Lease",
      description: "Serai rents the property and takes full responsibility. Owner receives: Fixed monthly rent (guaranteed). Owner risk: None. Serai risk: Full (Serai pays rent even if the property is empty). Best for: Owners who want steady income with no involvement."
    },
    {
      title: "Hybrid Lease", 
      description: "Owner gets a smaller base rent plus a share of profits. Owner receives: Base rent + percentage of profits. Owner risk: Low. Serai risk: Moderate (Serai covers operations, but owner shares some performance risk). Best for: Owners who want some upside without full risk."
    },
    {
      title: "Revenue Share",
      description: "Serai runs everything and splits profits with the owner. Owner receives: A percentage of net profits. Owner risk: Shared (earnings depend on how well the property performs). Serai risk: Shared. Best for: Owners who want higher potential income and are okay with variability."
    },
    {
      title: "Management Agreement",
      description: "Owner hires Serai to operate the property for a fixed fee. Owner receives: Full revenue minus expenses and Serai's management fee. Owner risk: Full (covers all costs, earns more if the property performs well). Serai risk: None (gets paid regardless of performance). Best for: Owners who want to stay in control but need expert help."
    },
    {
      title: "Franchise Model",
      description: "Owner runs the property under the SERAI brand and pays a royalty. Owner receives: Full control over revenue after paying fees. Owner risk: Full. Serai risk: None. Best for: Experienced operators who want branding, tools, and support."
    }
  ];

  const preOpeningServices = [
    {
      icon: <BarChart3 className="h-6 w-6 text-serai-red-600" />,
      title: "Feasibility Studies",
      description: "Market demand analysis, occupancy forecasts, and RevPAR modeling."
    },
    {
      icon: <Building2 className="h-6 w-6 text-serai-red-600" />,
      title: "Optimal Unit Mix Design", 
      description: "Room sizes, layouts, and amenities aligned with highest ROI."
    },
    {
      icon: <Target className="h-6 w-6 text-serai-red-600" />,
      title: "CapEx Planning",
      description: "Guidance on FF&E, technology infrastructure, and sustainability investments."
    },
    {
      icon: <Award className="h-6 w-6 text-serai-red-600" />,
      title: "Cost Benchmarking",
      description: "Access to Serai's data on comparable projects and best practices."
    }
  ];

  const techFeatures = [
    {
      icon: <BarChart3 className="h-6 w-6 text-serai-red-600" />,
      title: "Real-time dashboards",
      description: "Earnings, bookings, occupancy, RevPAR"
    },
    {
      icon: <Globe className="h-6 w-6 text-serai-red-600" />,
      title: "Channel Manager",
      description: "Serai + OTAs + 10,000 affiliates"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-serai-red-600" />,
      title: "Booking & Invoice Modules",
      description: "Complete booking management"
    },
    {
      icon: <Users className="h-6 w-6 text-serai-red-600" />,
      title: "Housekeeping & Maintenance",
      description: "Operational management tools"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-serai-red-600" />,
      title: "Advanced Analytics",
      description: "Property scorecards & insights"
    },
    {
      icon: <Headphones className="h-6 w-6 text-serai-red-600" />,
      title: "24/7 Support",
      description: "Live chat support on all devices"
    }
  ];

  const guestTech = [
    {
      icon: <Lock className="h-6 w-6 text-serai-red-600" />,
      title: "Keyless entry & in-app check-in"
    },
    {
      icon: <Wifi className="h-6 w-6 text-serai-red-600" />,
      title: "Smart noise & IoT monitoring"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-serai-red-600" />,
      title: "Virtual concierge"
    },
    {
      icon: <UserCheck className="h-6 w-6 text-serai-red-600" />,
      title: "AI-Powered Seamless Check-in/Check-out"
    },
    {
      icon: <Brain className="h-6 w-6 text-serai-red-600" />,
      title: "AI-Powered Personalized Recommendations"
    },
    {
      icon: <Wrench className="h-6 w-6 text-serai-red-600" />,
      title: "AI-Powered Instant Problem Resolution"
    }
  ];

  const processSteps = [
    {
      number: "1",
      title: "Enter Your Details And Submit",
      description: "We'll assess the right solution for your property."
    },
    {
      number: "2", 
      title: "Sign With Serai",
      description: "Choose your lease or revenue share model."
    },
    {
      number: "3",
      title: "Onboard Our Tech",
      description: "Go live with Serai's operations & Property Management Suite."
    }
  ];

  // Master Lease Modal Configuration
  const masterLeaseSteps = [
    {
      id: '1',
      label: 'How it works',
      description: 'Serai rents the property and takes full responsibility.'
    },
    {
      id: '2',
      label: 'Owner receives',
      description: 'Fixed monthly rent (guaranteed)'
    },
    {
      id: '3',
      label: 'Owner risk',
      description: 'None'
    },
    {
      id: '4',
      label: 'Serai risk',
      description: 'Full (Serai pays rent even if the property is empty)'
    },
    {
      id: '5',
      label: 'Best for',
      description: 'Owners who want steady income with no involvement'
    }
  ];

  // Hybrid Lease Modal Configuration
  const hybridLeaseSteps = [
    {
      id: '1',
      label: 'How it works',
      description: 'Owner gets a smaller base rent plus a share of profits.'
    },
    {
      id: '2',
      label: 'Owner receives',
      description: 'Base rent + percentage of profits'
    },
    {
      id: '3',
      label: 'Owner risk',
      description: 'Low'
    },
    {
      id: '4',
      label: 'Serai risk',
      description: 'Moderate (Serai covers operations, but owner shares some performance risk)'
    },
    {
      id: '5',
      label: 'Best for',
      description: 'Owners who want some upside without full risk'
    }
  ];

  // Revenue Share Modal Configuration
  const revenueShareSteps = [
    {
      id: '1',
      label: 'How it works',
      description: 'Serai runs everything and splits profits with the owner.'
    },
    {
      id: '2',
      label: 'Owner receives',
      description: 'A percentage of net profits'
    },
    {
      id: '3',
      label: 'Owner risk',
      description: 'Shared (earnings depend on how well the property performs)'
    },
    {
      id: '4',
      label: 'Serai risk',
      description: 'Shared'
    },
    {
      id: '5',
      label: 'Best for',
      description: 'Owners who want higher potential income and are okay with variability'
    }
  ];

  // Management Agreement Modal Configuration
  const managementAgreementSteps = [
    {
      id: '1',
      label: 'How it works',
      description: 'Owner hires Serai to operate the property for a fixed fee.'
    },
    {
      id: '2',
      label: 'Owner receives',
      description: 'Full revenue minus expenses and Serai\'s management fee'
    },
    {
      id: '3',
      label: 'Owner risk',
      description: 'Full (covers all costs, earns more if the property performs well)'
    },
    {
      id: '4',
      label: 'Serai risk',
      description: 'None (gets paid regardless of performance)'
    },
    {
      id: '5',
      label: 'Best for',
      description: 'Owners who want to stay in control but need expert help'
    }
  ];

  // Franchise Model Modal Configuration
  const franchiseModelSteps = [
    {
      id: '1',
      label: 'How it works',
      description: 'Owner runs the property under the SERAI brand and pays a royalty.'
    },
    {
      id: '2',
      label: 'Owner receives',
      description: 'Full control over revenue after paying fees'
    },
    {
      id: '3',
      label: 'Owner risk',
      description: 'Full'
    },
    {
      id: '4',
      label: 'Serai risk',
      description: 'None'
    },
    {
      id: '5',
      label: 'Best for',
      description: 'Experienced operators who want branding, tools, and support'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top App Bar */}
      <TopAppBar 
        backHref="/"
        logoHref="/"
        showListingButton={true}
        showLanguageButton={true}
        showMenuButton={true}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Partner With Us
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your trusted partner for occupancy, stability, and growth.
            </p>
            
            {/* City Selection */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <button
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span style={{ color: '#000000', fontWeight: '600' }}>{selectedCity}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </button>
                
                {isCityDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <div className="p-2 max-h-40 overflow-y-auto">
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => {
                            setSelectedCity(city);
                            setIsCityDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                          style={{ color: '#000000', fontWeight: '500' }}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Serai signs multi-year fixed leases, hybrid leases, or revenue share agreements as the anchor or sole tenant in your property or development project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Increase NOI</h3>
              <p className="text-gray-600">with guaranteed income and optimized operations.</p>
            </div>
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accelerate lease-ups</h3>
              <p className="text-gray-600">with 100% occupancy on day one.</p>
            </div>
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">De-risk cash flow</h3>
              <p className="text-gray-600">by eliminating vacancies, tenant churn, and commission costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Benefits at a Glance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Your Benefits at a Glance</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Partner With */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Who We Partner With</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerTypes.map((type, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-serai-red-600 flex-shrink-0" />
                <span className="text-gray-700">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Partnership Models</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipModels.map((model, index) => {
              const getModalHandler = (title: string) => {
                switch (title) {
                  case 'Master Lease':
                    return () => setIsMasterLeaseModalOpen(true);
                  case 'Hybrid Lease':
                    return () => setIsHybridLeaseModalOpen(true);
                  case 'Revenue Share':
                    return () => setIsRevenueShareModalOpen(true);
                  case 'Management Agreement':
                    return () => setIsManagementAgreementModalOpen(true);
                  case 'Franchise Model':
                    return () => setIsFranchiseModelModalOpen(true);
                  default:
                    return undefined;
                }
              };

              return (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={getModalHandler(model.title)}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{model.title}</h3>
                  <p className="text-gray-600">{model.description}</p>
                  <div className="mt-4 text-sm text-serai-red-600 font-medium">
                    Click to learn more →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CapEx & Development Advisory */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">CapEx & Development Advisory</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Serai is more than a tenant — we're a strategic development partner. We help you design, plan, and optimize your asset from the ground up to maximize yield and reduce costs.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Pre-Opening Services</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {preOpeningServices.map((service, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{service.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">During Development</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Design Consultation</li>
                <li>• Tech Infrastructure</li>
                <li>• Brand Standards</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Post-Completion</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Zero Lease-Up Delay</li>
                <li>• Turnkey Operations</li>
                <li>• Ongoing ROI Monitoring</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Results</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 18-25% NOI uplift</li>
                <li>• 27% RevPAR increase</li>
                <li>• 21% NOI improvement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology for Owners */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Technology for Owners</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Serai's Property Management Suite is a plug-and-play platform designed to increase revenue and reduce costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {techFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Guest Tech</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {guestTech.map((tech, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">{tech.icon}</div>
                  <span className="text-gray-700">{tech.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guest Experience Advantage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Guest Experience Advantage</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Local Support</h3>
              <p className="text-gray-600 text-sm">Rapid-response staff with comprehensive training</p>
            </div>
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dedicated Consultant</h3>
              <p className="text-gray-600 text-sm">Personal partner consultant for each property</p>
            </div>
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Monitoring</h3>
              <p className="text-gray-600 text-sm">Daily monitoring and improvement of scores</p>
            </div>
            <div className="text-center">
              <div className="bg-serai-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-serai-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk & Compliance</h3>
              <p className="text-gray-600 text-sm">Insurance, licensing, and legal handled</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Partner */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">How to Partner With Us</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Partnering with Serai is a simple 3-step process:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-serai-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Serai is building the world's largest tech-powered hospitality network, uniting travelers, owners, and local communities across North America, Europe, Asia and Africa.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              By partnering with us, your property becomes part of a global brand and ecosystem designed to drive performance today and long-term value tomorrow.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Work With Us</h3>
            <p className="text-lg text-gray-600 mb-8">
              We're always looking for new partners ready to unlock the next chapter of hospitality.
            </p>
            <button className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">News</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Partner Portal</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Serai Hotels. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Master Lease Modal */}
      <VerticalFlowModal
        open={isMasterLeaseModalOpen}
        onClose={() => setIsMasterLeaseModalOpen(false)}
        title="Master Lease"
        subtitle="Fixed rent. Zero risk. Guaranteed income."
        steps={masterLeaseSteps}
        cta={{
          primary: 'Request a Master Lease Proposal',
          secondary: 'Download Sample Lease'
        }}
        showCompareButton={true}
      />

      {/* Hybrid Lease Modal */}
      <VerticalFlowModal
        open={isHybridLeaseModalOpen}
        onClose={() => setIsHybridLeaseModalOpen(false)}
        title="Hybrid Lease"
        subtitle="Base rent + shared upside."
        steps={hybridLeaseSteps}
        cta={{
          primary: 'Model My Hybrid Terms',
          secondary: 'See Sample Report'
        }}
        showCompareButton={true}
      />

      {/* Revenue Share Modal */}
      <VerticalFlowModal
        open={isRevenueShareModalOpen}
        onClose={() => setIsRevenueShareModalOpen(false)}
        title="Revenue Share"
        subtitle="Aligned interests. Flexible revenue splits."
        steps={revenueShareSteps}
        cta={{
          primary: 'Request Revenue Share Proposal',
          secondary: 'Compare With Other Models'
        }}
        showCompareButton={true}
      />

      {/* Management Agreement Modal */}
      <VerticalFlowModal
        open={isManagementAgreementModalOpen}
        onClose={() => setIsManagementAgreementModalOpen(false)}
        title="Management Agreement"
        subtitle="You own, we operate."
        steps={managementAgreementSteps}
        cta={{
          primary: 'See Management Proposal',
          secondary: 'View SOP & Playbooks'
        }}
        showCompareButton={true}
      />

      {/* Franchise Model Modal */}
      <VerticalFlowModal
        open={isFranchiseModelModalOpen}
        onClose={() => setIsFranchiseModelModalOpen(false)}
        title="Franchise Model"
        subtitle="Operate under the Serai brand & tech suite."
        steps={franchiseModelSteps}
        cta={{
          primary: 'Apply for a Franchise',
          secondary: 'Download Brand Standards'
        }}
        showCompareButton={true}
      />
    </div>
  );
}
