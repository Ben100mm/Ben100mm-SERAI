'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Globe, Menu, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [country, setCountry] = useState('Canada (+1)');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English (Canada)');
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('language');
  const [selectedCurrency, setSelectedCurrency] = useState('Canadian dollar (CAD - $)');
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const languageModalRef = useRef<HTMLDivElement>(null);
  const listingModalRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (languageModalRef.current && !languageModalRef.current.contains(event.target as Node)) {
        setIsLanguageModalOpen(false);
      }
      if (listingModalRef.current && !listingModalRef.current.contains(event.target as Node)) {
        setIsListingModalOpen(false);
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">Back</span>
          </Link>
        </div>
        
        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/properties">
            <Image
              src="/images/serai-images/serai-name-black.png"
              alt="SERAI"
              width={600}
              height={180}
              className="h-28 w-auto"
              priority
            />
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsListingModalOpen(true)}
            className="text-gray-600 hover:text-gray-800"
          >
            List with SERAI
          </button>
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
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Memberships
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Gift cards
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Refer a friend
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  SERAI Partners
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Help Centre
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
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
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

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                      {/* Title */}
          <div className="mb-8">
            <div className="text-center mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Log in or sign up
              </h1>
            </div>
            <div className="text-left">
              <p className="text-gray-600">
                Welcome to <span className="font-semibold">SERAI</span>
              </p>
            </div>
          </div>

            {/* Phone Number Section */}
            <div className="space-y-4">
              {/* Country/Region Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country/Region
                </label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="Canada (+1)">Canada (+1)</option>
                    <option value="United States (+1)">United States (+1)</option>
                    <option value="United Kingdom (+44)">United Kingdom (+44)</option>
                    <option value="France (+33)">France (+33)</option>
                    <option value="Germany (+49)">Germany (+49)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
              </div>

              {/* Privacy Policy */}
              <p className="text-xs text-gray-500">
                We'll call or text you to confirm your number. Standard message and data rates apply.{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>

              {/* Continue Button */}
              <button className="w-full bg-gradient-to-r from-red-800 to-red-900 text-white font-semibold py-3 rounded-lg hover:from-red-900 hover:to-red-950 transition-all duration-300 hover:scale-105 shadow-lg">
                Continue
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or Continue with</span>
              </div>
            </div>

            {/* Alternative Login Options */}
            <div className="flex justify-center space-x-4">
              {/* Google */}
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>

              {/* Apple */}
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>

              {/* Email */}
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200">
                <svg className="h-6 w-6" fill="none" stroke="#374151" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>

              {/* Facebook */}
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200">
                <svg className="h-6 w-6" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              {/* X (Twitter) */}
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200">
                <svg className="h-6 w-6" fill="#000000" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Listing Modal */}
      {isListingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={listingModalRef}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">What would you like to list?</h2>
              <button
                onClick={() => setIsListingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {/* Home */}
              <button className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 22V12H15V22" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-900">Home</span>
                </div>
              </button>

              {/* Experience */}
              <button className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                      <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.5 4.21L12 6.81L16.5 4.21" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.5 19.79V14.6L3 12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12L16.5 14.6V19.79" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22.08V12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-900">Experience</span>
                </div>
              </button>

              {/* Service */}
              <button className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-900">Service</span>
                </div>
              </button>
            </div>

            {/* Next Button */}
            <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
