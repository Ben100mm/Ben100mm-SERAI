'use client';

import { useState } from 'react';
import { Globe, DollarSign, Bell, Moon, Sun, Languages } from 'lucide-react';

export default function PreferencesTab() {
  const [preferences, setPreferences] = useState({
    language: 'English (Canada)',
    currency: 'Canadian dollar (CAD - $)',
    timezone: 'America/Toronto',
    notifications: {
      // Basic notification channels
      email: true,
      sms: false,
      push: true,
      
      // Hosting notifications
      hostingInsights: true,
      hostingRewards: true,
      hostingUpdates: true,
      
      // Travel notifications
      travelTips: true,
      travelOffers: false,
      seraiUpdates: true,
      
      // Account notifications
      accountActivity: true,
      accountPolicies: true,
      reminders: true,
      
      // Messaging notifications
      guestMessages: true,
      hostMessages: true,
      
      // Marketing notifications
      marketing: false,
      bookingUpdates: true,
      priceAlerts: true,
      newOffers: false
    },
    theme: 'light',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour'
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const languages = [
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
  ];

  const currencies = [
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
  ];

  const timezones = [
    'America/Toronto',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preferences</h2>

      <div className="space-y-6">
        {/* Language & Region */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Language & Region
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent bg-white text-gray-900"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent bg-white text-gray-900"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Currency */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Currency
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Currency
            </label>
            <select
              value={preferences.currency}
              onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent bg-white text-gray-900"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </h3>
          
          {/* Notification Channels */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Channels</h4>
            <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-500">Receive updates via email</div>
              </div>
              <button
                onClick={() => handleNotificationChange('email', !preferences.notifications.email)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.notifications.email ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">SMS Notifications</div>
                <div className="text-sm text-gray-500">Receive updates via text message</div>
              </div>
              <button
                onClick={() => handleNotificationChange('sms', !preferences.notifications.sms)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.notifications.sms ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Push Notifications</div>
                <div className="text-sm text-gray-500">Receive push notifications on your device</div>
              </div>
              <button
                onClick={() => handleNotificationChange('push', !preferences.notifications.push)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.notifications.push ? 'bg-serai-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.notifications.push ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Hosting Notifications */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Hosting Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Hosting Insights</div>
                  <div className="text-sm text-gray-500">Performance analytics and hosting tips</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('hostingInsights', !preferences.notifications.hostingInsights)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.hostingInsights ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.hostingInsights ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Hosting Rewards</div>
                  <div className="text-sm text-gray-500">Reward program updates and achievements</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('hostingRewards', !preferences.notifications.hostingRewards)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.hostingRewards ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.hostingRewards ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Hosting Updates</div>
                  <div className="text-sm text-gray-500">Platform updates and hosting policy changes</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('hostingUpdates', !preferences.notifications.hostingUpdates)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.hostingUpdates ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.hostingUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Travel Notifications */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Travel Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Travel Tips and Offers</div>
                  <div className="text-sm text-gray-500">Travel recommendations and special offers</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('travelTips', !preferences.notifications.travelTips)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.travelTips ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.travelTips ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Travel Offers</div>
                  <div className="text-sm text-gray-500">Exclusive deals and promotional offers</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('travelOffers', !preferences.notifications.travelOffers)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.travelOffers ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.travelOffers ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">SERAI Updates</div>
                  <div className="text-sm text-gray-500">Platform updates and new features</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('seraiUpdates', !preferences.notifications.seraiUpdates)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.seraiUpdates ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.seraiUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Account Notifications */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Account Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Account Activity</div>
                  <div className="text-sm text-gray-500">Login attempts and security alerts</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('accountActivity', !preferences.notifications.accountActivity)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.accountActivity ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.accountActivity ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Account Policies</div>
                  <div className="text-sm text-gray-500">Terms of service and policy updates</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('accountPolicies', !preferences.notifications.accountPolicies)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.accountPolicies ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.accountPolicies ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Reminders</div>
                  <div className="text-sm text-gray-500">Booking reminders and check-in notifications</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('reminders', !preferences.notifications.reminders)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.reminders ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.reminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Messaging Notifications */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Messaging Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Guest Messages</div>
                  <div className="text-sm text-gray-500">Messages from guests about bookings</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('guestMessages', !preferences.notifications.guestMessages)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.guestMessages ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.guestMessages ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Host Messages</div>
                  <div className="text-sm text-gray-500">Messages from hosts about your stays</div>
                </div>
                <button
                  onClick={() => handleNotificationChange('hostMessages', !preferences.notifications.hostMessages)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.hostMessages ? 'bg-serai-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.hostMessages ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Booking Notifications */}
          <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Booking Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Booking Updates</div>
                    <div className="text-sm text-gray-500">Updates about your reservations</div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('bookingUpdates', !preferences.notifications.bookingUpdates)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.notifications.bookingUpdates ? 'bg-serai-red-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.notifications.bookingUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Price Alerts</div>
                    <div className="text-sm text-gray-500">Alerts when prices change for your saved properties</div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('priceAlerts', !preferences.notifications.priceAlerts)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.notifications.priceAlerts ? 'bg-serai-red-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.notifications.priceAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">New Offers</div>
                    <div className="text-sm text-gray-500">Special offers and promotions</div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('newOffers', !preferences.notifications.newOffers)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.notifications.newOffers ? 'bg-serai-red-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.notifications.newOffers ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Marketing Communications</div>
                    <div className="text-sm text-gray-500">Newsletters and promotional content</div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('marketing', !preferences.notifications.marketing)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.notifications.marketing ? 'bg-serai-red-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Display Preferences */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Sun className="h-5 w-5 mr-2" />
            Display Preferences
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => handlePreferenceChange('theme', 'light')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                    preferences.theme === 'light'
                      ? 'border-serai-red-600 bg-serai-red-50 text-serai-red-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => handlePreferenceChange('theme', 'dark')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                    preferences.theme === 'dark'
                      ? 'border-serai-red-600 bg-serai-red-50 text-serai-red-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  value={preferences.dateFormat}
                  onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Format
                </label>
                <select
                  value={preferences.timeFormat}
                  onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="12-hour">12-hour (AM/PM)</option>
                  <option value="24-hour">24-hour</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
