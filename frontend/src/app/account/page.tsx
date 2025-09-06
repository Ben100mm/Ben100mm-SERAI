'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TopAppBar from '@/components/TopAppBar';
import TabContainer from '@/components/TabContainer';
import ProfileTab from './components/ProfileTab';
import PreferencesTab from './components/PreferencesTab';
import SecurityTab from './components/SecurityTab';
import PrivacyTab from './components/PrivacyTab';
import PaymentsPayoutsTab from './components/PaymentsPayoutsTab';

export default function AccountPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: <ProfileTab />
    },
    {
      id: 'preferences',
      label: 'Preferences',
      content: <PreferencesTab />
    },
    {
      id: 'payments',
      label: 'Payments & Payouts',
      content: <PaymentsPayoutsTab />
    },
    {
      id: 'security',
      label: 'Security',
      content: <SecurityTab />
    },
    {
      id: 'privacy',
      label: 'Privacy',
      content: <PrivacyTab />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top App Bar */}
      <TopAppBar 
        backHref="/tabs"
        logoHref="/tabs"
        showListingButton={true}
        showLanguageButton={true}
        showMenuButton={true}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account settings, preferences, and privacy options.
          </p>
        </div>

        {/* Tab Container */}
        <TabContainer 
          tabs={tabs}
          defaultTab="profile"
          className="rounded-lg shadow-sm border border-gray-200"
        />
      </main>
    </div>
  );
}
