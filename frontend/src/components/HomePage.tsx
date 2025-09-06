'use client';

import Image from 'next/image';
import Link from 'next/link';
import { User, LogIn, Calendar, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// DatePicker Component
const DatePicker = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateSelect = (date: Date) => {
    onChange(formatDate(date));
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-white/90 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-white/90 border border-white/30 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
        />
        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((date, index) => (
              <button
                key={index}
                onClick={() => date && handleDateSelect(date)}
                disabled={!date}
                className={`p-2 text-sm rounded hover:bg-gray-100 ${
                  date ? 'text-gray-900' : 'text-transparent cursor-default'
                } ${
                  date && date.toDateString() === new Date().toDateString() 
                    ? 'bg-blue-100 text-blue-600 font-semibold' 
                    : ''
                }`}
              >
                {date ? date.getDate() : ''}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function HomePage() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('2 adults');
  const [children, setChildren] = useState('0 children');

  const handleSearch = () => {
    // Create search parameters object
    const searchParams = new URLSearchParams({
      location: location,
      checkIn: checkIn,
      checkOut: checkOut,
      adults: adults,
      children: children
    });

    // Navigate to search results page with interactive map
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Image
          src="/images/serai-images/quebec2.jpg"
          alt="Quebec City Skyline"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation Header */}
      <header className="absolute -top-12 left-0 right-0 z-20 flex items-center justify-between px-2 lg:px-4">
        {/* Logo Section - Top Left Corner */}
        <div className="flex items-center">
          <Link href="/tabs">
            <Image
              src="/images/serai-images/serai-name-white.png"
              alt="SERAI"
              width={600}
              height={180}
              className="h-28 w-auto md:h-36 lg:h-44"
              priority
            />
          </Link>
        </div>

        {/* Authentication Buttons - Top Right Corner */}
        <div className="flex items-center space-x-2">
          <Link href="/auth" className="flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 font-medium text-sm">
            <User className="h-4 w-4" />
            <span>Sign Up</span>
          </Link>
          <Link href="/auth" className="flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 font-medium text-sm">
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        </div>
      </header>

      {/* Hero Content - Left Positioned Card */}
      <main className="absolute inset-0 z-10 flex items-center justify-start pl-6 lg:pl-12">
        <div className="max-w-sm w-full">
          {/* Search Card */}
          <div className="bg-white/2 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-full">
                              {/* Card Title */}
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white mb-2">
                      Find your perfect stay
                    </h1>
                    <p className="text-white/80 text-sm">
                      Find the stay that matches your story—only on Serai.
                    </p>
                  </div>

            {/* Vertical Search Form */}
            <div className="space-y-4">
              {/* Location Field */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter destination"
                  className="w-full bg-white/90 border border-white/30 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
                />
              </div>

              {/* Check In and Check Out Fields - Same Line */}
              <div className="flex gap-3">
                {/* Check In Field */}
                <div className="flex-1">
                  <DatePicker
                    label="Check In"
                    value={checkIn}
                    onChange={setCheckIn}
                    placeholder="Add dates"
                  />
                </div>

                {/* Check Out Field */}
                <div className="flex-1">
                  <DatePicker
                    label="Check Out"
                    value={checkOut}
                    onChange={setCheckOut}
                    placeholder="Add dates"
                  />
                </div>
              </div>

              {/* Adults and Children Fields - Same Line */}
              <div className="flex gap-3">
                {/* Adults Field */}
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="w-full bg-white/90 border border-white/30 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num === 1 ? "1 adult" : `${num} adults`}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Children Field */}
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Children
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="w-full bg-white/90 border border-white/30 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
                  >
                    {Array.from({ length: 16 }, (_, i) => i).map(num => (
                      <option key={num} value={num === 0 ? "0 children" : num === 1 ? "1 child" : `${num} children`}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

                                  {/* Search Button */}
                    <div className="pt-3">
                      <button 
                        onClick={handleSearch}
                        className="w-full bg-gradient-to-r from-red-800 to-red-900 text-white font-semibold py-3 rounded-lg hover:from-red-900 hover:to-red-950 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm"
                      >
                        <Search className="h-4 w-4" />
                        <span>Search</span>
                      </button>
                    </div>
            </div>
          </div>

          {/* Plan Your Trip Button Container */}
          <div className="mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
              <button 
                onClick={() => router.push('/tabs')}
                className="w-full bg-gradient-to-r from-red-800 to-red-900 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-900 hover:to-red-950 transition-all duration-300 hover:scale-105 shadow-lg text-sm"
              >
                Plan your trip with SERAI
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}