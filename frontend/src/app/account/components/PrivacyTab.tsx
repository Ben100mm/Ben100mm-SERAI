'use client';

import { useState } from 'react';
import { Shield, Eye, EyeOff, Download, Trash2, Mail, Users, Database, Lock } from 'lucide-react';

export default function PrivacyTab() {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    dataSharing: {
      analytics: true,
      marketing: false,
      thirdParty: false,
      locationTracking: true,
      personalizedAds: false
    },
    dataRetention: {
      accountData: 'indefinite',
      bookingHistory: '7-years',
      searchHistory: '2-years',
      cookies: '1-year'
    },
    listings: {
      readReceipts: true,
      includeInSearchEngines: true
    },
    reviews: {
      showHomeCity: true,
      showTripType: true,
      showLengthOfStay: true,
      showBookedServices: false
    }
  });

  const handleDataSharingChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      dataSharing: {
        ...prev.dataSharing,
        [key]: value
      }
    }));
  };

  const handleListingsChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      listings: {
        ...prev.listings,
        [key]: value
      }
    }));
  };

  const handleReviewsChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        [key]: value
      }
    }));
  };

  const handleSettingChange = (key: string, value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataRequest = (type: 'download' | 'delete') => {
    if (type === 'download') {
      // Trigger data download
      console.log('Downloading user data...');
      alert('Your data download has been initiated. You will receive an email when ready.');
    } else {
      // Trigger account deletion
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        console.log('Deleting user account...');
        alert('Account deletion has been initiated. You will receive a confirmation email.');
      }
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>

      <div className="space-y-6">
        {/* Profile Visibility */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Profile Visibility
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Who can see your profile information
            </label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent bg-white text-gray-900"
            >
              <option value="private">Private - Only you can see your profile</option>
              <option value="friends">Friends - Only your connections can see your profile</option>
              <option value="public">Public - Anyone can see your profile</option>
            </select>
            <p className="mt-2 text-sm text-gray-500">
              This setting controls who can view your basic profile information and booking history.
            </p>
          </div>
        </div>

        {/* Data Sharing Preferences */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Data Sharing Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Analytics & Performance</div>
                <div className="text-sm text-gray-500">Help us improve our service by sharing anonymous usage data</div>
              </div>
              <button
                onClick={() => handleDataSharingChange('analytics', !privacySettings.dataSharing.analytics)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.dataSharing.analytics ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.dataSharing.analytics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Marketing Communications</div>
                <div className="text-sm text-gray-500">Receive promotional emails and offers</div>
              </div>
              <button
                onClick={() => handleDataSharingChange('marketing', !privacySettings.dataSharing.marketing)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.dataSharing.marketing ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.dataSharing.marketing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Third-Party Partners</div>
                <div className="text-sm text-gray-500">Share data with trusted partners for enhanced services</div>
              </div>
              <button
                onClick={() => handleDataSharingChange('thirdParty', !privacySettings.dataSharing.thirdParty)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.dataSharing.thirdParty ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.dataSharing.thirdParty ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Location Tracking</div>
                <div className="text-sm text-gray-500">Allow location tracking for personalized recommendations</div>
              </div>
              <button
                onClick={() => handleDataSharingChange('locationTracking', !privacySettings.dataSharing.locationTracking)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.dataSharing.locationTracking ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.dataSharing.locationTracking ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Personalized Advertising</div>
                <div className="text-sm text-gray-500">Show personalized ads based on your preferences</div>
              </div>
              <button
                onClick={() => handleDataSharingChange('personalizedAds', !privacySettings.dataSharing.personalizedAds)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.dataSharing.personalizedAds ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.dataSharing.personalizedAds ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Listings Privacy */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Listings Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Read Receipts</div>
                <div className="text-sm text-gray-500">Let hosts know when you've read their messages</div>
              </div>
              <button
                onClick={() => handleListingsChange('readReceipts', !privacySettings.listings.readReceipts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.listings.readReceipts ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.listings.readReceipts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Include in Search Engines</div>
                <div className="text-sm text-gray-500">Allow search engines to index your listings</div>
              </div>
              <button
                onClick={() => handleListingsChange('includeInSearchEngines', !privacySettings.listings.includeInSearchEngines)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.listings.includeInSearchEngines ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.listings.includeInSearchEngines ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Privacy */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Reviews Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Show Home City and Country</div>
                <div className="text-sm text-gray-500">Display your home location in reviews</div>
              </div>
              <button
                onClick={() => handleReviewsChange('showHomeCity', !privacySettings.reviews.showHomeCity)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.reviews.showHomeCity ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.reviews.showHomeCity ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Show Trip Type</div>
                <div className="text-sm text-gray-500">Display whether it was business or leisure travel</div>
              </div>
              <button
                onClick={() => handleReviewsChange('showTripType', !privacySettings.reviews.showTripType)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.reviews.showTripType ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.reviews.showTripType ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Show Length of Stay</div>
                <div className="text-sm text-gray-500">Display how many nights you stayed</div>
              </div>
              <button
                onClick={() => handleReviewsChange('showLengthOfStay', !privacySettings.reviews.showLengthOfStay)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.reviews.showLengthOfStay ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.reviews.showLengthOfStay ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Show Booked Services</div>
                <div className="text-sm text-gray-500">Display which services you booked during your stay</div>
              </div>
              <button
                onClick={() => handleReviewsChange('showBookedServices', !privacySettings.reviews.showBookedServices)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.reviews.showBookedServices ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.reviews.showBookedServices ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Retention Settings */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Data Retention Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Data Retention
              </label>
              <select
                value={privacySettings.dataRetention.accountData}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  dataRetention: { ...prev.dataRetention, accountData: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="indefinite">Keep indefinitely</option>
                <option value="5-years">Delete after 5 years of inactivity</option>
                <option value="3-years">Delete after 3 years of inactivity</option>
                <option value="1-year">Delete after 1 year of inactivity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking History Retention
              </label>
              <select
                value={privacySettings.dataRetention.bookingHistory}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  dataRetention: { ...prev.dataRetention, bookingHistory: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="7-years">Keep for 7 years</option>
                <option value="5-years">Keep for 5 years</option>
                <option value="3-years">Keep for 3 years</option>
                <option value="1-year">Keep for 1 year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search History Retention
              </label>
              <select
                value={privacySettings.dataRetention.searchHistory}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  dataRetention: { ...prev.dataRetention, searchHistory: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="2-years">Keep for 2 years</option>
                <option value="1-year">Keep for 1 year</option>
                <option value="6-months">Keep for 6 months</option>
                <option value="3-months">Keep for 3 months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Data Management
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-serai-cream-50 rounded-lg border border-serai-cream-200">
              <div className="flex items-center">
                <Download className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Download Your Data</div>
                  <div className="text-sm text-gray-500">Get a copy of all your personal data</div>
                </div>
              </div>
              <button
                onClick={() => handleDataRequest('download')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Request Download
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-serai-cream-50 rounded-lg border border-serai-cream-200">
              <div className="flex items-center">
                <Trash2 className="h-5 w-5 text-serai-red-400 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Delete Account</div>
                  <div className="text-sm text-gray-500">Permanently delete your account and all data</div>
                </div>
              </div>
              <button
                onClick={() => handleDataRequest('delete')}
                className="px-4 py-2 text-sm font-medium text-serai-red-600 bg-white border border-serai-red-300 rounded-lg hover:bg-serai-red-50"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Policy & Terms */}
        <div className="bg-serai-navy-50 border border-serai-navy-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-serai-navy-900 mb-3">Privacy Information</h3>
          <div className="space-y-2 text-sm text-serai-navy-800">
            <p>
              We are committed to protecting your privacy and personal data. Your information is encrypted and stored securely.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-serai-navy-600 hover:text-blue-700 underline">
                Privacy Policy
              </a>
              <a href="#" className="text-serai-navy-600 hover:text-blue-700 underline">
                Terms of Service
              </a>
              <a href="#" className="text-serai-navy-600 hover:text-blue-700 underline">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
