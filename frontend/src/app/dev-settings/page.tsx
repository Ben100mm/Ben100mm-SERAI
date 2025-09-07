'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';
import { Settings, ToggleLeft, ToggleRight, LogOut, User, Shield, Trash2, RefreshCw, Building2, Building } from 'lucide-react';

export default function DevSettingsPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [autoLoginEnabled, setAutoLoginEnabled] = useState(true);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPartnerDashboard, setShowPartnerDashboard] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSetting = localStorage.getItem('dev-auto-login-enabled');
    if (savedSetting !== null) {
      setAutoLoginEnabled(savedSetting === 'true');
    } else {
      // Default to enabled if no setting exists
      setAutoLoginEnabled(true);
      localStorage.setItem('dev-auto-login-enabled', 'true');
    }

    // Load partner dashboard setting
    const partnerDashboardSetting = localStorage.getItem('dev-show-partner-dashboard');
    if (partnerDashboardSetting !== null) {
      setShowPartnerDashboard(partnerDashboardSetting === 'true');
    }
  }, []);

  // Save setting to localStorage
  const handleToggleAutoLogin = (enabled: boolean) => {
    setAutoLoginEnabled(enabled);
    localStorage.setItem('dev-auto-login-enabled', enabled.toString());
    
    // If disabling auto-login and user is authenticated, show logout option
    if (!enabled && isAuthenticated) {
      setShowConfirmLogout(true);
    }
  };

  // Handle partner dashboard toggle
  const handleTogglePartnerDashboard = (enabled: boolean) => {
    setShowPartnerDashboard(enabled);
    localStorage.setItem('dev-show-partner-dashboard', enabled.toString());
  };

  const handleLogout = async () => {
    await logout();
    setShowConfirmLogout(false);
    router.push('/');
  };

  const clearAllData = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const refreshPage = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top App Bar */}
      <TopAppBar 
        backHref="/tabs"
        logoHref="/tabs"
        showListingButton={false}
        showLanguageButton={false}
        showMenuButton={false}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-serai-navy-100 rounded-lg">
              <Settings className="h-6 w-6 text-serai-navy-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Development Settings</h1>
              <p className="text-gray-600">Control development features and authentication state</p>
            </div>
          </div>
          
          {/* Warning Banner */}
          <div className="bg-serai-cream-50 border border-serai-cream-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-serai-cream-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-serai-cream-800">Development Only</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This page is for development purposes only and will be removed in production builds.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Authentication Settings */}
          <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Authentication</span>
            </h2>
            
            {/* Auto-Login Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Auto-Login in Development</h3>
                  <p className="text-sm text-gray-500">
                    Automatically log in with a mock user when the app loads
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Current setting: {autoLoginEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleAutoLogin(!autoLoginEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoLoginEnabled ? 'bg-serai-navy-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoLoginEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Current Auth Status */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Current Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Authenticated:</span>
                    <span className={`font-medium ${isAuthenticated ? 'text-serai-forest-600' : 'text-serai-red-600'}`}>
                      {isAuthenticated ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {user && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">User:</span>
                      <span className="font-medium text-gray-900">{user.email}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Auto-login:</span>
                    <span className={`font-medium ${autoLoginEnabled ? 'text-serai-forest-600' : 'text-serai-red-600'}`}>
                      {autoLoginEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {isAuthenticated && (
                  <button
                    onClick={() => setShowConfirmLogout(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-serai-red-600 text-white rounded-lg hover:bg-serai-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                )}
                
                <button
                  onClick={refreshPage}
                  disabled={isRefreshing}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-serai-navy-600 text-white rounded-lg hover:bg-serai-navy-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh Page'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Development Tools */}
          <div className="bg-serai-cream-50 rounded-lg shadow-sm border border-serai-cream-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Development Tools</span>
            </h2>
            
            <div className="space-y-4">
              {/* Partner Dashboard Toggle */}
              <div className="flex items-center justify-between p-4 bg-serai-forest-50 rounded-lg border border-serai-forest-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-serai-forest-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-serai-forest-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-serai-forest-900">Show Partner Dashboard</h3>
                    <p className="text-sm text-green-700">
                      Toggle visibility of partner dashboard features
                    </p>
                    <p className="text-xs text-serai-forest-600 mt-1">
                      Current setting: {showPartnerDashboard ? 'Visible' : 'Hidden'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleTogglePartnerDashboard(!showPartnerDashboard)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showPartnerDashboard ? 'bg-serai-forest-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showPartnerDashboard ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {/* Clear All Data */}
              <div className="p-4 bg-serai-red-50 rounded-lg border border-serai-red-200">
                <h3 className="text-sm font-medium text-serai-red-900 mb-2">Reset Everything</h3>
                <p className="text-sm text-serai-red-700 mb-3">
                  Clear all localStorage, sessionStorage, and reload the page
                </p>
                <button
                  onClick={clearAllData}
                  className="flex items-center space-x-2 px-3 py-2 bg-serai-red-600 text-white rounded-lg hover:bg-serai-red-700 transition-colors text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear All Data</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => router.push('/auth')}
                    className="text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    Go to Auth Page
                  </button>
                  <button
                    onClick={() => router.push('/tabs')}
                    className="text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    Go to Main App
                  </button>
                  <button
                    onClick={() => router.push('/help')}
                    className="text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    Go to Help Page
                  </button>
                  <button
                    onClick={() => router.push('/hosts-dashboard')}
                    className="text-left px-3 py-2 bg-serai-navy-100 hover:bg-serai-navy-200 rounded-lg text-sm transition-colors flex items-center space-x-2"
                  >
                    <Building className="h-4 w-4" />
                    <span>Go to Hosts Dashboard</span>
                  </button>
                  <button
                    onClick={() => router.push('/partner-dashboard')}
                    className="text-left px-3 py-2 bg-serai-forest-100 hover:bg-serai-forest-200 rounded-lg text-sm transition-colors flex items-center space-x-2"
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Go to Partner Dashboard</span>
                  </button>
                  <button
                    onClick={() => router.push('/serai-management-dashboard')}
                    className="text-left px-3 py-2 bg-serai-navy-100 hover:bg-serai-navy-200 rounded-lg text-sm transition-colors flex items-center space-x-2"
                  >
                    <Building className="h-4 w-4" />
                    <span>Go to Serai Management Dashboard</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-serai-navy-50 border border-serai-navy-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-serai-navy-900 mb-3">How to Use</h3>
          <div className="space-y-2 text-sm text-serai-navy-800">
            <p><strong>1. Disable Auto-Login:</strong> Toggle off to test unauthenticated states (requires page refresh)</p>
            <p><strong>2. Enable Auto-Login:</strong> Toggle on to test authenticated states (requires page refresh)</p>
            <p><strong>3. Partner Dashboard:</strong> Toggle to show/hide partner dashboard features in the app</p>
            <p><strong>4. Logout:</strong> Use the logout button to clear authentication</p>
            <p><strong>5. Clear All Data:</strong> Reset everything to a clean state</p>
            <p><strong>6. Refresh Page:</strong> Apply auto-login setting changes</p>
            <p><strong>7. Quick Actions:</strong> Navigate between different pages easily, including the Partner Dashboard and Serai Management Dashboard</p>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-serai-cream-50 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 border border-serai-cream-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? This will clear your authentication state.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-serai-red-600 text-white rounded-lg hover:bg-serai-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}