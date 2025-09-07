'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';

export default function ConfirmNumberPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const phone = searchParams.get('phone');
    if (phone) {
      setPhoneNumber(phone);
    } else {
      // If no phone number, redirect back to login
      router.push('/auth/login-signup');
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate code verification
      if (code.length !== 6) {
        setError('Please enter the 6-digit code');
        setIsLoading(false);
        return;
      }

      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user is new (simulate by checking if code starts with '1')
      const isNewUser = code.startsWith('1');
      
      if (isNewUser) {
        // New user - redirect to finish signup
        router.push('/auth/finish-signup');
      } else {
        // Existing user - redirect to hosts dashboard
        router.push('/hosts-dashboard');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    setError('');
  };

  const handleChooseDifferentOption = () => {
    router.push('/auth/more-options?phone=' + encodeURIComponent(phoneNumber));
  };

  const formatPhoneNumber = (phone: string) => {
    // Format phone number for display
    if (phone.length === 11 && phone.startsWith('1')) {
      return `+1 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
    }
    return phone;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top App Bar */}
      <TopAppBar 
        backHref="/auth/login-signup"
        logoHref="/tabs"
        showListingButton={false}
        showLanguageButton={true}
        showMenuButton={true}
      />

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 pt-24">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* Title */}
            <div className="mb-8">
              <div className="text-center mb-2">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Confirm your number
                </h1>
              </div>
              <div className="text-left">
                <p className="text-gray-500">
                  Enter the code we sent over SMS to {formatPhoneNumber(phoneNumber)}:
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Code Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Code Input Field */}
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={handleCodeChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-2xl font-mono tracking-widest bg-white"
                  placeholder="_ _ _ _ _ _"
                  maxLength={6}
                  required
                />
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={isLoading || code.length !== 6}
                className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ 
                  backgroundColor: isLoading || code.length !== 6 ? '#9ca3af' : '#660f0f' 
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && code.length === 6) {
                    e.target.style.backgroundColor = '#550c0c';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && code.length === 6) {
                    e.target.style.backgroundColor = '#660f0f';
                  }
                }}
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </button>
            </form>

            {/* Choose Different Option */}
            <div className="mt-6 text-center">
              <button
                onClick={handleChooseDifferentOption}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Choose a different option
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
