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

  // Search state management for all tabs
  const [searchState, setSearchState] = useState({
    // Routes tab
    itinerary: '',
    duration: '',
    interests: '',
    
    // Serais tab
    where: searchParams.get('location') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: '',
    
    // Bazaars tab
    experience: '',
    bazaarLocation: '',
    bazaarDate: '',
    groupSize: '',
    
    // Essentials tab
    service: '',
    essentialsLocation: '',
    essentialsDate: '',
    time: ''
  });

  // Dropdown states
  const [dropdownStates, setDropdownStates] = useState({
    where: false,
    checkIn: false,
    checkOut: false,
    duration: false,
    guests: false,
    bazaarLocation: false,
    bazaarDate: false,
    groupSize: false,
    essentialsLocation: false,
    essentialsDate: false,
    time: false,
    service: false
  });

  // Date selection states
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

  // Refs for dropdown management
  const whereDropdownRef = useRef<HTMLDivElement>(null);
  const checkInDropdownRef = useRef<HTMLDivElement>(null);
  const checkOutDropdownRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const monthScrollRef = useRef<HTMLDivElement>(null);

  // Error states for validation
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Helper functions for state management
  const updateSearchState = (field: string, value: string) => {
    setSearchState(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleDropdown = (dropdown: keyof typeof dropdownStates) => {
    setDropdownStates(prev => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

  const closeDropdown = (dropdown: keyof typeof dropdownStates) => {
    setDropdownStates(prev => ({ ...prev, [dropdown]: false }));
  };

  // Validation function
  const validateSearch = () => {
    const newErrors: {[key: string]: string} = {};
    
    switch (activeNavTab) {
      case 'silk-route':
        if (!searchState.itinerary.trim()) newErrors.itinerary = 'Itinerary is required';
        if (!searchState.duration.trim()) newErrors.duration = 'Duration is required';
        break;
      case 'serais':
        if (!searchState.where.trim()) newErrors.where = 'Location is required';
        if (!searchState.checkIn.trim()) newErrors.checkIn = 'Check-in date is required';
        if (!searchState.checkOut.trim()) newErrors.checkOut = 'Check-out date is required';
        break;
      case 'bazaar':
        if (!searchState.experience.trim()) newErrors.experience = 'Experience is required';
        if (!searchState.bazaarLocation.trim()) newErrors.bazaarLocation = 'Location is required';
        break;
      case 'essentials':
        if (!searchState.service.trim()) newErrors.service = 'Service is required';
        if (!searchState.essentialsLocation.trim()) newErrors.essentialsLocation = 'Location is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Search function
  const handleSearch = () => {
    if (!validateSearch()) return;
    
    // Create search parameters based on active tab
    const searchParams = new URLSearchParams();
    
    switch (activeNavTab) {
      case 'silk-route':
        searchParams.set('itinerary', searchState.itinerary);
        searchParams.set('duration', searchState.duration);
        searchParams.set('interests', searchState.interests);
        break;
      case 'serais':
        searchParams.set('location', searchState.where);
        searchParams.set('checkIn', searchState.checkIn);
        searchParams.set('checkOut', searchState.checkOut);
        searchParams.set('guests', searchState.guests);
        break;
      case 'bazaar':
        searchParams.set('experience', searchState.experience);
        searchParams.set('location', searchState.bazaarLocation);
        searchParams.set('date', searchState.bazaarDate);
        searchParams.set('groupSize', searchState.groupSize);
        break;
      case 'essentials':
        searchParams.set('service', searchState.service);
        searchParams.set('location', searchState.essentialsLocation);
        searchParams.set('date', searchState.essentialsDate);
        searchParams.set('time', searchState.time);
        break;
    }
    
    // Navigate to search results
    window.location.href = `/search?${searchParams.toString()}`;
  };

  // Update state when URL parameters change
  useEffect(() => {
    const location = searchParams.get('location');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    
    if (location) updateSearchState('where', location);
    if (checkIn) updateSearchState('checkIn', checkIn);
    if (checkOut) updateSearchState('checkOut', checkOut);
    
    // Combine adults and children for guests display
    if (adults || children) {
      const guestsText = `${adults || '0 adults'}, ${children || '0 children'}`;
      updateSearchState('guests', guestsText);
    }
  }, [searchParams]);

  // Dynamic search bar based on active tab
  const renderSearchBar = () => {
    const searchBarClass = isMobile 
      ? "flex flex-col space-y-2 bg-white border border-serai-neutral-300 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
      : "flex items-center bg-white border border-serai-neutral-300 rounded-full shadow-sm hover:shadow-md transition-shadow";
    
    switch (activeNavTab) {
      case 'silk-route':
        return (
          <div className={searchBarClass}>
            {/* Itinerary Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-serai-neutral-300' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Itinerary</label>
              <input
                type="text"
                placeholder="Plan your journey"
                value={searchState.itinerary}
                onChange={(e) => updateSearchState('itinerary', e.target.value)}
                className={`w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent ${errors.itinerary ? 'border-red-500' : ''}`}
              />
              {errors.itinerary && <p className="text-red-500 text-xs mt-1">{errors.itinerary}</p>}
            </div>
            
            {/* Duration Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-serai-neutral-300' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Duration</label>
              <input
                type="text"
                placeholder="7-14 days"
                value={searchState.duration}
                onChange={(e) => updateSearchState('duration', e.target.value)}
                className={`w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent ${errors.duration ? 'border-red-500' : ''}`}
              />
              {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
            </div>
            
            {/* Interests, Experiences & Essentials Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-serai-neutral-300' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Interests, Experiences & Essentials</label>
              <input
                type="text"
                placeholder="Culture, nature, food"
                value={searchState.interests}
                onChange={(e) => updateSearchState('interests', e.target.value)}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
            </div>
            
            {/* Search Button */}
            <div className={`px-6 py-3 ${isMobile ? 'flex justify-center' : ''}`}>
              <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        );
      
      case 'serais':
        return (
          <div className={searchBarClass}>
            {/* Where Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-gray-300' : 'border-b border-gray-300'} relative`} ref={whereDropdownRef}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Where</label>
              <input
                type="text"
                placeholder="Search destinations"
                value={searchState.where}
                onChange={(e) => updateSearchState('where', e.target.value)}
                onFocus={() => toggleDropdown('where')}
                className={`w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent ${errors.where ? 'border-red-500' : ''}`}
              />
              {errors.where && <p className="text-red-500 text-xs mt-1">{errors.where}</p>}
              {dropdownStates.where && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-500 mb-2">Popular destinations</div>
                    {['Montreal', 'Toronto', 'Vancouver', 'Quebec City', 'Ottawa', 'Calgary', 'Halifax'].map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          updateSearchState('where', city);
                          closeDropdown('where');
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
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-gray-300' : 'border-b border-gray-300'} relative`} ref={checkInDropdownRef}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Check in</label>
              <input
                type="date"
                placeholder="Add date"
                value={searchState.checkIn}
                onChange={(e) => updateSearchState('checkIn', e.target.value)}
                onFocus={() => toggleDropdown('checkIn')}
                className={`w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent ${errors.checkIn ? 'border-red-500' : ''}`}
              />
              {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
            </div>
            
            {/* Check Out Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-gray-300' : 'border-b border-gray-300'} relative`} ref={checkOutDropdownRef}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Check out</label>
              <input
                type="date"
                placeholder="Add date"
                value={searchState.checkOut}
                onChange={(e) => updateSearchState('checkOut', e.target.value)}
                onFocus={() => toggleDropdown('checkOut')}
                className={`w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent ${errors.checkOut ? 'border-red-500' : ''}`}
              />
              {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
            </div>

            {/* Who Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? '' : 'border-b border-gray-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Who</label>
              <input
                type="text"
                placeholder="Add guests"
                value={searchState.guests}
                onChange={(e) => updateSearchState('guests', e.target.value)}
                onFocus={() => toggleDropdown('guests')}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
              {dropdownStates.guests && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-500 mb-2">Guest options</div>
                    {['1 adult', '2 adults', '3 adults', '4 adults', '1 adult, 1 child', '2 adults, 1 child', '2 adults, 2 children'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          updateSearchState('guests', option);
                          closeDropdown('guests');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <div className={`px-6 py-3 ${isMobile ? 'flex justify-center' : ''}`}>
              <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        );
      
      case 'bazaar':
        return (
          <div className={searchBarClass}>
            {/* Experience Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-serai-neutral-300' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Experience</label>
              <input
                type="text"
                placeholder="Search experience"
                value={searchState.experience}
                onChange={(e) => updateSearchState('experience', e.target.value)}
                className={`w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent ${errors.experience ? 'border-red-500' : ''}`}
              />
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
            </div>
            
            {/* Location Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-serai-neutral-300' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Location</label>
              <input
                type="text"
                placeholder="Search destinations"
                value={searchState.bazaarLocation}
                onChange={(e) => updateSearchState('bazaarLocation', e.target.value)}
                onFocus={() => toggleDropdown('bazaarLocation')}
                className={`w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent ${errors.bazaarLocation ? 'border-red-500' : ''}`}
              />
              {errors.bazaarLocation && <p className="text-red-500 text-xs mt-1">{errors.bazaarLocation}</p>}
              {dropdownStates.bazaarLocation && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-500 mb-2">Popular destinations</div>
                    {['Montreal', 'Toronto', 'Vancouver', 'Quebec City', 'Ottawa', 'Calgary', 'Halifax'].map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          updateSearchState('bazaarLocation', city);
                          closeDropdown('bazaarLocation');
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
                                
            {/* Date Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-serai-neutral-300' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Date</label>
              <input
                type="date"
                placeholder="Add date"
                value={searchState.bazaarDate}
                onChange={(e) => updateSearchState('bazaarDate', e.target.value)}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
            </div>
            
            {/* Group Size Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? '' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Group</label>
              <input
                type="text"
                placeholder="Add guests"
                value={searchState.groupSize}
                onChange={(e) => updateSearchState('groupSize', e.target.value)}
                onFocus={() => toggleDropdown('groupSize')}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
              {dropdownStates.groupSize && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-500 mb-2">Group size options</div>
                    {['1 person', '2 people', '3-5 people', '6-10 people', '10+ people'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          updateSearchState('groupSize', option);
                          closeDropdown('groupSize');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
                            
            {/* Search Button */}
            <div className={`px-6 py-3 ${isMobile ? 'flex justify-center' : ''}`}>
              <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        );
      
      case 'essentials':
        return (
          <div className={searchBarClass}>
            {/* Service Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-serai-neutral-300' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Service</label>
              <input
                type="text"
                placeholder="Search essentials"
                value={searchState.service}
                onChange={(e) => updateSearchState('service', e.target.value)}
                onFocus={() => toggleDropdown('service')}
                className={`w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent ${errors.service ? 'border-red-500' : ''}`}
              />
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
              {dropdownStates.service && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-500 mb-2">Service categories</div>
                    {['Spa & Wellness', 'Private Chef', 'Photography', 'Transportation', 'Concierge', 'Housekeeping'].map((service) => (
                      <button
                        key={service}
                        onClick={() => {
                          updateSearchState('service', service);
                          closeDropdown('service');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
                                
            {/* Location Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-serai-neutral-300' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Location</label>
              <input
                type="text"
                placeholder="Search destinations"
                value={searchState.essentialsLocation}
                onChange={(e) => updateSearchState('essentialsLocation', e.target.value)}
                onFocus={() => toggleDropdown('essentialsLocation')}
                className={`w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent ${errors.essentialsLocation ? 'border-red-500' : ''}`}
              />
              {errors.essentialsLocation && <p className="text-red-500 text-xs mt-1">{errors.essentialsLocation}</p>}
              {dropdownStates.essentialsLocation && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-500 mb-2">Popular destinations</div>
                    {['Montreal', 'Toronto', 'Vancouver', 'Quebec City', 'Ottawa', 'Calgary', 'Halifax'].map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          updateSearchState('essentialsLocation', city);
                          closeDropdown('essentialsLocation');
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
            
            {/* Date Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? 'border-r border-serai-neutral-300' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Date</label>
              <input
                type="date"
                placeholder="Add date"
                value={searchState.essentialsDate}
                onChange={(e) => updateSearchState('essentialsDate', e.target.value)}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
            </div>
            
            {/* Time Field */}
            <div className={`flex-1 px-6 py-3 ${!isMobile ? '' : 'border-b border-serai-neutral-300'} relative`}>
              <label className="block text-xs font-semibold text-serai-charcoal-500 mb-1">Time</label>
              <input
                type="time"
                placeholder="Add time"
                value={searchState.time}
                onChange={(e) => updateSearchState('time', e.target.value)}
                onFocus={() => toggleDropdown('time')}
                className="w-full text-sm text-serai-charcoal-500 placeholder-serai-neutral-500 focus:outline-none bg-transparent"
              />
              {dropdownStates.time && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-500 mb-2">Time slots</div>
                    {['Morning (8AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-9PM)', 'Night (9PM-12AM)'].map((timeSlot) => (
                      <button
                        key={timeSlot}
                        onClick={() => {
                          updateSearchState('time', timeSlot);
                          closeDropdown('time');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                      >
                        {timeSlot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className={`px-6 py-3 ${isMobile ? 'flex justify-center' : ''}`}>
              <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-serai-red-500 to-serai-red-600 hover:from-serai-red-600 hover:to-serai-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
              >
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
      const target = event.target as Node;
      
      // Close all dropdowns when clicking outside
      (Object.keys(dropdownStates) as Array<keyof typeof dropdownStates>).forEach(dropdown => {
        if (dropdownStates[dropdown]) {
          closeDropdown(dropdown);
        }
      });
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownStates]);

  // Add responsive design for mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
      <div className="bg-white pt-20">
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
          <div className={`${isMobile ? 'flex flex-col space-y-2' : ''}`}>
            {renderSearchBar()}
          </div>
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