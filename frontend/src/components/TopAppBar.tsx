'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Globe, Menu, ChevronDown } from 'lucide-react';

interface TopAppBarProps {
  backHref?: string;
  logoHref?: string;
  showListingButton?: boolean;
  showLanguageButton?: boolean;
  showMenuButton?: boolean;
  className?: string;
}

export default function TopAppBar({
  backHref = '/',
  logoHref = '/tabs',
  showListingButton = true,
  showLanguageButton = true,
  showMenuButton = true,
  className = ''
}: TopAppBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English (Canada)');
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('language');
  const [selectedCurrency, setSelectedCurrency] = useState('Canadian dollar (CAD - $)');
  
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

  return (
    <>
      {/* Header */}
      <header className={`flex items-center justify-between p-4 border-b border-gray-200 ${className}`}>
        <div className="flex items-center">
          <Link href={backHref} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
        
        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href={logoHref}>
            <Image
              src="/images/serai-images/serai-name-black.png"
              alt="SERAI"
              width={600}
              height={200}
              className="h-40 w-auto"
            />
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {showListingButton && (
            <button 
              onClick={() => setIsListingModalOpen(true)}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              List with SERAI
            </button>
          )}
          
          {showLanguageButton && (
            <button 
              onClick={() => setIsLanguageModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Globe className="h-5 w-5 text-gray-600" />
            </button>
          )}
          
          {showMenuButton && (
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
                  <Link 
                    href="/account" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <Link 
                    href="/dev-settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => setIsMenuOpen(false)} 
                  >
                    Dev Settings
                  </Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Gift Cards
                  </a>
                  <Link 
                    href="/badges" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Clubs & Badges
                  </Link>
                  <Link 
                    href="/memberships" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Memberships
                  </Link>
                  <Link 
                    href="/partner" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Partner with SERAI
                  </Link>
                  <Link 
                    href="/help" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Help
                  </Link>
                  <Link 
                    href="/dev-settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => setIsMenuOpen(false)} 
                  >
                    Dev Settings
                  </Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          )}
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested languages</h3>
                    <div className="space-y-3">
                      {[
                        'English (Canada)',
                        'English (United States)',
                        'Français (Canada)',
                        'Español (México)',
                        'Português (Brasil)',
                        '中文 (简体)',
                        '日本語',
                        '한국어',
                        'العربية',
                        'हिन्दी'
                      ].map((language) => (
                        <button
                          key={language}
                          onClick={() => setSelectedLanguage(language)}
                          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                            selectedLanguage === language
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{language}</span>
                            {selectedLanguage === language && (
                              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Currency Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Currency</h3>
                    <div className="space-y-3">
                      {[
                        'Canadian dollar (CAD - $)',
                        'US dollar (USD - $)',
                        'Euro (EUR - €)',
                        'British pound (GBP - £)',
                        'Japanese yen (JPY - ¥)',
                        'Australian dollar (AUD - $)',
                        'Swiss franc (CHF - Fr)',
                        'Chinese yuan (CNY - ¥)',
                        'Indian rupee (INR - ₹)',
                        'Brazilian real (BRL - R$)'
                      ].map((currency) => (
                        <button
                          key={currency}
                          onClick={() => setSelectedCurrency(currency)}
                          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                            selectedCurrency === currency
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{currency}</span>
                            {selectedCurrency === currency && (
                              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setIsLanguageModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsLanguageModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}
