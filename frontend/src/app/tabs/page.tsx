'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, Suspense } from 'react';
import { Heart, Star, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import TopAppBar from '@/components/TopAppBar';
import { useSearchParams } from 'next/navigation';

function PropertiesPageContent() {
  const searchParams = useSearchParams();
  const [activeNavTab, setActiveNavTab] = useState('silk-route');

  // Initialize state with URL parameters if available
  const [isWhereDropdownOpen, setIsWhereDropdownOpen] = useState(false);
  const [whereValue, setWhereValue] = useState(searchParams.get('location') || '');
  const [isCheckInDropdownOpen, setIsCheckInDropdownOpen] = useState(false);
  const [isCheckOutDropdownOpen, setIsCheckOutDropdownOpen] = useState(false);
  const [checkInValue, setCheckInValue] = useState(searchParams.get('checkIn') || '');
  const [checkOutValue, setCheckOutValue] = useState(searchParams.get('checkOut') || '');
  const [selectedDates, setSelectedDates] = useState<{checkIn: Date | null, checkOut: Date | null}>({
    checkIn: null,
    checkOut: null
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [flexibleOption, setFlexibleOption] = useState('Exact dates');
  const [activeCalendarTab, setActiveCalendarTab] = useState('dates');
  const [selectedMonths, setSelectedMonths] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('Month');
  const [selectedFlexibleMonth, setSelectedFlexibleMonth] = useState(new Date());
  const [guestsValue, setGuestsValue] = useState('');
  const whereDropdownRef = useRef<HTMLDivElement>(null);
  const checkInDropdownRef = useRef<HTMLDivElement>(null);
  const checkOutDropdownRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const monthScrollRef = useRef<HTMLDivElement>(null);

  // Update state when URL parameters change
  useEffect(() => {
    const location = searchParams.get('location');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    
    if (location) setWhereValue(location);
    if (checkIn) setCheckInValue(checkIn);
    if (checkOut) setCheckOutValue(checkOut);
    
    // Combine adults and children for guests display
    if (adults || children) {
      const guestsText = `${adults || '0 adults'}, ${children || '0 children'}`;
      setGuestsValue(guestsText);
    }
  }, [searchParams]);

  // Dynamic search bar based on active tab
  const renderSearchBar = () => {
    switch (activeNavTab) {
      case 'silk-route':
  return (
          <div className="flex items-center bg-white border border-serai-neutral-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            {/* Itinerary Field */}
            <div className="flex-1 px-6 py-3 border-r border-serai-neutral-300 relative">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Itinerary</label>
              <input
                type="text"
                placeholder="Plan your journey"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
        </div>
        
            {/* Duration Field */}
            <div className="flex-1 px-6 py-3 border-r border-serai-neutral-300 relative">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Duration</label>
              <input
                type="text"
                placeholder="7-14 days"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
          />
        </div>
        
            {/* Interests, Experiences & Essentials Field */}
            <div className="flex-1 px-6 py-3 border-r border-serai-neutral-300 relative">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Interests, Experiences & Essentials</label>
              <input
                type="text"
                placeholder="Culture, nature, food"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
              </div>
            
            {/* Search Button */}
            <div className="px-6 py-3">
              <button className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
                      </div>
        );
      
      case 'serais':
        return (
          <div className="flex items-center bg-white border border-serai-neutral-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            {/* Where Field */}
            <div className="flex-1 px-6 py-3 border-r border-gray-300 relative" ref={whereDropdownRef}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Where</label>
              <input
                type="text"
                placeholder="Search destinations"
                value={whereValue}
                onChange={(e) => setWhereValue(e.target.value)}
                onFocus={() => setIsWhereDropdownOpen(true)}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
                {isWhereDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-serai-cream-50 border border-serai-cream-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-500 mb-2">Popular destinations</div>
                    {['Montreal', 'Toronto', 'Vancouver', 'Quebec City', 'Ottawa'].map((city) => (
                          <button
                        key={city}
                            onClick={() => {
                          setWhereValue(city);
                              setIsWhereDropdownOpen(false);
                            }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                      >
                        {city}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
            </div>
            
            {/* Check In Field */}
            <div className="flex-1 px-6 py-3 border-r border-gray-300 relative" ref={checkInDropdownRef}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Check in</label>
              <input
                type="text"
                placeholder="Add date"
                value={checkInValue}
                onChange={(e) => setCheckInValue(e.target.value)}
                onFocus={() => setIsCheckInDropdownOpen(true)}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
            </div>
            
            {/* Check Out Field */}
            <div className="flex-1 px-6 py-3 border-r border-gray-300 relative" ref={checkOutDropdownRef}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Check out</label>
              <input
                type="text"
                placeholder="Add date"
                value={checkOutValue}
                onChange={(e) => setCheckOutValue(e.target.value)}
                onFocus={() => setIsCheckOutDropdownOpen(true)}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
                      </div>

            {/* Who Field */}
            <div className="flex-1 px-6 py-3">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Who</label>
              <input
                type="text"
                placeholder="Add guests"
                value={guestsValue}
                onChange={(e) => setGuestsValue(e.target.value)}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
            </div>
            
            {/* Search Button */}
            <div className="px-6 py-3">
              <button className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                              </button>
                            </div>
                                </div>
        );
      
      case 'bazaar':
                                return (
          <div className="flex items-center bg-white border border-serai-neutral-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            {/* Experience Field */}
            <div className="flex-1 px-6 py-3 border-r border-serai-neutral-300 relative">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Experience</label>
              <input
                type="text"
                placeholder="Search experience"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
                            </div>
            
            {/* Location Field */}
            <div className="flex-1 px-6 py-3 border-r border-serai-neutral-300 relative">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Location</label>
              <input
                type="text"
                placeholder="Search destinations"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
                                </div>
                                
            {/* Date Field */}
            <div className="flex-1 px-6 py-3 border-r border-serai-neutral-300 relative">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Date</label>
              <input
                type="text"
                placeholder="Add date"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
            </div>
            
            {/* Group Size Field */}
            <div className="flex-1 px-6 py-3">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Group</label>
              <input
                type="text"
                placeholder="Add guests"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
                            </div>
                            
            {/* Search Button */}
            <div className="px-6 py-3">
              <button className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                                  </button>
                              </div>
                            </div>
        );
      
      case 'essentials':
        return (
          <div className="flex items-center bg-white border border-serai-neutral-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            {/* Service Field */}
            <div className="flex-1 px-6 py-3 border-r border-serai-neutral-300 relative">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Service</label>
              <input
                type="text"
                placeholder="Search essentials"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
                                </div>
                                
            {/* Location Field */}
            <div className="flex-1 px-6 py-3 border-r border-serai-neutral-300 relative">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Location</label>
              <input
                type="text"
                placeholder="Search destinations"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
            </div>
            
            {/* Date Field */}
            <div className="flex-1 px-6 py-3 border-r border-serai-neutral-300 relative">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Date</label>
              <input
                type="text"
                placeholder="Add date"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
                />
            </div>
            
            {/* Time Field */}
            <div className="flex-1 px-6 py-3">
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Time</label>
              <input
                type="text"
                placeholder="Add time"
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
                      </div>

            {/* Search Button */}
            <div className="px-6 py-3">
              <button className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                              </button>
                            </div>
                                </div>
        );
      
      default:
        return null;
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (whereDropdownRef.current && !whereDropdownRef.current.contains(event.target as Node)) {
        setIsWhereDropdownOpen(false);
      }
      if (checkInDropdownRef.current && !checkInDropdownRef.current.contains(event.target as Node)) {
        setIsCheckInDropdownOpen(false);
      }
      if (checkOutDropdownRef.current && !checkOutDropdownRef.current.contains(event.target as Node)) {
        setIsCheckOutDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sample data for different platforms
  const silkRoutesData = [
    {
      id: 1,
      title: "Pacific Coast Highway",
      description: "Drive along California's stunning coastline from San Francisco to Los Angeles with stops in Big Sur and Monterey.",
      duration: "7 days",
      price: "From $1,200",
      image: "/images/serai-images/Pacific Coast Highway.jpg",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      title: "Rocky Mountain Adventure",
      description: "Explore the majestic Rocky Mountains with stops in Denver, Aspen, and Banff National Park.",
      duration: "14 days",
      price: "From $2,500",
      image: "/images/serai-images/Rocky Mountain Highway.jpg",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      title: "New England Fall Foliage",
      description: "Experience the breathtaking autumn colors across Vermont, New Hampshire, and Maine.",
      duration: "10 days",
      price: "From $1,800",
      image: "/images/serai-images/New England Fall Foliage.jpg",
      rating: 4.7,
      reviews: 156
    }
  ];

  const seraisData = [
    {
      id: 1,
      title: "Historic Downtown Inn",
      location: "Montreal, Canada",
      price: "$180/night",
      image: "/images/serai-images/Historic Downtown Inn.jpg",
      rating: 4.6,
      reviews: 89,
      type: "Boutique Hotel"
    },
    {
      id: 2,
      title: "Mountain View Lodge",
      location: "Banff, Canada",
      price: "$220/night",
      image: "/images/serai-images/Mountain View Lodge.jpg",
      rating: 4.8,
      reviews: 124,
      type: "Eco Lodge"
    },
    {
      id: 3,
      title: "Desert Oasis Resort",
      location: "Phoenix, USA",
      price: "$150/night",
      image: "/images/serai-images/Desert Oasis Resort.jpg",
      rating: 4.5,
      reviews: 67,
      type: "Luxury Glamping"
    }
  ];

  const bazaarData = [
    {
      id: 1,
      title: "Artisan Pottery Workshop",
      location: "Montreal, Canada",
      price: "$45/person",
      image: "/images/serai-images/Artisan Pottery Workshop.jpg",
      rating: 4.7,
      reviews: 45,
      duration: "3 hours"
    },
    {
      id: 2,
      title: "Farm-to-Table Cooking Class",
      location: "Toronto, Canada",
      price: "$75/person",
      image: "/images/serai-images/Farm-to-Table Cooking Class.jpg",
      rating: 4.9,
      reviews: 78,
      duration: "4 hours"
    },
    {
      id: 3,
      title: "Urban Photography Walk",
      location: "Vancouver, Canada",
      price: "$35/person",
      image: "/images/serai-images/Urban Photography Walk.jpg",
      rating: 4.6,
      reviews: 92,
      duration: "2 hours"
    }
  ];

  const essentialsData = [
    {
      id: 1,
      title: "Spa & Wellness Package",
      location: "Montreal, Canada",
      price: "$120/session",
      image: "/images/serai-images/Spa & Wellness Package.jpg",
      rating: 4.8,
      reviews: 56,
      type: "Wellness"
    },
    {
      id: 2,
      title: "Private Chef Service",
      location: "Toronto, Canada",
      price: "$200/meal",
      image: "/images/serai-images/Private Chef Service.jpg",
      rating: 4.9,
      reviews: 34,
      type: "Culinary"
    },
    {
      id: 3,
      title: "Professional Photography",
      location: "Vancouver, Canada",
      price: "$150/hour",
      image: "/images/serai-images/Professional Photography.jpg",
      rating: 4.7,
      reviews: 89,
      type: "Media"
    }
  ];
                                  
                                  return (
    <div className="min-h-screen bg-white">
      {/* Top App Bar */}
      <TopAppBar 
        backHref="/"
        logoHref="/tabs"
        showListingButton={true}
        showLanguageButton={true}
        showMenuButton={true}
      />

      {/* Navigation Tabs */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8 justify-center">
                                  <button
              onClick={() => setActiveNavTab('silk-route')}
              className={`py-4 px-4 border-b-2 font-medium text-sm w-full text-center cursor-pointer ${
                activeNavTab === 'silk-route'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Routes
                                  </button>
                                    <button
              onClick={() => setActiveNavTab('serais')}
              className={`py-4 px-4 border-b-2 font-medium text-sm w-full text-center cursor-pointer ${
                activeNavTab === 'serais'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Serais
                                    </button>
                                <button
              onClick={() => setActiveNavTab('bazaar')}
              className={`py-4 px-4 border-b-2 font-medium text-sm w-full text-center cursor-pointer ${
                activeNavTab === 'bazaar'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bazaars
                                </button>
                                <button
              onClick={() => setActiveNavTab('essentials')}
              className={`py-4 px-4 border-b-2 font-medium text-sm w-full text-center cursor-pointer ${
                activeNavTab === 'essentials'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Essentials
                                </button>
          </nav>
                              </div>
            </div>
            
      {/* Search Bar */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          {renderSearchBar()}
        </div>
      </div>

      {/* Main Content - Tabbed Interface */}
      <main className="max-w-7xl mx-auto px-4 py-8 bg-white">
        {activeNavTab === 'silk-route' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Plan your trip</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {silkRoutesData.map((route) => (
                <div key={route.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="relative">
                    <Image
                      src={route.image}
                      alt={route.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{route.title}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{route.rating}</span>
                        <span className="text-sm text-gray-400 ml-1">({route.reviews})</span>
                </div>
              </div>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{route.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{route.price}</div>
                        <div className="text-sm text-gray-500">{route.duration}</div>
                  </div>
                      <button className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 mt-auto">
                        View Details
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        )}

        {activeNavTab === 'serais' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seraisData.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="relative">
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                      <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
                        <span className="text-sm text-gray-400 ml-1">({property.reviews})</span>
                    </div>
                  </div>
                    <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                    <p className="text-gray-500 text-xs mb-4">{property.type}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{property.price}</div>
                    </div>
                      <button className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        )}

        {activeNavTab === 'bazaar' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bazaarData.map((experience) => (
                <div key={experience.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="relative">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{experience.title}</h3>
                      <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{experience.rating}</span>
                        <span className="text-sm text-gray-400 ml-1">({experience.reviews})</span>
                    </div>
                  </div>
                    <p className="text-gray-600 text-sm mb-2">{experience.location}</p>
                    <div className="flex items-center text-gray-500 text-xs mb-4">
                    <Clock className="h-3 w-3 mr-1" />
                      {experience.duration}
                  </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{experience.price}</div>
                </div>
                      <button className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                        View Details
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        )}

        {activeNavTab === 'essentials' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {essentialsData.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="relative">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                      <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                        <span className="text-sm text-gray-400 ml-1">({service.reviews})</span>
                    </div>
                  </div>
                    <p className="text-gray-600 text-sm mb-2">{service.location}</p>
                    <p className="text-gray-500 text-xs mb-4">{service.type}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{service.price}</div>
                    </div>
                      <button className="bg-gradient-to-r from-serai-red-800 to-serai-red-900 hover:from-serai-red-900 hover:to-serai-red-950 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                        View Details
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-serai-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  );
}