'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, Suspense } from 'react';
import { Heart, Star, MapPin, Calendar, Users, Filter, Maximize2, Plus, Minus, X, Check } from 'lucide-react';
import Link from 'next/link';
import TopAppBar from '@/components/TopAppBar';
import DateRangePicker from '@/components/DateRangePicker';
import { useSearchParams } from 'next/navigation';

function SearchResultsPageContent() {
  const searchParams = useSearchParams();
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Get search parameters from URL
  const locationParam = searchParams.get('location') || '';
  const checkInParam = searchParams.get('checkIn') || '';
  const checkOutParam = searchParams.get('checkOut') || '';
  const adultsParamRaw = searchParams.get('adults') || '2';
  
  // Clean up adults parameter to extract just the number
  const adultsParam = adultsParamRaw.replace(/\s+adults?/i, '').replace(/\s+guests?/i, '');

  // Search state management
  const [searchState, setSearchState] = useState({
    location: locationParam,
    adults: adultsParam
  });

  // Dropdown state for location
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  // Location options for dropdown
  const popularDestinations = [
    'New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Rome', 'Barcelona', 'Amsterdam',
    'Dubai', 'Singapore', 'Hong Kong', 'Los Angeles', 'San Francisco', 'Miami', 'Chicago',
    'Boston', 'Seattle', 'Toronto', 'Vancouver', 'Montreal', 'Berlin', 'Madrid', 'Vienna',
    'Prague', 'Budapest', 'Copenhagen', 'Stockholm', 'Oslo', 'Helsinki', 'Zurich', 'Geneva'
  ];

  // Parse dates from URL parameters
  const [checkInDate, setCheckInDate] = useState<Date | null>(
    checkInParam ? new Date(checkInParam) : null
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    checkOutParam ? new Date(checkOutParam) : null
  );

  // Helper function for state management
  const updateSearchState = (field: string, value: string) => {
    setSearchState(prev => ({ ...prev, [field]: value }));
  };

  // Search function
  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (searchState.location) {
      searchParams.set('location', searchState.location);
    }
    
    if (checkInDate) {
      searchParams.set('checkIn', checkInDate.toISOString().split('T')[0]);
    }
    
    if (checkOutDate) {
      searchParams.set('checkOut', checkOutDate.toISOString().split('T')[0]);
    }
    
    if (searchState.adults) {
      searchParams.set('adults', searchState.adults);
    }
    
    // Navigate to search results with parameters
    const queryString = searchParams.toString();
    window.location.href = `/search?${queryString}`;
  };

  // Sync state with URL parameters on mount
  useEffect(() => {
    const location = searchParams.get('location');
    const adultsRaw = searchParams.get('adults');
    
    if (location) updateSearchState('location', location);
    if (adultsRaw) {
      // Clean up adults parameter to extract just the number
      const adults = adultsRaw.replace(/\s+adults?/i, '').replace(/\s+guests?/i, '');
      updateSearchState('adults', adults);
    }
  }, [searchParams]);

  // Handle Enter key press for search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Location dropdown functions
  const toggleLocationDropdown = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
  };

  const closeLocationDropdown = () => {
    setIsLocationDropdownOpen(false);
  };

  const selectLocation = (location: string) => {
    updateSearchState('location', location);
    closeLocationDropdown();
  };

  // Click outside handler for location dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        closeLocationDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // State for map controls
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [mapZoom, setMapZoom] = useState(6);

  // State for filter modal
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // State for filter options
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 70000 });
  const [bedrooms, setBedrooms] = useState<string>('');
  const [beds, setBeds] = useState<string>('');
  const [bathrooms, setBathrooms] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Sample property data
  const properties = [
    {
      id: 1,
      title: "Historic Downtown Inn",
      location: "Montreal, Canada",
      price: "$180/night",
      totalPrice: "$1,260 for 7 nights",
      image: "/images/serai-images/Historic Downtown Inn.jpg",
      rating: 4.6,
      reviews: 89,
      type: "Boutique Hotel",
      coordinates: { lat: 45.5017, lng: -73.5673 },
      distance: "2.5 km away",
      dates: "Sep 8-15"
    },
    {
      id: 2,
      title: "Mountain View Lodge",
      location: "Banff, Canada",
      price: "$220/night",
      totalPrice: "$1,540 for 7 nights",
      image: "/images/serai-images/Mountain View Lodge.jpg",
      rating: 4.8,
      reviews: 124,
      type: "Eco Lodge",
      coordinates: { lat: 51.1784, lng: -115.5708 },
      distance: "8.2 km away",
      dates: "Sep 9-16"
    },
    {
      id: 3,
      title: "Desert Oasis Resort",
      location: "Phoenix, USA",
      price: "$150/night",
      totalPrice: "$1,050 for 7 nights",
      image: "/images/serai-images/Desert Oasis Resort.jpg",
      rating: 4.5,
      reviews: 67,
      type: "Luxury Glamping",
      coordinates: { lat: 33.4484, lng: -112.0740 },
      distance: "15.3 km away",
      dates: "Sep 10-17"
    },
    {
      id: 4,
      title: "Coastal Retreat Villa",
      location: "Vancouver, Canada",
      price: "$280/night",
      totalPrice: "$1,960 for 7 nights",
      image: "/images/serai-images/Coastal Retreat Villa Vancouver, Canada.jpeg",
      rating: 4.9,
      reviews: 156,
      type: "Luxury Villa",
      coordinates: { lat: 49.2827, lng: -123.1207 },
      distance: "5.1 km away",
      dates: "Sep 11-18"
    },
    {
      id: 5,
      title: "Urban Loft Apartment",
      location: "Toronto, Canada",
      price: "$165/night",
      totalPrice: "$1,155 for 7 nights",
      image: "/images/serai-images/Urban Loft Apartment Toronto, Canada.jpg",
      rating: 4.4,
      reviews: 78,
      type: "Modern Apartment",
      coordinates: { lat: 43.6532, lng: -79.3832 },
      distance: "3.7 km away",
      dates: "Sep 12-19"
    },
    {
      id: 6,
      title: "Lakeside Cottage",
      location: "Quebec City, Canada",
      price: "$195/night",
      totalPrice: "$1,365 for 7 nights",
      image: "/images/serai-images/Lakeside Cottage Quebec City, Canada.jpg",
      rating: 4.7,
      reviews: 92,
      type: "Charming Cottage",
      coordinates: { lat: 46.8139, lng: -71.2080 },
      distance: "12.8 km away",
      dates: "Sep 13-20"
    }
  ];

  // Calculate total guests
  const totalGuests = searchState.adults;

  // Filter options data
  const placeTypes = [
    'Entire place', 'Private room', 'Shared room', 'Hotel room'
  ];

  const amenities = [
    'Kitchen', 'Wifi', 'Washer', 'Dryer', 'Air conditioning', 'Heating',
    'TV', 'Hair dryer', 'Iron', 'Pool', 'Hot tub', 'Gym', 'Parking',
    'Breakfast', 'Laptop-friendly workspace'
  ];

  const accessibilityFeatures = [
    'Step-free path to entrance', 'Wide entrance', 'Wide doorway to guest bathroom',
    'Step-free shower', 'Grab rails in shower', 'Accessible parking spot',
    'Step-free path to entrance'
  ];

  const languages = [
    'English', 'French', 'Spanish', 'German', 'Italian', 'Portuguese',
    'Russian', 'Chinese', 'Japanese', 'Korean'
  ];

  // Helper functions for filter handling
  const toggleArrayItem = (array: string[], setArray: (arr: string[]) => void, item: string) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const clearAllFilters = () => {
    setSelectedPlaceTypes([]);
    setPriceRange({ min: 0, max: 70000 });
    setBedrooms('');
    setBeds('');
    setBathrooms('');
    setSelectedAmenities([]);
    setSelectedAccessibility([]);
    setSelectedLanguages([]);
  };

  // Map zoom controls
  const handleZoomIn = () => setMapZoom(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setMapZoom(prev => Math.max(prev - 1, 3));

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Custom styles for range slider and page overflow */}
      <style jsx global>{`
        html, body {
          overflow: hidden;
          height: 100%;
        }
        
        #__next {
          height: 100%;
          overflow: hidden;
        }
      `}</style>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #660f0f;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #660f0f;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-webkit-slider-track {
          background: transparent;
        }
        
        .slider::-moz-range-track {
          background: transparent;
        }
        
        /* Custom scrollbar for modal content */
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .modal-content::-webkit-scrollbar-track {
          background: #f5f5dc;
          border-radius: 4px;
        }
        
        .modal-content::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        
        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      
      {/* Top App Bar */}
      <TopAppBar 
        backHref="/"
        logoHref="/tabs"
        showListingButton={true}
        showLanguageButton={true}
        showMenuButton={true}
      />

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 py-4 flex-shrink-0 pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Search Form */}
            <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow flex-1 mr-4">
              {/* Where Field */}
              <div className="flex-1 px-6 py-3 border-r border-gray-300">
                <div className="relative" ref={locationDropdownRef}>
                  <input
                    type="text"
                    placeholder="Where"
                    value={searchState.location}
                    onChange={(e) => updateSearchState('location', e.target.value)}
                    onFocus={toggleLocationDropdown}
                    onKeyPress={handleKeyPress}
                    className="w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent border border-gray-200 rounded px-3 py-2 hover:border-gray-300 focus:border-gray-400 transition-colors"
                  />
                  
                  {/* Location Dropdown */}
                  {isLocationDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {popularDestinations.map((city) => (
                        <button
                          key={city}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            selectLocation(city);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Date Range Picker */}
              <div className="flex-2 px-6 py-3 border-r border-gray-300">
                <DateRangePicker
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  onCheckInChange={setCheckInDate}
                  onCheckOutChange={setCheckOutDate}
                  placeholder="Add dates"
                  className="w-full"
                />
              </div>

              {/* Who Field */}
              <div className="flex-1 px-6 py-3 border-r border-gray-300">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Add guests"
                    value={totalGuests}
                    readOnly
                    className="w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent border border-gray-200 rounded px-3 py-2 hover:border-gray-300 focus:border-gray-400 transition-colors pr-12"
                  />
                  <div className="absolute right-2 flex flex-col">
                    <button
                      onClick={() => {
                        const current = parseInt(searchState.adults) || 2;
                        if (current < 16) {
                          updateSearchState('adults', (current + 1).toString());
                        }
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        const current = parseInt(searchState.adults) || 2;
                        if (current > 1) {
                          updateSearchState('adults', (current - 1).toString());
                        }
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Search Button */}
              <div className="px-6 py-3">
                <button 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 inline-flex items-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter Button */}
            <button 
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Filter className="h-4 w-4 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Property Listings */}
        <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 flex-shrink-0">
            <h1 className="text-2xl font-semibold text-gray-900">
              Stays
            </h1>
          </div>

          {/* Property Listings Grid - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-serai-cream-50 rounded-full shadow-md hover:shadow-lg transition-shadow border border-serai-cream-200">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                        <p className="text-gray-600 text-sm mb-1">{property.location}</p>
                        <p className="text-gray-500 text-xs mb-2">{property.type}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{property.distance}</span>
                      <span>{property.dates}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{property.price}</div>
                        <div className="text-sm text-gray-600">{property.totalPrice}</div>
                      </div>
                      <button className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Interactive Map */}
        <div className="w-1/2 relative flex-1 p-4 pt-6 pr-6 pb-6">
          <div 
            ref={mapRef}
            className="w-full h-full bg-gray-100 relative rounded-lg"
            style={{ 
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600"><rect fill="%23e5e7eb" width="1000" height="600"/><path fill="%23d1d5db" d="M100 200 Q200 150 300 200 T500 200 L700 180 Q800 170 900 180 L950 200 Q980 220 950 250 L900 280 Q800 290 700 280 L500 300 Q300 310 300 350 T300 400 L200 420 Q150 430 100 420 Z"/></svg>')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button
                onClick={() => setIsMapFullscreen(!isMapFullscreen)}
                className="p-2 bg-serai-cream-50 rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-gray-900 border border-serai-cream-200"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
              <button
                onClick={handleZoomIn}
                className="p-2 bg-serai-cream-50 rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-gray-900 border border-serai-cream-200"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 bg-serai-cream-50 rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-gray-900 border border-serai-cream-200"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            {/* Property Markers */}
            {properties.map((property) => (
              <div
                key={property.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${20 + Math.random() * 60}%`
                }}
              >
                <div className="relative group">
                  {/* Price Bubble */}
                  <div className="bg-serai-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg cursor-pointer hover:bg-serai-red-700 transition-colors">
                    {property.price}
                  </div>
                  
                  {/* Property Info Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-serai-cream-50 rounded-lg shadow-xl border border-serai-cream-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="p-3">
                      <Image
                        src={property.image}
                        alt={property.title}
                        width={200}
                        height={100}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{property.title}</h4>
                      <p className="text-gray-600 text-xs mb-1">{property.location}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">{property.rating}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{property.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Map Attribution */}
            <div className="absolute bottom-4 left-4 text-xs text-gray-500">
              <div>Map Data ©2025</div>
              <div>1000 km</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8 overflow-y-auto flex-1 modal-content" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}>
              {/* Type of Place */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Type of place</h3>
                <div className="grid grid-cols-2 gap-3">
                  {placeTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleArrayItem(selectedPlaceTypes, setSelectedPlaceTypes, type)}
                      className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                        selectedPlaceTypes.includes(type)
                          ? 'border-gray-900 bg-gray-50 text-gray-900'
                          : 'border-gray-300 hover:border-gray-400 text-gray-900 bg-white'
                      }`}
                    >
                      <span className="text-sm font-medium">{type}</span>
                      {selectedPlaceTypes.includes(type) && (
                        <Check className="h-4 w-4 text-gray-900" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Price range</h3>
                <div className="space-y-4">
                  <div className="px-2">
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="70000"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #660f0f 0%, #660f0f ${(priceRange.max / 70000) * 100}%, #e5e7eb ${(priceRange.max / 70000) * 100}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>$0</span>
                        <span>${priceRange.max}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    The average nightly price is $300
                  </div>
                </div>
              </div>

              {/* Bedrooms, Beds & Bathrooms */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Bedrooms, beds & bathrooms</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 text-gray-900 bg-white"
                    >
                      <option value="" className="text-gray-900">Any</option>
                      <option value="0" className="text-gray-900">Studio</option>
                      <option value="1" className="text-gray-900">1</option>
                      <option value="2" className="text-gray-900">2</option>
                      <option value="3" className="text-gray-900">3</option>
                      <option value="4" className="text-gray-900">4</option>
                      <option value="5" className="text-gray-900">5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Beds</label>
                    <select
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 text-gray-900 bg-white"
                    >
                      <option value="" className="text-gray-900">Any</option>
                      <option value="1" className="text-gray-900">1</option>
                      <option value="2" className="text-gray-900">2</option>
                      <option value="3" className="text-gray-900">3</option>
                      <option value="4" className="text-gray-900">4</option>
                      <option value="5" className="text-gray-900">5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 text-gray-900 bg-white"
                    >
                      <option value="" className="text-gray-900">Any</option>
                      <option value="1" className="text-gray-900">1</option>
                      <option value="2" className="text-gray-900">2</option>
                      <option value="3" className="text-gray-900">3</option>
                      <option value="4" className="text-gray-900">4</option>
                      <option value="5" className="text-gray-900">5+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleArrayItem(selectedAmenities, setSelectedAmenities, amenity)}
                      className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                        selectedAmenities.includes(amenity)
                          ? 'border-gray-900 bg-gray-50 text-gray-900'
                          : 'border-gray-300 hover:border-gray-400 text-gray-900 bg-white'
                      }`}
                    >
                      <span className="text-sm font-medium">{amenity}</span>
                      {selectedAmenities.includes(amenity) && (
                        <Check className="h-4 w-4 text-gray-900" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessibility Features */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Accessibility features</h3>
                <div className="space-y-3">
                  {accessibilityFeatures.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => toggleArrayItem(selectedAccessibility, setSelectedAccessibility, feature)}
                      className={`flex items-center justify-between w-full p-3 border rounded-lg transition-colors ${
                        selectedAccessibility.includes(feature)
                          ? 'border-gray-900 bg-gray-50 text-gray-900'
                          : 'border-gray-300 hover:border-gray-400 text-gray-900 bg-white'
                      }`}
                    >
                      <span className="text-sm font-medium">{feature}</span>
                      {selectedAccessibility.includes(feature) && (
                        <Check className="h-4 w-4 text-gray-900" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Language</h3>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => toggleArrayItem(selectedLanguages, setSelectedLanguages, language)}
                      className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                        selectedLanguages.includes(language)
                          ? 'border-gray-900 bg-gray-50 text-gray-900'
                          : 'border-gray-300 hover:border-gray-400 text-gray-900 bg-white'
                      }`}
                    >
                      <span className="text-sm font-medium">{language}</span>
                      {selectedLanguages.includes(language) && (
                        <Check className="h-4 w-4 text-gray-900" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 underline"
              >
                Clear all
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="px-6 py-2 bg-gradient-to-r from-serai-red-500 to-serai-red-600 text-white rounded-lg font-medium hover:from-serai-red-600 hover:to-serai-red-700 transition-all"
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-serai-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SearchResultsPageContent />
    </Suspense>
  );
}
