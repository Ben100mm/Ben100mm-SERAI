'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MessageCircle, Phone, Wifi } from 'lucide-react';
import TopAppBar from '@/components/TopAppBar';

export default function MoreOptionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOption, setSelectedOption] = useState('sms');
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

  const verificationOptions = [
    {
      id: 'sms',
      title: 'Text message (SMS)',
      description: "We'll text you a code.",
      icon: <MessageCircle className="h-6 w-6 text-gray-600" />
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      description: "We'll send a code over wifi.",
      icon: <Wifi className="h-6 w-6 text-gray-600" />
    },
    {
      id: 'call',
      title: 'Phone call',
      description: "We'll call you with a code.",
      icon: <Phone className="h-6 w-6 text-gray-600" />
    }
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleResendCode = () => {
    // Redirect back to confirm number page with selected option
    router.push(`/auth/confirm-number?phone=${encodeURIComponent(phoneNumber)}&method=${selectedOption}`);
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
        backHref="/auth/confirm-number"
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
                  More options
                </h1>
              </div>
              <div className="text-left">
                <p className="text-gray-500 mb-1">
                  Choose another way to get a verification code at {formatPhoneNumber(phoneNumber)}
                </p>
                <p className="text-sm text-gray-400">
                  Make sure your notifications are turned on.
                </p>
              </div>
            </div>

            {/* Verification Options */}
            <div className="space-y-4 mb-8">
              {verificationOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOption === option.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedOption === option.id
                          ? 'border-gray-900 bg-gray-900'
                          : 'border-gray-300'
                      }`}>
                        {selectedOption === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resend Code Button */}
            <button
              onClick={handleResendCode}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Resend code
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
