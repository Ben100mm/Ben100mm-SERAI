'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Globe, Menu, ChevronDown, Heart, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PropertiesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English (Canada)');
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('language');
  const [selectedCurrency, setSelectedCurrency] = useState('Canadian dollar (CAD - $)');
  const [activeNavTab, setActiveNavTab] = useState('homes');
  const [isWhereDropdownOpen, setIsWhereDropdownOpen] = useState(false);
  const [whereValue, setWhereValue] = useState('');
  const [isCheckInDropdownOpen, setIsCheckInDropdownOpen] = useState(false);
  const [isCheckOutDropdownOpen, setIsCheckOutDropdownOpen] = useState(false);
  const [checkInValue, setCheckInValue] = useState('');
  const [checkOutValue, setCheckOutValue] = useState('');
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
  const menuRef = useRef<HTMLDivElement>(null);
  const languageModalRef = useRef<HTMLDivElement>(null);
  const whereDropdownRef = useRef<HTMLDivElement>(null);
  const checkInDropdownRef = useRef<HTMLDivElement>(null);
  const checkOutDropdownRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const monthScrollRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (languageModalRef.current && !languageModalRef.current.contains(event.target as Node)) {
        setIsLanguageModalOpen(false);
      }
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

  const languages = [
    { code: 'az', name: 'Azərbaycan dili', country: 'Azərbaycan' },
    { code: 'id', name: 'Bahasa Indonesia', country: 'Indonesia' },
    { code: 'bs', name: 'Bosanski', country: 'Bosna i Hercegovina' },
    { code: 'ca', name: 'Català', country: 'Espanya' },
    { code: 'cs', name: 'Čeština', country: 'Česká republika' },
    { code: 'cnr', name: 'Crnogorski', country: 'Crna Gora' },
    { code: 'da', name: 'Dansk', country: 'Danmark' },
    { code: 'de', name: 'Deutsch', country: 'Deutschland' },
    { code: 'de-at', name: 'Deutsch', country: 'Österreich' },
    { code: 'de-ch', name: 'Deutsch', country: 'Schweiz' },
    { code: 'de-lu', name: 'Deutsch', country: 'Luxemburg' },
    { code: 'et', name: 'Eesti', country: 'Eesti' },
    { code: 'en-au', name: 'English', country: 'Australia' },
    { code: 'en-gy', name: 'English', country: 'Guyana' },
    { code: 'en-ca', name: 'English', country: 'Canada' },
    { code: 'en-gb', name: 'English', country: 'United Kingdom' },
    { code: 'en-us', name: 'English', country: 'United States' },
    { code: 'es', name: 'Español', country: 'España' },
    { code: 'fr', name: 'Français', country: 'Canada' },
    { code: 'fr-fr', name: 'Français', country: 'France' },
    { code: 'it', name: 'Italiano', country: 'Italia' },
    { code: 'ja', name: '日本語', country: '日本' },
    { code: 'ko', name: '한국어', country: '대한민국' },
    { code: 'pt', name: 'Português', country: 'Brasil' },
    { code: 'ru', name: 'Русский', country: 'Россия' },
    { code: 'zh', name: '中文', country: '中国' },
  ];

  const currencies = [
    { name: 'Canadian dollar', code: 'CAD', symbol: '$' },
    { name: 'Australian dollar', code: 'AUD', symbol: '$' },
    { name: 'Brazilian real', code: 'BRL', symbol: 'R$' },
    { name: 'Bulgarian lev', code: 'BGN', symbol: 'лв.' },
    { name: 'Chilean peso', code: 'CLP', symbol: '$' },
    { name: 'Chinese yuan', code: 'CNY', symbol: '¥' },
    { name: 'Colombian peso', code: 'COP', symbol: '$' },
    { name: 'Costa Rican colon', code: 'CRC', symbol: '₡' },
    { name: 'Czech koruna', code: 'CZK', symbol: 'Kč' },
    { name: 'Danish krone', code: 'DKK', symbol: 'kr' },
    { name: 'Egyptian pound', code: 'EGP', symbol: 'ج.م' },
    { name: 'Emirati dirham', code: 'AED', symbol: 'د.إ' },
    { name: 'Euro', code: 'EUR', symbol: '€' },
    { name: 'Ghanaian cedi', code: 'GHS', symbol: 'GH¢' },
    { name: 'Hong Kong dollar', code: 'HKD', symbol: '$' },
    { name: 'Hungarian forint', code: 'HUF', symbol: 'Ft' },
    { name: 'Indian rupee', code: 'INR', symbol: '₹' },
    { name: 'Indonesian rupiah', code: 'IDR', symbol: 'Rp' },
    { name: 'Israeli new shekel', code: 'ILS', symbol: '₪' },
    { name: 'Japanese yen', code: 'JPY', symbol: '¥' },
    { name: 'Kazakhstani tenge', code: 'KZT', symbol: '₸' },
    { name: 'Kenyan shilling', code: 'KES', symbol: 'KSh' },
    { name: 'Malaysian ringgit', code: 'MYR', symbol: 'RM' },
    { name: 'Mexican peso', code: 'MXN', symbol: '$' },
    { name: 'Moroccan dirham', code: 'MAD', symbol: 'MAD' },
    { name: 'New Taiwan dollar', code: 'TWD', symbol: '$' },
    { name: 'New Zealand dollar', code: 'NZD', symbol: '$' },
    { name: 'Norwegian krone', code: 'NOK', symbol: 'kr' },
    { name: 'Peruvian sol', code: 'PEN', symbol: 'S/' },
    { name: 'Philippine peso', code: 'PHP', symbol: '₱' },
    { name: 'Polish zloty', code: 'PLN', symbol: 'zł' },
    { name: 'Pound sterling', code: 'GBP', symbol: '£' },
    { name: 'Qatari riyal', code: 'QAR', symbol: 'ر.ق' },
    { name: 'Romanian leu', code: 'RON', symbol: 'lei' },
    { name: 'Saudi Arabian riyal', code: 'SAR', symbol: 'SR' },
    { name: 'Singapore dollar', code: 'SGD', symbol: '$' },
    { name: 'South African rand', code: 'ZAR', symbol: 'R' },
    { name: 'South Korean won', code: 'KRW', symbol: '₩' },
    { name: 'Swedish krona', code: 'SEK', symbol: 'kr' },
    { name: 'Swiss franc', code: 'CHF', symbol: 'CHF' },
    { name: 'Thai baht', code: 'THB', symbol: '฿' },
    { name: 'Turkish lira', code: 'TRY', symbol: '₺' },
    { name: 'Ukrainian hryvnia', code: 'UAH', symbol: '₴' },
    { name: 'US dollar', code: 'USD', symbol: '$' },
    { name: 'Vietnamese dong', code: 'VND', symbol: '₫' },
  ];

  const suggestedDestinations = [
    {
      id: 1,
      name: 'Nearby',
      description: 'Find what\'s around you',
      icon: '📍',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Calgary, Alberta',
      description: 'For nature-lovers',
      icon: '🏔️',
      color: 'orange'
    },
    {
      id: 3,
      name: 'Victoria, British Columbia',
      description: 'For sights like The Butchart Gardens',
      icon: '🌊',
      color: 'brown'
    },
    {
      id: 4,
      name: 'Kelowna, British Columbia',
      description: 'Popular lake destination',
      icon: '🏞️',
      color: 'brown'
    },
    {
      id: 5,
      name: 'Edmonton, Alberta',
      description: 'For sights like West Edmonton Mall',
      icon: '🏢',
      color: 'blue'
    },
    {
      id: 6,
      name: 'Whistler, British Columbia',
      description: 'Great for a weekend getaway',
      icon: '🏔️',
      color: 'brown'
    },
    {
      id: 7,
      name: 'Toronto, Ontario',
      description: 'For its bustling nightlife',
      icon: '🌃',
      color: 'blue'
    }
  ];

  const flexibleOptions = [
    'Exact dates',
    '± 1 day',
    '± 2 days',
    '± 3 days',
    '± 7 days',
    '± 14 days'
  ];

  const durationOptions = [
    'Weekend',
    'Week',
    'Month'
  ];

  // Generate months for flexible tab
  const generateFlexibleMonths = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      months.push(monthDate);
    }
    
    return months;
  };

  const flexibleMonths = generateFlexibleMonths();

  // Calendar utility functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDates.checkIn && !selectedDates.checkOut) return false;
    if (selectedDates.checkIn && selectedDates.checkOut) {
      return date >= selectedDates.checkIn && date <= selectedDates.checkOut;
    }
    if (selectedDates.checkIn) {
      return date.getTime() === selectedDates.checkIn.getTime();
    }
    return false;
  };

  const isDateInRange = (date: Date) => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return false;
    return date > selectedDates.checkIn && date < selectedDates.checkOut;
  };

  const handleDateClick = (date: Date) => {
    if (!selectedDates.checkIn || (selectedDates.checkIn && selectedDates.checkOut)) {
      // Start new selection
      setSelectedDates({ checkIn: date, checkOut: null });
      setCheckInValue(formatDate(date));
      setCheckOutValue('');
    } else if (selectedDates.checkIn && !selectedDates.checkOut) {
      // Complete selection
      if (date > selectedDates.checkIn) {
        setSelectedDates({ ...selectedDates, checkOut: date });
        setCheckOutValue(formatDate(date));
        setIsCheckInDropdownOpen(false);
        setIsCheckOutDropdownOpen(false);
      } else {
        // If clicked date is before check-in, make it the new check-in
        setSelectedDates({ checkIn: date, checkOut: null });
        setCheckInValue(formatDate(date));
        setCheckOutValue('');
      }
    }
  };

  // Circular month selector functions
  const handleCircleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!circleRef.current) return;
    
    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    // Calculate angle from top (0 degrees)
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360; // Adjust to start from top
    
    // Convert angle to months (0-12 months)
    const months = Math.round((angle / 360) * 12);
    const clampedMonths = Math.max(1, Math.min(12, months));
    
    setSelectedMonths(clampedMonths);
  };

  const handleCircleMouseDown = () => {
    setIsDragging(true);
  };

  const handleCircleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleCircleClick(event);
  };

  const handleCircleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate date range based on selected months
  const getDateRangeFromMonths = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + selectedMonths);
    
    return {
      start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      end: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  };

  const properties = [
    {
      id: 1,
      image: '/images/serai-images/quebec2.jpg',
      type: 'Home in Laval',
      location: 'Laval, Quebec',
      dates: 'Oct 31-Nov 2',
      price: '$136 CAD for 2 nights',
      rating: 4.84,
      isGuestFavorite: true
    },
    {
      id: 2,
      image: '/images/serai-images/quebec2.jpg',
      type: 'Room in Oka',
      location: 'Oka, Quebec',
      dates: 'Sep 19-21',
      price: '$89 CAD for 2 nights',
      rating: 5.0,
      isGuestFavorite: true
    },
    {
      id: 3,
      image: '/images/serai-images/quebec2.jpg',
      type: 'Chalet in La Conception',
      location: 'La Conception, Quebec',
      dates: 'Nov 15-17',
      price: '$245 CAD for 2 nights',
      rating: 4.92,
      isGuestFavorite: true
    },
    {
      id: 4,
      image: '/images/serai-images/quebec2.jpg',
      type: 'Home in Montreal',
      location: 'Montreal, Quebec',
      dates: 'Dec 1-3',
      price: '$178 CAD for 2 nights',
      rating: 4.76,
      isGuestFavorite: false
    },
    {
      id: 5,
      image: '/images/serai-images/quebec2.jpg',
      type: 'Condo in Quebec City',
      location: 'Quebec City, Quebec',
      dates: 'Jan 10-12',
      price: '$156 CAD for 2 nights',
      rating: 4.88,
      isGuestFavorite: true
    },
    {
      id: 6,
      image: '/images/serai-images/quebec2.jpg',
      type: 'Cottage in Charlevoix',
      location: 'Charlevoix, Quebec',
      dates: 'Feb 5-7',
      price: '$198 CAD for 2 nights',
      rating: 4.95,
      isGuestFavorite: true
    },
    {
      id: 7,
      image: '/images/serai-images/quebec2.jpg',
      type: 'Apartment in Gatineau',
      location: 'Gatineau, Quebec',
      dates: 'Mar 12-14',
      price: '$124 CAD for 2 nights',
      rating: 4.67,
      isGuestFavorite: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">Back</span>
          </Link>
        </div>
        
        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image
            src="/images/serai-images/serai-name-black.png"
            alt="SERAI"
            width={600}
            height={180}
            className="h-28 w-auto"
            priority
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">List with SERAI</button>
          <button 
            onClick={() => setIsLanguageModalOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Globe className="h-5 w-5 text-gray-600" />
          </button>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full flex items-center space-x-1"
            >
              <Menu className="h-5 w-5 text-gray-600" />
              <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Help Centre
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Refer a property
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Find a partner
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Gift cards
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Language Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={languageModalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6">
              <div className="flex space-x-6">
                <button 
                  onClick={() => setActiveTab('language')}
                  className={`text-lg font-semibold pb-2 ${
                    activeTab === 'language' 
                      ? 'text-gray-900 border-b-2 border-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Language and region
                </button>
                <button 
                  onClick={() => setActiveTab('currency')}
                  className={`text-lg font-semibold pb-2 ${
                    activeTab === 'currency' 
                      ? 'text-gray-900 border-b-2 border-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Currency
                </button>
              </div>
              <button 
                onClick={() => setIsLanguageModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {activeTab === 'language' ? (
                <>
                  {/* Translation Section */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Translation</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Automatically translate descriptions and reviews to English.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Enable translation</span>
                      <button
                        onClick={() => setIsTranslationEnabled(!isTranslationEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isTranslationEnabled ? 'bg-gray-900' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isTranslationEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Suggested Languages */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested languages and regions</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button 
                        onClick={() => setSelectedLanguage('English (United States)')}
                        className={`p-4 border rounded-lg text-left hover:bg-gray-50 ${
                          selectedLanguage === 'English (United States)' ? 'border-gray-900' : 'border-gray-200'
                        }`}
                      >
                        <div className="font-medium text-gray-900">English</div>
                        <div className="text-sm text-gray-600">United States</div>
                      </button>
                      <button 
                        onClick={() => setSelectedLanguage('English (United Kingdom)')}
                        className={`p-4 border rounded-lg text-left hover:bg-gray-50 ${
                          selectedLanguage === 'English (United Kingdom)' ? 'border-gray-900' : 'border-gray-200'
                        }`}
                      >
                        <div className="font-medium text-gray-900">English</div>
                        <div className="text-sm text-gray-600">United Kingdom</div>
                      </button>
                      <button 
                        onClick={() => setSelectedLanguage('Français (Canada)')}
                        className={`p-4 border rounded-lg text-left hover:bg-gray-50 ${
                          selectedLanguage === 'Français (Canada)' ? 'border-gray-900' : 'border-gray-200'
                        }`}
                      >
                        <div className="font-medium text-gray-900">Français</div>
                        <div className="text-sm text-gray-600">Canada</div>
                      </button>
                    </div>
                  </div>

                  {/* All Languages */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a language and region</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setSelectedLanguage(`${lang.name} (${lang.country})`)}
                          className={`p-3 border rounded-lg text-left hover:bg-gray-50 ${
                            selectedLanguage === `${lang.name} (${lang.country})` ? 'border-gray-900' : 'border-gray-200'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{lang.name}</div>
                          <div className="text-sm text-gray-600">{lang.country}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Currency Tab */
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a currency</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => setSelectedCurrency(`${currency.name} (${currency.code} - ${currency.symbol})`)}
                        className={`p-3 border rounded-lg text-left hover:bg-gray-50 ${
                          selectedCurrency === `${currency.name} (${currency.code} - ${currency.symbol})` 
                            ? 'border-gray-900' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-sm">{currency.name}</div>
                        <div className="text-xs text-gray-600">{currency.code} - {currency.symbol}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div>
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8 justify-center">
            <button
              onClick={() => setActiveNavTab('homes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeNavTab === 'homes'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Listings
            </button>
            <button
              onClick={() => setActiveNavTab('experiences')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeNavTab === 'experiences'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Experiences
            </button>
            <button
              onClick={() => setActiveNavTab('services')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeNavTab === 'services'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Services
            </button>
          </nav>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            {/* Where Field */}
            <div className="flex-1 px-6 py-3 border-r border-gray-300 relative" ref={whereDropdownRef}>
              <label className="block text-xs font-semibold text-gray-900 mb-1">Where</label>
              <input
                type="text"
                placeholder="Search destinations"
                value={whereValue}
                onChange={(e) => setWhereValue(e.target.value)}
                onFocus={() => setIsWhereDropdownOpen(true)}
                className="w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent"
              />
                
                {/* Suggested Destinations Dropdown */}
                {isWhereDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested destinations</h3>
                      <div className="space-y-2">
                        {suggestedDestinations.map((destination) => (
                          <button
                            key={destination.id}
                            onClick={() => {
                              setWhereValue(destination.name);
                              setIsWhereDropdownOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg text-left"
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                              destination.color === 'blue' ? 'bg-blue-100' :
                              destination.color === 'orange' ? 'bg-orange-100' :
                              'bg-amber-100'
                            }`}>
                              {destination.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{destination.name}</div>
                              <div className="text-sm text-gray-600">{destination.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>
            
            {/* Check In Field */}
            <div className="flex-1 px-6 py-3 border-r border-gray-300 relative" ref={checkInDropdownRef}>
              <label className="block text-xs font-semibold text-gray-900 mb-1">Check in</label>
              <input
                type="text"
                placeholder="Add dates"
                value={checkInValue}
                onChange={(e) => setCheckInValue(e.target.value)}
                onFocus={() => {
                  setIsCheckInDropdownOpen(true);
                  setIsCheckOutDropdownOpen(false);
                }}
                className="w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent"
              />
                
                {/* Calendar Dropdown */}
                {isCheckInDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-96">
                    <div className="p-4">
                      {/* Tabs */}
                      <div className="flex space-x-6 mb-6">
                        <button 
                          onClick={() => setActiveCalendarTab('dates')}
                          className={`text-lg font-semibold pb-2 ${
                            activeCalendarTab === 'dates'
                              ? 'text-gray-900 border-b-2 border-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Dates
                        </button>
                        <button 
                          onClick={() => setActiveCalendarTab('months')}
                          className={`text-lg font-semibold pb-2 ${
                            activeCalendarTab === 'months'
                              ? 'text-gray-900 border-b-2 border-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Months
                        </button>
                        <button 
                          onClick={() => setActiveCalendarTab('flexible')}
                          className={`text-lg font-semibold pb-2 ${
                            activeCalendarTab === 'flexible'
                              ? 'text-gray-900 border-b-2 border-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Flexible
                        </button>
                      </div>

                      {/* Content based on active tab */}
                      {activeCalendarTab === 'dates' && (
                        <>
                          {/* Calendar */}
                          <div className="mb-6">
                            {/* Month Navigation */}
                            <div className="flex items-center justify-between mb-4">
                              <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="p-2 hover:bg-gray-100 rounded-full"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                              </h3>
                              <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="p-2 hover:bg-gray-100 rounded-full"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                  {day}
                                </div>
                              ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                              {Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => (
                                <div key={`empty-${i}`} className="h-10"></div>
                              ))}
                              {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                                const today = new Date();
                                const isPast = date < today;
                                const isSelected = isDateSelected(date);
                                const isInRange = isDateInRange(date);
                                
                                return (
                                  <button
                                    key={i + 1}
                                    onClick={() => !isPast && handleDateClick(date)}
                                    disabled={isPast}
                                    className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
                                      isPast
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : isSelected
                                        ? 'bg-gray-900 text-white'
                                        : isInRange
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-900 hover:bg-gray-100'
                                    }`}
                                  >
                                    {i + 1}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}

                      {activeCalendarTab === 'months' && (
                        <>
                          {/* Months Tab Content */}
                          <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">When's your trip?</h2>
                            
                            {/* Circular Month Selector */}
                            <div className="flex justify-center mb-8">
                              <div 
                                ref={circleRef}
                                className="relative w-64 h-64 cursor-pointer"
                                onClick={handleCircleClick}
                                onMouseDown={handleCircleMouseDown}
                                onMouseMove={handleCircleMouseMove}
                                onMouseUp={handleCircleMouseUp}
                                onMouseLeave={handleCircleMouseUp}
                              >
                                {/* Outer gradient ring */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-200 via-pink-300 to-red-400"></div>
                                
                                {/* Inner white circle */}
                                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-4xl font-bold text-gray-900">{selectedMonths}</div>
                                    <div className="text-lg text-gray-600">months</div>
                                  </div>
                                </div>
                                
                                {/* Dots around the circle */}
                                {Array.from({ length: 12 }, (_, i) => {
                                  const angle = (i * 30) - 90; // Start from top
                                  const x = 50 + 40 * Math.cos(angle * Math.PI / 180);
                                  const y = 50 + 40 * Math.sin(angle * Math.PI / 180);
                                  
                                  return (
                                    <div
                                      key={i}
                                      className="absolute w-2 h-2 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                                      style={{
                                        left: `${x}%`,
                                        top: `${y}%`
                                      }}
                                    />
                                  );
                                })}
                                
                                {/* Handle */}
                                <div 
                                  className="absolute w-6 h-6 bg-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300"
                                  style={{
                                    left: `${50 + 40 * Math.cos((selectedMonths * 30 - 90) * Math.PI / 180)}%`,
                                    top: `${50 + 40 * Math.sin((selectedMonths * 30 - 90) * Math.PI / 180)}%`
                                  }}
                                />
                              </div>
                            </div>
                            
                            {/* Date Range Display */}
                            <div className="text-lg text-gray-900">
                              {getDateRangeFromMonths().start} to {getDateRangeFromMonths().end}
                            </div>
                          </div>
                        </>
                      )}

                      {activeCalendarTab === 'flexible' && (
                        <>
                          {/* Flexible Tab Content */}
                          <div className="space-y-8">
                            {/* How long would you like to stay? */}
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">How long would you like to stay?</h3>
                              <div className="flex gap-3">
                                {durationOptions.map((duration) => (
                                  <button
                                    key={duration}
                                    onClick={() => setSelectedDuration(duration)}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-colors border ${
                                      selectedDuration === duration
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                    }`}
                                  >
                                    {duration}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* When do you want to go? */}
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">When do you want to go?</h3>
                              <div className="relative">
                                <div 
                                  ref={monthScrollRef}
                                  className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
                                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                  {flexibleMonths.map((month, index) => (
                                    <button
                                      key={index}
                                      onClick={() => setSelectedFlexibleMonth(month)}
                                      className={`flex-shrink-0 w-24 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-colors ${
                                        selectedFlexibleMonth.getTime() === month.getTime()
                                          ? 'border-gray-900 bg-gray-50'
                                          : 'border-gray-200 hover:border-gray-300'
                                      }`}
                                    >
                                      {/* Calendar Icon */}
                                      <div className="w-6 h-6 mb-1">
                                        <svg className="w-full h-full text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                      </div>
                                      <div className="text-xs font-medium text-gray-900 text-center">
                                        {month.toLocaleDateString('en-US', { month: 'short' })}
                                      </div>
                                      <div className="text-xs text-gray-600">
                                        {month.getFullYear()}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                                
                                {/* Scroll arrows */}
                                <button
                                  onClick={() => {
                                    if (monthScrollRef.current) {
                                      monthScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                                    }
                                  }}
                                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                >
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                                
                                <button
                                  onClick={() => {
                                    if (monthScrollRef.current) {
                                      monthScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                                    }
                                  }}
                                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                >
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
            </div>
            
            {/* Check Out Field */}
            <div className="flex-1 px-6 py-3 border-r border-gray-300 relative" ref={checkOutDropdownRef}>
              <label className="block text-xs font-semibold text-gray-900 mb-1">Check out</label>
              <input
                type="text"
                placeholder="Add dates"
                value={checkOutValue}
                onChange={(e) => setCheckOutValue(e.target.value)}
                onFocus={() => {
                  setIsCheckOutDropdownOpen(true);
                  setIsCheckInDropdownOpen(false);
                }}
                className="w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent"
                />
                
                {/* Calendar Dropdown for Check Out */}
                {isCheckOutDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-96">
                    <div className="p-4">
                      {/* Tabs */}
                      <div className="flex space-x-6 mb-6">
                        <button 
                          onClick={() => setActiveCalendarTab('dates')}
                          className={`text-lg font-semibold pb-2 ${
                            activeCalendarTab === 'dates'
                              ? 'text-gray-900 border-b-2 border-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Dates
                        </button>
                        <button 
                          onClick={() => setActiveCalendarTab('months')}
                          className={`text-lg font-semibold pb-2 ${
                            activeCalendarTab === 'months'
                              ? 'text-gray-900 border-b-2 border-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Months
                        </button>
                        <button 
                          onClick={() => setActiveCalendarTab('flexible')}
                          className={`text-lg font-semibold pb-2 ${
                            activeCalendarTab === 'flexible'
                              ? 'text-gray-900 border-b-2 border-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          Flexible
                        </button>
                      </div>

                      {/* Content based on active tab */}
                      {activeCalendarTab === 'dates' && (
                        <>
                          {/* Calendar */}
                          <div className="mb-6">
                            {/* Month Navigation */}
                            <div className="flex items-center justify-between mb-4">
                              <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="p-2 hover:bg-gray-100 rounded-full"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                              </h3>
                              <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="p-2 hover:bg-gray-100 rounded-full"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                  {day}
                                </div>
                              ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                              {Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => (
                                <div key={`empty-${i}`} className="h-10"></div>
                              ))}
                              {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                                const today = new Date();
                                const isPast = date < today;
                                const isSelected = isDateSelected(date);
                                const isInRange = isDateInRange(date);
                                
                                return (
                                  <button
                                    key={i + 1}
                                    onClick={() => !isPast && handleDateClick(date)}
                                    disabled={isPast}
                                    className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
                                      isPast
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : isSelected
                                        ? 'bg-gray-900 text-white'
                                        : isInRange
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-900 hover:bg-gray-100'
                                    }`}
                                  >
                                    {i + 1}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}

                      {activeCalendarTab === 'months' && (
                        <>
                          {/* Months Tab Content */}
                          <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">When's your trip?</h2>
                            
                            {/* Circular Month Selector */}
                            <div className="flex justify-center mb-8">
                              <div 
                                ref={circleRef}
                                className="relative w-64 h-64 cursor-pointer"
                                onClick={handleCircleClick}
                                onMouseDown={handleCircleMouseDown}
                                onMouseMove={handleCircleMouseMove}
                                onMouseUp={handleCircleMouseUp}
                                onMouseLeave={handleCircleMouseUp}
                              >
                                {/* Outer gradient ring */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-200 via-pink-300 to-red-400"></div>
                                
                                {/* Inner white circle */}
                                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-4xl font-bold text-gray-900">{selectedMonths}</div>
                                    <div className="text-lg text-gray-600">months</div>
                                  </div>
                                </div>
                                
                                {/* Dots around the circle */}
                                {Array.from({ length: 12 }, (_, i) => {
                                  const angle = (i * 30) - 90; // Start from top
                                  const x = 50 + 40 * Math.cos(angle * Math.PI / 180);
                                  const y = 50 + 40 * Math.sin(angle * Math.PI / 180);
                                  
                                  return (
                                    <div
                                      key={i}
                                      className="absolute w-2 h-2 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                                      style={{
                                        left: `${x}%`,
                                        top: `${y}%`
                                      }}
                                    />
                                  );
                                })}
                                
                                {/* Handle */}
                                <div 
                                  className="absolute w-6 h-6 bg-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300"
                                  style={{
                                    left: `${50 + 40 * Math.cos((selectedMonths * 30 - 90) * Math.PI / 180)}%`,
                                    top: `${50 + 40 * Math.sin((selectedMonths * 30 - 90) * Math.PI / 180)}%`
                                  }}
                                />
                              </div>
                            </div>
                            
                            {/* Date Range Display */}
                            <div className="text-lg text-gray-900">
                              {getDateRangeFromMonths().start} to {getDateRangeFromMonths().end}
                            </div>
                          </div>
                        </>
                      )}

                      {activeCalendarTab === 'flexible' && (
                        <>
                          {/* Flexible Tab Content */}
                          <div className="space-y-8">
                            {/* How long would you like to stay? */}
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">How long would you like to stay?</h3>
                              <div className="flex gap-3">
                                {durationOptions.map((duration) => (
                                  <button
                                    key={duration}
                                    onClick={() => setSelectedDuration(duration)}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-colors border ${
                                      selectedDuration === duration
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                    }`}
                                  >
                                    {duration}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* When do you want to go? */}
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">When do you want to go?</h3>
                              <div className="relative">
                                <div 
                                  ref={monthScrollRef}
                                  className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
                                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                  {flexibleMonths.map((month, index) => (
                                    <button
                                      key={index}
                                      onClick={() => setSelectedFlexibleMonth(month)}
                                      className={`flex-shrink-0 w-24 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-colors ${
                                        selectedFlexibleMonth.getTime() === month.getTime()
                                          ? 'border-gray-900 bg-gray-50'
                                          : 'border-gray-200 hover:border-gray-300'
                                      }`}
                                    >
                                      {/* Calendar Icon */}
                                      <div className="w-6 h-6 mb-1">
                                        <svg className="w-full h-full text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                      </div>
                                      <div className="text-xs font-medium text-gray-900 text-center">
                                        {month.toLocaleDateString('en-US', { month: 'short' })}
                                      </div>
                                      <div className="text-xs text-gray-600">
                                        {month.getFullYear()}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                                
                                {/* Scroll arrows */}
                                <button
                                  onClick={() => {
                                    if (monthScrollRef.current) {
                                      monthScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                                    }
                                  }}
                                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                >
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                                
                                <button
                                  onClick={() => {
                                    if (monthScrollRef.current) {
                                      monthScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                                    }
                                  }}
                                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                >
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
            </div>
            
            {/* Who Field */}
            <div className="flex-1 px-6 py-3">
              <label className="block text-xs font-semibold text-gray-900 mb-1">Who</label>
              <input
                type="text"
                placeholder="Add guests"
                className="w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent"
              />
            </div>
            
            {/* Search Button */}
            <button className="p-2 m-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Property Listings Section 1 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Places to stay in Pointe-Calumet
            </h2>
            <button className="flex items-center text-gray-900 hover:text-gray-700 font-medium">
              <span>Show all</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.slice(0, 4).map((property) => (
              <div key={property.id} className="group cursor-pointer">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.type}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {property.isGuestFavorite && (
                      <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-900">
                        Guest favourite
                      </div>
                    )}
                    <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{property.type}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-gray-900 fill-current" />
                        <span className="text-sm text-gray-900">{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{property.location}</p>
                    <p className="text-sm text-gray-600">{property.dates}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{property.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Listings Section 2 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Popular homes in Calgary
            </h2>
            <button className="flex items-center text-gray-900 hover:text-gray-700 font-medium">
              <span>Show all</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.slice(3, 7).map((property) => (
              <div key={property.id} className="group cursor-pointer">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.type}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {property.isGuestFavorite && (
                      <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-900">
                        Guest favourite
                      </div>
                    )}
                    <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{property.type}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-gray-900 fill-current" />
                        <span className="text-sm text-gray-900">{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{property.location}</p>
                    <p className="text-sm text-gray-600">{property.dates}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{property.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
