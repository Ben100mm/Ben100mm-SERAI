'use client';

import { useState } from 'react';
import { Search, ChevronRight, Phone, Mail, MessageCircle, HelpCircle, CreditCard, User, Home, Star, Shield, Globe, Clock, Building2, Sparkles, Heart, TrendingUp, FileText, DollarSign } from 'lucide-react';
import TopAppBar from '@/components/TopAppBar';
import Link from 'next/link';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Help categories and articles
  const helpCategories = [
    {
      id: 'booking',
      title: 'Booking & Reservations',
      icon: <Home className="h-6 w-6" />,
      articles: [
        {
          title: 'How do I make a reservation?',
          description: 'Step-by-step guide to booking your stay',
          popular: true
        },
        {
          title: 'Can I modify or cancel my booking?',
          description: 'Learn about our flexible booking policies',
          popular: true
        },
        {
          title: 'What payment methods do you accept?',
          description: 'Credit cards, digital wallets, and more',
          popular: false
        },
        {
          title: 'Do you offer group bookings?',
          description: 'Special rates and arrangements for groups',
          popular: false
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Profile',
      icon: <User className="h-6 w-6" />,
      articles: [
        {
          title: 'How do I create an account?',
          description: 'Get started with your SERAI account',
          popular: true
        },
        {
          title: 'How do I update my profile?',
          description: 'Manage your personal information',
          popular: false
        },
        {
          title: 'How do I reset my password?',
          description: 'Forgot your password? We can help',
          popular: false
        },
        {
          title: 'How do I delete my account?',
          description: 'Account deletion and data privacy',
          popular: false
        }
      ]
    },
    {
      id: 'stay',
      title: 'During Your Stay',
      icon: <Star className="h-6 w-6" />,
      articles: [
        {
          title: 'What amenities are included?',
          description: 'Discover what\'s available at your SERAI',
          popular: true
        },
        {
          title: 'How do I request early check-in?',
          description: 'Early arrival options and policies',
          popular: false
        },
        {
          title: 'What are your house rules?',
          description: 'Important guidelines for your stay',
          popular: false
        },
        {
          title: 'How do I report an issue?',
          description: 'Get help during your stay',
          popular: false
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      icon: <CreditCard className="h-6 w-6" />,
      articles: [
        {
          title: 'When will I be charged?',
          description: 'Understanding our payment schedule',
          popular: true
        },
        {
          title: 'How do I get a receipt?',
          description: 'Access your booking receipts',
          popular: false
        },
        {
          title: 'What is your refund policy?',
          description: 'Cancellation and refund guidelines',
          popular: false
        },
        {
          title: 'Do you offer payment plans?',
          description: 'Flexible payment options available',
          popular: false
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      icon: <Shield className="h-6 w-6" />,
      articles: [
        {
          title: 'How do you verify properties?',
          description: 'Our quality assurance process',
          popular: true
        },
        {
          title: 'What safety measures are in place?',
          description: 'Your security and safety is our priority',
          popular: false
        },
        {
          title: 'How do I report a safety concern?',
          description: 'Report issues immediately',
          popular: false
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: <Globe className="h-6 w-6" />,
      articles: [
        {
          title: 'The app is not working properly',
          description: 'Troubleshooting common app issues',
          popular: true
        },
        {
          title: 'I can\'t access my booking',
          description: 'Resolve booking access problems',
          popular: false
        },
        {
          title: 'How do I update the app?',
          description: 'Keep your app up to date',
          popular: false
        }
      ]
    },
    {
      id: 'property-owners',
      title: 'Property Owners',
      icon: <Building2 className="h-6 w-6" />,
      articles: [
        {
          title: 'How do I list my property on SERAI?',
          description: 'Step-by-step guide to becoming a property partner',
          popular: true
        },
        {
          title: 'What are the requirements for property listing?',
          description: 'Property standards and documentation needed',
          popular: true
        },
        {
          title: 'How do I manage my property calendar?',
          description: 'Update availability and pricing',
          popular: false
        },
        {
          title: 'How do I handle guest communications?',
          description: 'Best practices for guest interactions',
          popular: false
        },
        {
          title: 'What are the commission rates?',
          description: 'Understanding SERAI\'s fee structure',
          popular: false
        },
        {
          title: 'How do I get paid?',
          description: 'Payment schedules and payout methods',
          popular: false
        }
      ]
    },
    {
      id: 'experience-providers',
      title: 'Experience Providers',
      icon: <Sparkles className="h-6 w-6" />,
      articles: [
        {
          title: 'How do I create an experience listing?',
          description: 'Guide to listing your unique experiences',
          popular: true
        },
        {
          title: 'What types of experiences can I offer?',
          description: 'Creative ideas and experience categories',
          popular: true
        },
        {
          title: 'How do I set pricing for my experiences?',
          description: 'Pricing strategies and market analysis',
          popular: false
        },
        {
          title: 'How do I manage bookings and capacity?',
          description: 'Handling reservations and group sizes',
          popular: false
        },
        {
          title: 'What safety requirements do I need?',
          description: 'Insurance and safety guidelines',
          popular: false
        },
        {
          title: 'How do I promote my experiences?',
          description: 'Marketing tools and visibility tips',
          popular: false
        }
      ]
    },
    {
      id: 'service-providers',
      title: 'Service Providers',
      icon: <Heart className="h-6 w-6" />,
      articles: [
        {
          title: 'How do I register as a service provider?',
          description: 'Join our network of trusted service providers',
          popular: true
        },
        {
          title: 'What services can I offer?',
          description: 'Available service categories and requirements',
          popular: true
        },
        {
          title: 'How do I set my service rates?',
          description: 'Competitive pricing and rate management',
          popular: false
        },
        {
          title: 'How do I manage service requests?',
          description: 'Responding to and fulfilling service bookings',
          popular: false
        },
        {
          title: 'What are the quality standards?',
          description: 'Maintaining high service quality',
          popular: false
        },
        {
          title: 'How do I track my earnings?',
          description: 'Earnings dashboard and payment tracking',
          popular: false
        }
      ]
    },
    {
      id: 'partner-resources',
      title: 'Partner Resources',
      icon: <TrendingUp className="h-6 w-6" />,
      articles: [
        {
          title: 'Partner dashboard overview',
          description: 'Navigate your partner control panel',
          popular: true
        },
        {
          title: 'Marketing and promotion tools',
          description: 'Boost your visibility and bookings',
          popular: true
        },
        {
          title: 'Analytics and reporting',
          description: 'Track your performance and insights',
          popular: false
        },
        {
          title: 'Partner support and training',
          description: 'Resources to help you succeed',
          popular: false
        },
        {
          title: 'Terms and policies',
          description: 'Partner agreements and guidelines',
          popular: false
        },
        {
          title: 'Tax and financial reporting',
          description: 'Tax documents and financial statements',
          popular: false
        }
      ]
    }
  ];

  // Filter articles based on search query and category
  const filteredArticles = helpCategories
    .filter(category => selectedCategory === 'all' || category.id === selectedCategory)
    .flatMap(category => 
      category.articles
        .filter(article => 
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(article => ({ ...article, category: category.title }))
    );

  const popularArticles = helpCategories
    .flatMap(category => 
      category.articles
        .filter(article => article.popular)
        .map(article => ({ ...article, category: category.title }))
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Top App Bar */}
      <TopAppBar 
        backHref="/tabs"
        logoHref="/tabs"
        showListingButton={false}
        showLanguageButton={true}
        showMenuButton={true}
      />

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                How can we help you?
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Find answers to common questions or get in touch with our support team
              </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles, policies, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by category</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-gray-100 text-gray-900 border border-gray-300'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Topics
                </button>
                {helpCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-gray-100 text-gray-900 border border-gray-300'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category.icon}
                    <span>{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {searchQuery === '' && selectedCategory === 'all' ? (
              <>
                {/* Popular Articles */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {popularArticles.map((article, index) => (
                      <div key={index} className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                            <span className="inline-block px-2 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full">
                              {article.category}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Categories */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse all topics</h2>
                  <div className="space-y-6">
                    {helpCategories.map((category) => (
                      <div key={category.id} className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-serai-red-50 rounded-lg">
                            <div className="text-serai-red-600">
                              {category.icon}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {category.articles.map((article, index) => (
                            <button
                              key={index}
                              className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-serai-red-600 transition-colors">
                                    {article.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-1">{article.description}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Search Results */
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {searchQuery ? `Search results for "${searchQuery}"` : `${helpCategories.find(c => c.id === selectedCategory)?.title}`}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                
                {filteredArticles.length > 0 ? (
                  <div className="space-y-4">
                    {filteredArticles.map((article, index) => (
                      <div key={index} className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                            <span className="inline-block px-2 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full">
                              {article.category}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600 mb-6">
                      Try searching with different keywords or browse our categories
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Browse All Topics
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Partner Resources Section */}
        <div className="mt-12 bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Partner Resources</h2>
            <p className="text-gray-600 mb-8">
              Specialized support and resources for our property owners, experience providers, and service partners
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Property Owner Resources */}
              <div className="bg-serai-cream-50 rounded-lg p-6 shadow-sm border border-serai-cream-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-serai-red-50 rounded-full mb-4">
                    <Building2 className="h-6 w-6 text-serai-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Owners</h3>
                  <p className="text-gray-600 text-sm mb-4">Maximize your property's potential</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>• Property listing optimization</p>
                    <p>• Revenue management tools</p>
                    <p>• Guest communication guides</p>
                  </div>
                </div>
              </div>

              {/* Experience Provider Resources */}
              <div className="bg-serai-cream-50 rounded-lg p-6 shadow-sm border border-serai-cream-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-serai-red-50 rounded-full mb-4">
                    <Sparkles className="h-6 w-6 text-serai-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience Providers</h3>
                  <p className="text-gray-600 text-sm mb-4">Create unforgettable experiences</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>• Experience design tips</p>
                    <p>• Marketing best practices</p>
                    <p>• Safety and compliance</p>
                  </div>
                </div>
              </div>

              {/* Service Provider Resources */}
              <div className="bg-serai-cream-50 rounded-lg p-6 shadow-sm border border-serai-cream-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-serai-red-50 rounded-full mb-4">
                    <Heart className="h-6 w-6 text-serai-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Providers</h3>
                  <p className="text-gray-600 text-sm mb-4">Deliver exceptional services</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>• Service quality standards</p>
                    <p>• Booking management tools</p>
                    <p>• Customer satisfaction tips</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/partner"
                className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Become a Partner
              </Link>
              <button className="bg-white border border-serai-red-300 text-serai-red-700 hover:bg-serai-red-50 px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
                Partner Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-8 bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to help you 24/7
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Live Chat */}
              <div className="p-6 border border-gray-200 rounded-lg hover:border-serai-red-300 hover:shadow-md transition-all duration-200 flex flex-col">
                <div className="flex flex-col items-center text-center flex-grow">
                  <div className="p-3 bg-serai-red-50 rounded-full mb-4">
                    <MessageCircle className="h-6 w-6 text-serai-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
                </div>
                <button className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 mt-auto">
                  Start Chat
                </button>
              </div>

              {/* Phone Support */}
              <div className="p-6 border border-gray-200 rounded-lg hover:border-serai-red-300 hover:shadow-md transition-all duration-200 flex flex-col">
                <div className="flex flex-col items-center text-center flex-grow">
                  <div className="p-3 bg-serai-red-50 rounded-full mb-4">
                    <Phone className="h-6 w-6 text-serai-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                  <p className="text-gray-600 text-sm mb-4">Call us at +1 (555) 123-4567</p>
                  <p className="text-gray-500 text-xs mb-4">Available 24/7</p>
                </div>
                <button className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 mt-auto">
                  Call Now
                </button>
              </div>

              {/* Email Support */}
              <div className="p-6 border border-gray-200 rounded-lg hover:border-serai-red-300 hover:shadow-md transition-all duration-200 flex flex-col">
                <div className="flex flex-col items-center text-center flex-grow">
                  <div className="p-3 bg-serai-red-50 rounded-full mb-4">
                    <Mail className="h-6 w-6 text-serai-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
                  <p className="text-gray-500 text-xs mb-4">Response within 2 hours</p>
                </div>
                <button className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 mt-auto">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
