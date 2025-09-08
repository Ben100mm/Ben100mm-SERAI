'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, Circle, BarChart3 } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  description: string;
}

interface MoneyFlowLine {
  label: string;
  value: number | string;
}

interface MoneyFlow {
  gbv: number;
  lines: MoneyFlowLine[];
}

interface CTA {
  primary: string;
  secondary?: string;
}

interface ComparisonData {
  'Master Lease': {
    'Sign-Up': string;
    'Charges': string;
    'Payment Frequency': string;
    'Photography': string;
    'Pricing': string;
    'Revenue to Serai': string;
  };
  'Hybrid Lease': {
    'Sign-Up': string;
    'Charges': string;
    'Payment Frequency': string;
    'Photography': string;
    'Pricing': string;
    'Revenue to Serai': string;
  };
  'Revenue Share': {
    'Sign-Up': string;
    'Charges': string;
    'Payment Frequency': string;
    'Photography': string;
    'Pricing': string;
    'Revenue to Serai': string;
  };
  'Management Agreement': {
    'Sign-Up': string;
    'Charges': string;
    'Payment Frequency': string;
    'Photography': string;
    'Pricing': string;
    'Revenue to Serai': string;
  };
  'Franchise Model': {
    'Sign-Up': string;
    'Charges': string;
    'Payment Frequency': string;
    'Photography': string;
    'Pricing': string;
    'Revenue to Serai': string;
  };
}

interface VerticalFlowModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  steps: Step[];
  moneyFlow?: MoneyFlow;
  cta?: CTA;
  showCompareButton?: boolean;
}

// Comparison data for all partnership models
const comparisonData: ComparisonData = {
  'Master Lease': {
    'Sign-Up': 'Property inspection → compliance check → multi-year lease agreement → onboarding',
    'Charges': 'None to owner. Serai pays fixed rent and covers operating expenses',
    'Payment Frequency': 'Fixed rent paid monthly (or quarterly per contract)',
    'Photography': 'Serai supplies pro photography and listing assets at no cost',
    'Pricing': 'Serai controls pricing via dynamic pricing engine to maximize RevPAR',
    'Revenue to Serai': 'Profit margin after rent, operations, and distribution'
  },
  'Hybrid Lease': {
    'Sign-Up': 'Property audit & benchmarking → hybrid lease contract → onboarding',
    'Charges': 'Base rent + 10–30% revenue share to Serai (varies by market)',
    'Payment Frequency': 'Base rent paid monthly; revenue-share payout quarterly with reports',
    'Photography': 'Serai provides photos/videos and brand assets',
    'Pricing': 'Serai manages AI-driven dynamic pricing; owner receives transparent performance dashboards',
    'Revenue to Serai': 'Combination of fixed rent + % of revenue uplift'
  },
  'Revenue Share': {
    'Sign-Up': 'Onboarding form → inspection → revenue-share agreement → go-live',
    'Charges': 'Typical split 60/40 or 70/30 in the owner\'s favor (post base costs)',
    'Payment Frequency': 'Monthly payouts on collected revenue; detailed statements included',
    'Photography': 'Included at no cost; optional premium media packs at cost',
    'Pricing': 'Serai sets pricing strategy; owner has live dashboard access',
    'Revenue to Serai': '% share of net booking revenue after base costs'
  },
  'Management Agreement': {
    'Sign-Up': 'Owner application → evaluation → management agreement → team & tech integration',
    'Charges': '8–15% management fee on gross revenue; pass-through expenses per contract',
    'Payment Frequency': 'Gross revenue flows to the owner monthly; Serai fee is deducted/ invoiced monthly',
    'Photography': 'Owner may fund; Serai can arrange preferred vendors or bundle at cost',
    'Pricing': 'Serai recommends AI-driven dynamic pricing; owner may request overrides',
    'Revenue to Serai': '% management fee on gross revenue'
  },
  'Franchise Model': {
    'Sign-Up': 'Franchise application → compliance audit → franchise/license agreement → brand & tech deployment',
    'Charges': 'One-time franchise fee + 15–25% royalty/commission on booking revenue',
    'Payment Frequency': 'Owner collects revenue; Serai invoices royalties monthly',
    'Photography': 'Must meet brand standards; owner funds or Serai arranges at cost',
    'Pricing': 'Serai provides pricing engine + guardrails; owner executes locally with oversight',
    'Revenue to Serai': 'Royalty/commission fees from bookings'
  }
};

export default function VerticalFlowModal({
  open,
  onClose,
  title,
  subtitle,
  steps,
  moneyFlow,
  cta,
  showCompareButton = false
}: VerticalFlowModalProps) {
  // All hooks must be called at the top level
  const [showComparison, setShowComparison] = useState(false);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // Don't render if not open
  if (!open) return null;

  // Check if we have text values instead of numbers
  const hasTextValues = moneyFlow?.lines.some(line => typeof line.value === 'string') || false;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div className={`relative w-full bg-white rounded-lg shadow-xl ${
          showComparison ? 'max-w-7xl' : 'max-w-2xl'
        }`}>
          {/* Header - Sticky */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {title}
                </h2>
                <p className="text-sm text-gray-600">
                  {subtitle}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {showCompareButton && !showComparison && (
                  <button
                    onClick={() => setShowComparison(true)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm text-serai-red-600 hover:text-serai-red-700 hover:bg-serai-red-50 rounded-lg transition-colors"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Compare Models</span>
                  </button>
                )}
                {showComparison && (
                  <button
                    onClick={() => setShowComparison(false)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Back to Flow</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Body - Scrollable */}
          <div className={`px-6 py-6 overflow-y-auto ${
            showComparison ? 'max-h-[80vh]' : 'max-h-[70vh]'
          }`}>
            {showComparison ? (
              /* Comparison Table View */
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnership Models Comparison</h3>
                
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <div className="min-w-full">
                    <div className="grid grid-cols-6 gap-6 mb-3">
                      <div className="font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg text-center">Model</div>
                      <div className="font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg text-center">Sign-Up</div>
                      <div className="font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg text-center">Charges</div>
                      <div className="font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg text-center">Payment Frequency</div>
                      <div className="font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg text-center">Photography</div>
                      <div className="font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg text-center">Pricing</div>
                    </div>
                    
                    {Object.entries(comparisonData).map(([modelName, data]) => (
                      <div key={modelName} className="grid grid-cols-6 gap-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-gray-900 p-3 sticky left-0 bg-white border-r border-gray-200 min-w-[140px]">{modelName}</div>
                        <div className="text-sm text-gray-600 p-3">{data['Sign-Up']}</div>
                        <div className="text-sm text-gray-600 p-3">{data['Charges']}</div>
                        <div className="text-sm text-gray-600 p-3">{data['Payment Frequency']}</div>
                        <div className="text-sm text-gray-600 p-3">{data['Photography']}</div>
                        <div className="text-sm text-gray-600 p-3">{data['Pricing']}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                  {Object.entries(comparisonData).map(([modelName, data]) => (
                    <div key={modelName} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{modelName}</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Sign-Up:</span>
                          <p className="text-sm text-gray-600">{data['Sign-Up']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Charges:</span>
                          <p className="text-sm text-gray-600">{data['Charges']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Payment Frequency:</span>
                          <p className="text-sm text-gray-600">{data['Payment Frequency']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Photography:</span>
                          <p className="text-sm text-gray-600">{data['Photography']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Pricing:</span>
                          <p className="text-sm text-gray-600">{data['Pricing']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Revenue to Serai:</span>
                          <p className="text-sm text-gray-600">{data['Revenue to Serai']}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Original Flow View */
              <div className="space-y-6">
                {/* Money Flow Card */}
                {moneyFlow && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">$100 Booking Flow</h3>
                      <span className="text-lg font-semibold text-gray-900">
                        ${moneyFlow.gbv.toFixed(2)} GBV
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {moneyFlow.lines.map((line, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            {line.label}
                          </span>
                          <span className="font-medium text-gray-900">
                            {typeof line.value === 'string' 
                              ? line.value
                              : isNaN(line.value) 
                                ? (line.label.includes('Operating costs') || line.label.includes('Base operating costs') || line.label.includes('owner\'s account') ? '-x' : 
                                   line.label.includes('Revenue share to Serai') ? '-y' : 
                                   line.label.includes('Owner receives') ? '+z' :
                                   line.label.includes('Split to Owner') ? '+a' :
                                   line.label.includes('Split to Serai') ? '+b' :
                                   line.label.includes('Owner net') ? '+y' : '-x')
                                : `${line.value >= 0 ? '+' : ''}$${line.value.toFixed(2)}`
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-300 pt-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-gray-900">
                          {hasTextValues ? 'Summary' : 'Owner Net'}
                        </span>
                        <span className="text-gray-900">
                          {hasTextValues 
                            ? 'Simple, transparent structure'
                            : 'varies by revenue & operating costs'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Steps Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                  
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <div key={step.id} className="relative flex items-start">
                        {/* Timeline Dot */}
                        <div className="flex-shrink-0 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center relative z-10">
                          {index < steps.length - 1 ? (
                            <Circle className="h-4 w-4 text-gray-400" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-serai-red-600" />
                          )}
                        </div>
                        
                        {/* Step Content */}
                        <div className="ml-4 flex-1">
                          <h4 className="text-base font-semibold text-gray-900 mb-1">
                            {step.label}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer - CTA Buttons */}
          {cta && !showComparison && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-lg">
              <div className="flex flex-col sm:flex-row gap-3">
                {cta.secondary && (
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {cta.secondary}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className={`flex-1 px-4 py-2 bg-serai-red-600 text-white rounded-lg hover:bg-serai-red-700 transition-colors ${
                    !cta.secondary ? 'sm:max-w-xs sm:ml-auto' : ''
                  }`}
                >
                  {cta.primary}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
