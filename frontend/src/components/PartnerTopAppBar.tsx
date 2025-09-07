'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Globe, Menu, ChevronDown, Building2, BarChart3, Calendar, Users, Settings, Bell, LogOut, User, HelpCircle, MessageSquare, FileText, Shield } from 'lucide-react';

interface PartnerTopAppBarProps {
  backHref?: string;
  logoHref?: string;
  showLanguageButton?: boolean;
  showMenuButton?: boolean;
  className?: string;
}

export default function PartnerTopAppBar({
  backHref = '/tabs',
  logoHref = '/tabs',
  showLanguageButton = true,
  showMenuButton = true,
  className = ''
}: PartnerTopAppBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English (Canada)');
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('language');
  const [selectedCurrency, setSelectedCurrency] = useState('Canadian dollar (CAD - $)');
  
  const menuRef = useRef<HTMLDivElement>(null);
  const languageModalRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (languageModalRef.current && !languageModalRef.contains(event.target as Node)) {
        setIsLanguageModalOpen(false);
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
      <header className={`flex items-center justify-between p-4 border-b border-gray-200 bg-white ${className}`}>
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
          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-serai-serai-red-500 rounded-full"></span>
          </button>
          
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
              
              {/* Partner Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* Partner Dashboard Section */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Partner Dashboard</p>
                  </div>
                  
                  <Link 
                    href="/partner-dashboard" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Building2 className="h-4 w-4 mr-3" />
                    Dashboard Overview
                  </Link>
                  
                  <Link 
                    href="/partner-dashboard?section=property-management" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Building2 className="h-4 w-4 mr-3" />
                    Property Management
                  </Link>
                  
                  <Link 
                    href="/partner-dashboard?section=revenue-financial" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Revenue & Financial
                  </Link>
                  
                  <Link 
                    href="/partner-dashboard?section=booking-management" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar className="h-4 w-4 mr-3" />
                    Booking Management
                  </Link>
                  
                  <Link 
                    href="/partner-dashboard?section=analytics-insights" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Analytics & Insights
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-2"></div>

                  {/* Account & Support Section */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Account & Support</p>
                  </div>
                  
                  <Link 
                    href="/account" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Account Settings
                  </Link>
                  
                  <Link 
                    href="/partner-dashboard?section=communication" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageSquare className="h-4 w-4 mr-3" />
                    Support & Help
                  </Link>
                  
                  <Link 
                    href="/partner-dashboard?section=partnership" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Partnership Details
                  </Link>
                  
                  <Link 
                    href="/help" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HelpCircle className="h-4 w-4 mr-3" />
                    Help Center
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-2"></div>

                  {/* Development Section */}
                  <Link 
                    href="/dev-settings" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Dev Settings
                  </Link>
                  
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Language Modal - Same as original */}
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
    </>
  );
}
