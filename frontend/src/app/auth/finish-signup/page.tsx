'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';

export default function FinishSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [marketingOptOut, setMarketingOptOut] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.email) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Validate age (must be at least 18)
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (age < 18 || (age === 18 && monthDiff < 0)) {
        setError('You must be at least 18 years old to sign up');
        setIsLoading(false);
        return;
      }

      // Simulate signup process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Redirect to hosts dashboard
      router.push('/hosts-dashboard');
    } catch (error) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
                  Finish signing up
                </h1>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Legal Name Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Legal name</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="First name on ID"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Last name on ID"
                      required
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Make sure this matches the name on your government-issued ID. If you go by another name, you can add a{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                    preferred first name
                  </a>.
                </p>
              </div>

              {/* Date of Birth Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Date of birth</h3>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  To sign up, you need to be at least 18. Your birthday won't be shared with other people who use SERAI.
                </p>
              </div>

              {/* Contact Info Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact info</h3>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Email"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  We'll email you trip confirmations and receipts.
                </p>
              </div>

              {/* Terms and Policies */}
              <div className="text-sm text-gray-600">
                <p>
                  By selecting Agree and continue, I agree to SERAI's{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                    Terms of Service
                  </a>
                  ,{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                    Payments Terms of Service
                  </a>
                  , and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                    Nondiscrimination Policy
                  </a>{' '}
                  and acknowledge the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                    Privacy Policy
                  </a>.
                </p>
              </div>

              {/* Agree and Continue Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? 'Creating account...' : 'Agree and continue'}
              </button>

              {/* Marketing Preferences */}
              <div className="text-sm text-gray-600">
                <p className="mb-3">
                  SERAI will send you members-only deals, inspiration, marketing emails, and push notifications. You can opt out of receiving these at any time in your account settings or directly from the marketing notification.
                </p>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={marketingOptOut}
                    onChange={(e) => setMarketingOptOut(e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span>I don't want to receive marketing messages from SERAI.</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
