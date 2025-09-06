'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';
import { Settings, ToggleLeft, ToggleRight, LogOut, User, Shield, Trash2, RefreshCw } from 'lucide-react';

export default function DevSettingsPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [autoLoginEnabled, setAutoLoginEnabled] = useState(true);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Development Settings</h1>
              <p className="text-gray-600">Control development features and authentication state</p>
            </div>
          </div>
          
          {/* Warning Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Development Only</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This page is for development purposes only and will be removed in production builds.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Authentication Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                    autoLoginEnabled ? 'bg-blue-600' : 'bg-gray-200'
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
                    <span className={`font-medium ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
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
                    <span className={`font-medium ${autoLoginEnabled ? 'text-green-600' : 'text-red-600'}`}>
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
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                )}
                
                <button
                  onClick={refreshPage}
                  disabled={isRefreshing}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh Page'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Development Tools */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Development Tools</span>
            </h2>
            
            <div className="space-y-4">
              {/* Clear All Data */}
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="text-sm font-medium text-red-900 mb-2">Reset Everything</h3>
                <p className="text-sm text-red-700 mb-3">
                  Clear all localStorage, sessionStorage, and reload the page
                </p>
                <button
                  onClick={clearAllData}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>1. Disable Auto-Login:</strong> Toggle off to test unauthenticated states (requires page refresh)</p>
            <p><strong>2. Enable Auto-Login:</strong> Toggle on to test authenticated states (requires page refresh)</p>
            <p><strong>3. Logout:</strong> Use the logout button to clear authentication</p>
            <p><strong>4. Clear All Data:</strong> Reset everything to a clean state</p>
            <p><strong>5. Refresh Page:</strong> Apply auto-login setting changes</p>
            <p><strong>6. Quick Actions:</strong> Navigate between different pages easily</p>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
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
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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