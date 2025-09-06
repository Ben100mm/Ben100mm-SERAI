'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';
import { 
  Crown, 
  Star, 
  Zap, 
  Check, 
  X, 
  ArrowRight, 
  Gift, 
  CreditCard, 
  Clock, 
  Percent,
  Sparkles,
  Shield
} from 'lucide-react';

interface MembershipFeature {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface MembershipTier {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  period: string;
  color: string;
  icon: React.ReactNode;
  features: {
    discountPercent: number;
    validity: string;
    cashback: number;
    usage: string;
    exclusiveDeals: boolean;
    additionalFeatures: MembershipFeature[];
  };
  isPopular?: boolean;
  isCurrent?: boolean;
}

export default function MembershipsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<string>('voyager');

  const membershipTiers: MembershipTier[] = [
    {
      id: 'select',
      name: 'SERAI Select',
      subtitle: 'Essential benefits for every traveler',
      price: 0,
      period: 'month',
      color: 'gray',
      icon: <Shield className="h-8 w-8" />,
      features: {
        discountPercent: 5,
        validity: '6 months',
        cashback: 2,
        usage: 'Basic bookings',
        exclusiveDeals: false,
        additionalFeatures: [
          {
            name: 'Basic Support',
            icon: <Check className="h-4 w-4" />,
            description: 'Email support within 24 hours'
          },
          {
            name: 'Standard Cancellation',
            icon: <Check className="h-4 w-4" />,
            description: 'Free cancellation up to 24 hours'
          },
          {
            name: 'Mobile App Access',
            icon: <Check className="h-4 w-4" />,
            description: 'Full mobile app functionality'
          }
        ]
      },
      isCurrent: true
    },
    {
      id: 'voyager',
      name: 'SERAI Voyager',
      subtitle: 'Enhanced experience for frequent travelers',
      price: 29,
      period: 'month',
      color: 'blue',
      icon: <Star className="h-8 w-8" />,
      features: {
        discountPercent: 15,
        validity: '6 months',
        cashback: 5,
        usage: 'All bookings',
        exclusiveDeals: true,
        additionalFeatures: [
          {
            name: 'Priority Support',
            icon: <Check className="h-4 w-4" />,
            description: '24/7 phone and chat support'
          },
          {
            name: 'Flexible Cancellation',
            icon: <Check className="h-4 w-4" />,
            description: 'Free cancellation up to 48 hours'
          },
          {
            name: 'Early Access',
            icon: <Check className="h-4 w-4" />,
            description: 'Early access to new properties'
          },
          {
            name: 'Complimentary Upgrades',
            icon: <Check className="h-4 w-4" />,
            description: 'Room upgrades when available'
          }
        ]
      },
      isPopular: true
    },
    {
      id: 'prestige',
      name: 'SERAI Prestige',
      subtitle: 'Ultimate luxury and exclusivity',
      price: 99,
      period: 'month',
      color: 'purple',
      icon: <Crown className="h-8 w-8" />,
      features: {
        discountPercent: 25,
        validity: '12 months',
        cashback: 10,
        usage: 'Unlimited',
        exclusiveDeals: true,
        additionalFeatures: [
          {
            name: 'Concierge Service',
            icon: <Check className="h-4 w-4" />,
            description: 'Personal concierge for all bookings'
          },
          {
            name: 'Free Cancellation',
            icon: <Check className="h-4 w-4" />,
            description: 'Free cancellation up to 72 hours'
          },
          {
            name: 'VIP Access',
            icon: <Check className="h-4 w-4" />,
            description: 'Exclusive access to luxury properties'
          },
          {
            name: 'Complimentary Services',
            icon: <Check className="h-4 w-4" />,
            description: 'Airport transfers and welcome amenities'
          },
          {
            name: 'Dedicated Account Manager',
            icon: <Check className="h-4 w-4" />,
            description: 'Personal account manager'
          }
        ]
      }
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'gray':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-900',
          accent: 'text-gray-600',
          button: 'bg-gray-900 hover:bg-gray-800 text-white'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-900',
          accent: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-900',
          accent: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700 text-white'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-900',
          accent: 'text-gray-600',
          button: 'bg-gray-900 hover:bg-gray-800 text-white'
        };
    }
  };

  const handleUpgrade = (tierId: string) => {
    // Handle membership upgrade logic
    console.log(`Upgrading to ${tierId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading memberships...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopAppBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SERAI Memberships</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect membership tier for your travel needs. Unlock exclusive benefits, 
            savings, and premium experiences with SERAI.
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {membershipTiers.map((tier) => {
            const colors = getColorClasses(tier.color);
            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-8 border-2 transition-all duration-200 hover:shadow-lg ${
                  tier.isPopular 
                    ? 'border-red-500 shadow-lg scale-105' 
                    : colors.border
                } ${colors.bg}`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                {tier.isCurrent && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Current Plan
                    </span>
                  </div>
                )}

                {/* Tier Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 rounded-full mb-4 ${colors.bg}`}>
                    <div className={colors.accent}>
                      {tier.icon}
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.subtitle}</p>
                  
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${colors.text}`}>
                      ${tier.price}
                    </span>
                    <span className="text-gray-600 ml-1">/{tier.period}</span>
                    {tier.price === 0 && (
                      <div className="text-sm text-gray-500 mt-1">Free forever</div>
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center">
                      <Percent className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium">Discount</span>
                    </div>
                    <span className={`font-bold ${colors.accent}`}>{tier.features.discountPercent}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium">Validity</span>
                    </div>
                    <span className="font-medium">{tier.features.validity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium">Cashback</span>
                    </div>
                    <span className={`font-bold ${colors.accent}`}>{tier.features.cashback}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium">Usage</span>
                    </div>
                    <span className="font-medium">{tier.features.usage}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <Gift className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium">Exclusive Deals</span>
                    </div>
                    {tier.features.exclusiveDeals ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Additional Features */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Additional Benefits</h4>
                  <div className="space-y-3">
                    {tier.features.additionalFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="text-green-500 mr-3 mt-0.5">
                          {feature.icon}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-gray-900">{feature.name}</div>
                          <div className="text-xs text-gray-600">{feature.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleUpgrade(tier.id)}
                  disabled={tier.isCurrent}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    tier.isCurrent
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : tier.isPopular
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : colors.button
                  }`}
                >
                  {tier.isCurrent ? 'Current Plan' : `Upgrade to ${tier.name}`}
                  {!tier.isCurrent && <ArrowRight className="h-4 w-4 ml-2 inline" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Feature Comparison</h2>
            <p className="text-gray-600 text-sm mt-1">Compare all membership features side by side</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                  {membershipTiers.map((tier) => (
                    <th key={tier.id} className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                      <div className="flex flex-col items-center">
                        <div className="font-semibold">{tier.name}</div>
                        <div className="text-xs text-gray-500">${tier.price}/{tier.period}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Discount Percentage</td>
                  {membershipTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-center text-sm text-gray-900">
                      <span className="font-bold text-lg">{tier.features.discountPercent}%</span>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Validity Period</td>
                  {membershipTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-center text-sm text-gray-900">
                      {tier.features.validity}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Cashback Rate</td>
                  {membershipTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-center text-sm text-gray-900">
                      <span className="font-bold">{tier.features.cashback}%</span>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Usage Limits</td>
                  {membershipTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-center text-sm text-gray-900">
                      {tier.features.usage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Exclusive Deals</td>
                  {membershipTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-center">
                      {tier.features.exclusiveDeals ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Priority Support</td>
                  {membershipTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-center">
                      {tier.id === 'select' ? (
                        <X className="h-5 w-5 text-gray-400 mx-auto" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Concierge Service</td>
                  {membershipTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-center">
                      {tier.id === 'prestige' ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my membership anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your membership at any time. Changes take effect immediately, 
                and we'll prorate any billing differences.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Are there any cancellation fees?</h3>
              <p className="text-gray-600 text-sm">
                No cancellation fees. You can cancel your membership at any time and continue using 
                your benefits until the end of your current billing period.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Do discounts apply to all bookings?</h3>
              <p className="text-gray-600 text-sm">
                Discounts apply to most bookings, but some special offers and partner properties 
                may have restrictions. Check the booking details for specific terms.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">How do I receive my cashback?</h3>
              <p className="text-gray-600 text-sm">
                Cashback is automatically credited to your SERAI account within 24-48 hours 
                after your stay is completed and reviewed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
