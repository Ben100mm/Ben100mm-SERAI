'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';

export default function AuthPage() {
  const { login, socialLogin, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/tabs');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // For demo purposes, we'll simulate phone number verification
      // In a real app, you'd send an OTP to the phone number
      const result = await login('demo@serai.com', 'demo-password');
      
      if (result?.success) {
        router.push('/tabs');
      } else {
        setError(result?.message || 'Phone verification failed');
      }
    } catch (error) {
      setError('Phone verification failed');
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple' | 'email' | 'twitter') => {
    setError('');
    
    // Handle email and twitter as regular login for demo purposes
    if (provider === 'email' || provider === 'twitter') {
      const result = await login(`${provider}@example.com`, 'demo-password');
      if (!result.success) {
        setError(result.message || 'Login failed');
      }
      return;
    }
    
    // For demo purposes, we'll simulate social login
    // In a real app, you'd integrate with actual OAuth providers
    const mockSocialData = {
      provider: provider as 'google' | 'facebook' | 'apple',
      providerId: `mock_${provider}_${Date.now()}`,
      email: `${provider}@example.com`,
      firstName: 'Social',
      lastName: 'User',
      avatar: `https://via.placeholder.com/150/000000/FFFFFF/?text=${provider.charAt(0).toUpperCase()}`
    };

    const result = await socialLogin(mockSocialData);
    if (!result.success) {
      setError(result.message || 'Social login failed');
    }
  };

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
                  Welcome to SERAI
              </p>
            </div>
          </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Phone Number Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Country/Region Field */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country/Region
                </label>
                <div className="relative">
                  <select
                    id="country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                    defaultValue="US"
                  >
                    <option value="US">United States (+1)</option>
                    <option value="CA">Canada (+1)</option>
                    <option value="GB">United Kingdom (+44)</option>
                    <option value="AU">Australia (+61)</option>
                    <option value="DE">Germany (+49)</option>
                    <option value="FR">France (+33)</option>
                    <option value="IN">India (+91)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                                  <input
                    type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                    placeholder="Enter your phone number"
                  required
                  />
              </div>

              {/* Privacy Policy Text */}
              <p className="text-xs text-gray-500">
                We'll call or text you to confirm your number. Standard message and data rates apply.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                  Privacy Policy
                </a>
              </p>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Please wait...' : 'Continue'}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or Continue with</span>
              </div>
            </div>

              <div className="mt-6 flex justify-center space-x-4">
              {/* Google */}
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-12 h-12 rounded-full border border-gray-300 shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>

              {/* Apple */}
                <button
                  onClick={() => handleSocialLogin('apple')}
                  className="w-12 h-12 rounded-full border border-gray-300 shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center"
                >
                  <svg className="w-6 h-6" fill="#000000" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>

              {/* Email */}
                <button
                  onClick={() => handleSocialLogin('email')}
                  className="w-12 h-12 rounded-full border border-gray-300 shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center"
                >
                  <svg className="w-6 h-6" fill="none" stroke="#6B7280" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>

              {/* Facebook */}
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-12 h-12 rounded-full border border-gray-300 shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center"
                >
                  <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              {/* X (Twitter) */}
                <button
                  onClick={() => handleSocialLogin('twitter')}
                  className="w-12 h-12 rounded-full border border-gray-300 shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center"
                >
                  <svg className="w-6 h-6" fill="#000000" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}