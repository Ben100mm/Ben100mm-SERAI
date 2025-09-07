'use client';

import { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, Shield, Download, Plus, Edit, Trash2, Calendar, MapPin, Star, AlertCircle, Gift, Ticket, Building2 } from 'lucide-react';

export default function PaymentsPayoutsTab() {
  const [activeSection, setActiveSection] = useState<'traveling' | 'listing'>('traveling');
  
  // Traveling state
  const [travelingData, setTravelingData] = useState({
    paymentMethods: [
      {
        id: '1',
        type: 'visa',
        last4: '4242',
        expiryMonth: '12',
        expiryYear: '2025',
        isDefault: true,
        billingAddress: {
          street: '123 Main St',
          city: 'Toronto',
          province: 'ON',
          postalCode: 'M5V 3A8',
          country: 'Canada'
        }
      },
      {
        id: '2',
        type: 'mastercard',
        last4: '5555',
        expiryMonth: '08',
        expiryYear: '2026',
        isDefault: false,
        billingAddress: {
          street: '456 Queen St',
          city: 'Vancouver',
          province: 'BC',
          postalCode: 'V6B 1A1',
          country: 'Canada'
        }
      }
    ],
    giftCards: [
      {
        id: '1',
        cardNumber: '****1234',
        balance: 75.50,
        originalAmount: 100.00,
        expiryDate: '2025-12-31',
        isActive: true
      },
      {
        id: '2',
        cardNumber: '****5678',
        balance: 0.00,
        originalAmount: 50.00,
        expiryDate: '2024-06-30',
        isActive: false
      }
    ],
    coupons: [
      {
        id: '1',
        code: 'WELCOME20',
        description: '20% off first booking',
        discountType: 'percentage',
        discountValue: 20,
        expiryDate: '2024-12-31',
        isUsed: false,
        minBookingAmount: 100.00
      },
      {
        id: '2',
        code: 'SUMMER50',
        description: '$50 off summer bookings',
        discountType: 'fixed',
        discountValue: 50.00,
        expiryDate: '2024-08-31',
        isUsed: true,
        minBookingAmount: 200.00
      },
      {
        id: '3',
        code: 'LOYALTY15',
        description: '15% off for loyal customers',
        discountType: 'percentage',
        discountValue: 15,
        expiryDate: '2025-03-31',
        isUsed: false,
        minBookingAmount: 150.00
      }
    ],
    recentBookings: [
      {
        id: 'BK001',
        property: 'Luxury Downtown Condo',
        location: 'Toronto, ON',
        checkIn: '2024-02-15',
        checkOut: '2024-02-18',
        amount: 450.00,
        status: 'confirmed',
        paymentMethod: 'Visa •••• 4242'
      },
      {
        id: 'BK002',
        property: 'Cozy Mountain Cabin',
        location: 'Whistler, BC',
        checkIn: '2024-01-20',
        checkOut: '2024-01-25',
        amount: 320.00,
        status: 'completed',
        paymentMethod: 'Mastercard •••• 5555'
      }
    ],
    refunds: [
      {
        id: 'RF001',
        bookingId: 'BK003',
        amount: 150.00,
        reason: 'Cancelled by host',
        status: 'processed',
        processedDate: '2024-01-10'
      }
    ]
  });

  // Listing state
  const [listingData, setListingData] = useState({
    payoutMethods: [
      {
        id: '1',
        type: 'bank',
        bankName: 'TD Canada Trust',
        accountNumber: '****1234',
        routingNumber: '004',
        isDefault: true
      },
      {
        id: '2',
        type: 'paypal',
        email: 'host@example.com',
        isDefault: false
      }
    ],
    earnings: {
      thisMonth: 2850.00,
      lastMonth: 3200.00,
      totalEarned: 15600.00,
      pendingPayout: 450.00
    },
    recentPayouts: [
      {
        id: 'PO001',
        amount: 1200.00,
        method: 'TD Canada Trust ••••1234',
        status: 'completed',
        date: '2024-01-15'
      },
      {
        id: 'PO002',
        amount: 850.00,
        method: 'PayPal',
        status: 'completed',
        date: '2024-01-01'
      }
    ],
    taxSettings: {
      businessType: 'individual',
      taxId: '123456789',
      address: {
        street: '789 Host Street',
        city: 'Montreal',
        province: 'QC',
        postalCode: 'H1A 2B3',
        country: 'Canada'
      }
    },
    serviceFee: {
      feeType: 'split', // 'single' or 'split'
      singleFeeRate: 15,
      splitFeeHostRate: 3,
      splitFeeGuestRate: {
        min: 14,
        max: 16
      }
    }
  });

  const handleAddPaymentMethod = () => {
    // Placeholder for adding new payment method
    console.log('Add payment method');
  };

  const handleAddPayoutMethod = () => {
    // Placeholder for adding new payout method
    console.log('Add payout method');
  };

  const handleEditPaymentMethod = (id: string) => {
    // Placeholder for editing payment method
    console.log('Edit payment method:', id);
  };

  const handleDeletePaymentMethod = (id: string) => {
    // Placeholder for deleting payment method
    console.log('Delete payment method:', id);
  };

  const handleAddGiftCard = () => {
    // Placeholder for adding new gift card
    console.log('Add gift card');
  };

  const handleAddCoupon = () => {
    // Placeholder for adding new coupon
    console.log('Add coupon');
  };

  const handleRedeemGiftCard = (id: string) => {
    // Placeholder for redeeming gift card
    console.log('Redeem gift card:', id);
  };

  const handleUseCoupon = (id: string) => {
    // Placeholder for using coupon
    console.log('Use coupon:', id);
  };

  const handleServiceFeeChange = (feeType: 'single' | 'split') => {
    setListingData(prev => ({
      ...prev,
      serviceFee: {
        ...prev.serviceFee,
        feeType: feeType
      }
    }));
  };

  const getCardIcon = (type: string) => {
    return <CreditCard className="h-6 w-6 text-gray-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'completed':
      case 'processed':
        return 'text-serai-forest-600 bg-serai-forest-100';
      case 'pending':
        return 'text-serai-cream-600 bg-serai-cream-100';
      case 'cancelled':
        return 'text-serai-red-600 bg-serai-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Toggle */}
      <div className="bg-serai-cream-50 rounded-lg p-6 border border-serai-cream-200">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveSection('traveling')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'traveling'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CreditCard className="h-4 w-4 inline mr-2" />
            Traveling
          </button>
          <button
            onClick={() => setActiveSection('listing')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'listing'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <DollarSign className="h-4 w-4 inline mr-2" />
            Listing
          </button>
        </div>
      </div>

      {/* Traveling Section */}
      {activeSection === 'traveling' && (
        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Methods
              </h3>
              <button
                onClick={handleAddPaymentMethod}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-serai-red-600 hover:bg-serai-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-serai-red-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </button>
            </div>
            
            <div className="space-y-4">
              {travelingData.paymentMethods.map((method) => (
                <div key={method.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getCardIcon(method.type)}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {method.type.charAt(0).toUpperCase() + method.type.slice(1)} •••• {method.last4}
                          </span>
                          {method.isDefault && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-serai-red-100 text-serai-red-800">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                        <p className="text-sm text-gray-500">
                          {method.billingAddress.street}, {method.billingAddress.city}, {method.billingAddress.province}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditPaymentMethod(method.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePaymentMethod(method.id)}
                        className="p-2 text-gray-400 hover:text-serai-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Recent Bookings
            </h3>
            
            <div className="space-y-4">
              {travelingData.recentBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{booking.property}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.checkIn} - {booking.checkOut}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Paid with {booking.paymentMethod}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        ${booking.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refunds */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Refunds
            </h3>
            
            <div className="space-y-4">
              {travelingData.refunds.map((refund) => (
                <div key={refund.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">Refund #{refund.id}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(refund.status)}`}>
                          {refund.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Booking #{refund.bookingId}</p>
                      <p className="text-sm text-gray-500">Reason: {refund.reason}</p>
                      <p className="text-sm text-gray-500">Processed: {refund.processedDate}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-serai-forest-600">
                        +${refund.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credits & Coupons */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Credits & Coupons
            </h3>
            
            {/* Gift Cards */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900">Gift Cards</h4>
                <button
                  onClick={handleAddGiftCard}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-serai-red-600 hover:bg-serai-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-serai-serai-red-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Gift Card
                </button>
              </div>
              
              <div className="space-y-3">
                {travelingData.giftCards.map((card) => (
                  <div key={card.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Gift className="h-6 w-6 text-gray-600" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              Gift Card {card.cardNumber}
                            </span>
                            {card.isActive ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-serai-forest-100 text-serai-forest-800">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Expired
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            Original: ${card.originalAmount.toFixed(2)} • Expires: {card.expiryDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          ${card.balance.toFixed(2)}
                        </div>
                        {card.isActive && card.balance > 0 && (
                          <button
                            onClick={() => handleRedeemGiftCard(card.id)}
                            className="text-sm text-serai-red-600 hover:text-serai-red-700 font-medium"
                          >
                            Use Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupons */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900">Coupons</h4>
                <button
                  onClick={handleAddCoupon}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-serai-red-600 hover:bg-serai-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-serai-serai-red-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Coupon
                </button>
              </div>
              
              <div className="space-y-3">
                {travelingData.coupons.map((coupon) => (
                  <div key={coupon.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Ticket className="h-6 w-6 text-gray-600" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {coupon.code}
                            </span>
                            {coupon.isUsed ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Used
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-serai-forest-100 text-serai-forest-800">
                                Available
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{coupon.description}</p>
                          <p className="text-sm text-gray-500">
                            {coupon.discountType === 'percentage' 
                              ? `${coupon.discountValue}% off` 
                              : `$${coupon.discountValue.toFixed(2)} off`
                            } • Min: ${coupon.minBookingAmount.toFixed(2)} • Expires: {coupon.expiryDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {coupon.discountType === 'percentage' 
                            ? `${coupon.discountValue}%` 
                            : `$${coupon.discountValue.toFixed(2)}`
                          }
                        </div>
                        {!coupon.isUsed && (
                          <button
                            onClick={() => handleUseCoupon(coupon.id)}
                            className="text-sm text-serai-red-600 hover:text-serai-red-700 font-medium"
                          >
                            Use Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listing Section */}
      {activeSection === 'listing' && (
        <div className="space-y-6">
          {/* Earnings Overview */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Earnings Overview
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm font-medium text-gray-500">This Month</div>
                <div className="text-2xl font-bold text-gray-900">${listingData.earnings.thisMonth.toFixed(2)}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm font-medium text-gray-500">Last Month</div>
                <div className="text-2xl font-bold text-gray-900">${listingData.earnings.lastMonth.toFixed(2)}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm font-medium text-gray-500">Total Earned</div>
                <div className="text-2xl font-bold text-gray-900">${listingData.earnings.totalEarned.toFixed(2)}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm font-medium text-gray-500">Pending Payout</div>
                <div className="text-2xl font-bold text-serai-cream-600">${listingData.earnings.pendingPayout.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Payout Methods */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Payout Methods
              </h3>
              <button
                onClick={handleAddPayoutMethod}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-serai-red-600 hover:bg-serai-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-serai-red-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payout Method
              </button>
            </div>
            
            <div className="space-y-4">
              {listingData.payoutMethods.map((method) => (
                <div key={method.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-6 w-6 text-gray-600" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {method.type === 'bank' ? method.bankName : 'PayPal'}
                          </span>
                          {method.isDefault && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-serai-red-100 text-serai-red-800">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {method.type === 'bank' 
                            ? `Account ••••${method.accountNumber}` 
                            : method.email
                          }
                        </p>
                        {method.type === 'bank' && (
                          <p className="text-sm text-gray-500">
                            Routing: {method.routingNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditPaymentMethod(method.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePaymentMethod(method.id)}
                        className="p-2 text-gray-400 hover:text-serai-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payouts */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Download className="h-5 w-5 mr-2" />
              Recent Payouts
            </h3>
            
            <div className="space-y-4">
              {listingData.recentPayouts.map((payout) => (
                <div key={payout.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">Payout #{payout.id}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                          {payout.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{payout.method}</p>
                      <p className="text-sm text-gray-500">Date: {payout.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-serai-forest-600">
                        +${payout.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Settings */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Tax Settings
            </h3>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent">
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                    <option value="corporation">Corporation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax ID / SIN
                  </label>
                  <input
                    type="text"
                    value={listingData.taxSettings.taxId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Address
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={listingData.taxSettings.address.street}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={listingData.taxSettings.address.city}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Province/State"
                    value={listingData.taxSettings.address.province}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={listingData.taxSettings.address.postalCode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-serai-serai-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-serai-red-600 hover:bg-serai-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-serai-serai-red-500">
                  Save Tax Settings
                </button>
              </div>
            </div>
          </div>

          {/* Service Fee Settings */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Service Fee
            </h3>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="space-y-4">
                {/* Single Fee Option */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      id="single-fee"
                      name="service-fee"
                      value="single"
                      checked={listingData.serviceFee.feeType === 'single'}
                      onChange={() => handleServiceFeeChange('single')}
                      className="mt-1 h-4 w-4 text-serai-red-600 focus:ring-serai-serai-red-500 border-gray-300"
                    />
                    <div className="flex-1">
                      <label htmlFor="single-fee" className="block text-sm font-medium text-gray-900 cursor-pointer">
                        Single Fee
                      </label>
                      <p className="mt-1 text-sm text-gray-600">
                        SERAI will deduct {listingData.serviceFee.singleFeeRate}% from each payout. Guests won't be charged a service fee - the price you set is the price guests get.
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>You receive {100 - listingData.serviceFee.singleFeeRate}% of your listing price</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Split Fee Option */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      id="split-fee"
                      name="service-fee"
                      value="split"
                      checked={listingData.serviceFee.feeType === 'split'}
                      onChange={() => handleServiceFeeChange('split')}
                      className="mt-1 h-4 w-4 text-serai-red-600 focus:ring-serai-serai-red-500 border-gray-300"
                    />
                    <div className="flex-1">
                      <label htmlFor="split-fee" className="block text-sm font-medium text-gray-900 cursor-pointer">
                        Split Fee
                      </label>
                      <p className="mt-1 text-sm text-gray-600">
                        SERAI deducts {listingData.serviceFee.splitFeeHostRate}% from your earnings, guests pay a {listingData.serviceFee.splitFeeGuestRate.min}%-{listingData.serviceFee.splitFeeGuestRate.max}% service fee on top of all host charges, including nightly prices, cleaning fees, and pet fees.
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>You receive {100 - listingData.serviceFee.splitFeeHostRate}% of your listing price</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>Guests pay {listingData.serviceFee.splitFeeGuestRate.min}%-{listingData.serviceFee.splitFeeGuestRate.max}% service fee on top of your price</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Current Selection</h4>
                <p className="text-sm text-gray-600">
                  {listingData.serviceFee.feeType === 'single' 
                    ? `Single Fee: You'll receive ${100 - listingData.serviceFee.singleFeeRate}% of your listing price, and guests pay exactly what you set.`
                    : `Split Fee: You'll receive ${100 - listingData.serviceFee.splitFeeHostRate}% of your listing price, and guests pay an additional ${listingData.serviceFee.splitFeeGuestRate.min}%-${listingData.serviceFee.splitFeeGuestRate.max}% service fee.`
                  }
                </p>
              </div>

              <div className="mt-4 flex items-center justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-serai-red-600 hover:bg-serai-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-serai-serai-red-500">
                  Save Service Fee Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
