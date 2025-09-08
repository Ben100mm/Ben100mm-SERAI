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
  value: number;
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

  // Calculate Owner Net for money flow
  const calculateOwnerNet = () => {
    if (!moneyFlow) return 0;
    return moneyFlow.lines.reduce((sum, line) => {
      return isNaN(line.value) ? sum : sum + line.value;
    }, 0);
  };

  const ownerNet = calculateOwnerNet();
  const hasNaNValue = moneyFlow?.lines.some(line => isNaN(line.value)) || false;

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
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm text-serai-navy-600 hover:text-serai-navy-700 hover:bg-serai-navy-50 rounded-lg transition-colors font-medium"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Compare Models</span>
                  </button>
                )}
                {showComparison && (
                  <button
                    onClick={() => setShowComparison(false)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm text-serai-charcoal-600 hover:text-serai-charcoal-700 hover:bg-serai-charcoal-50 rounded-lg transition-colors font-medium"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Back to Flow</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-1 text-serai-charcoal-400 hover:text-serai-charcoal-600 transition-colors"
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
                <h3 className="text-lg font-semibold text-serai-navy-900 mb-4">Partnership Models Comparison</h3>
                
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <div className="min-w-full">
                    <div className="grid grid-cols-6 gap-6 mb-3">
                      <div className="font-semibold text-serai-navy-900 p-3 bg-serai-cream-100 rounded-lg text-center">Model</div>
                      <div className="font-semibold text-serai-navy-900 p-3 bg-serai-cream-100 rounded-lg text-center">Sign-Up</div>
                      <div className="font-semibold text-serai-navy-900 p-3 bg-serai-cream-100 rounded-lg text-center">Charges</div>
                      <div className="font-semibold text-serai-navy-900 p-3 bg-serai-cream-100 rounded-lg text-center">Payment Frequency</div>
                      <div className="font-semibold text-serai-navy-900 p-3 bg-serai-cream-100 rounded-lg text-center">Photography</div>
                      <div className="font-semibold text-serai-navy-900 p-3 bg-serai-cream-100 rounded-lg text-center">Pricing</div>
                    </div>
                    
                    {Object.entries(comparisonData).map(([modelName, data]) => (
                      <div key={modelName} className="grid grid-cols-6 gap-6 py-4 border-b border-serai-neutral-200 hover:bg-serai-cream-50 transition-colors">
                        <div className="font-semibold text-serai-navy-900 p-3 sticky left-0 bg-white border-r border-serai-neutral-200 min-w-[140px]">{modelName}</div>
                        <div className="text-sm text-serai-charcoal-600 p-3">{data['Sign-Up']}</div>
                        <div className="text-sm text-serai-charcoal-600 p-3">{data['Charges']}</div>
                        <div className="text-sm text-serai-charcoal-600 p-3">{data['Payment Frequency']}</div>
                        <div className="text-sm text-serai-charcoal-600 p-3">{data['Photography']}</div>
                        <div className="text-sm text-serai-charcoal-600 p-3">{data['Pricing']}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                  {Object.entries(comparisonData).map(([modelName, data]) => (
                    <div key={modelName} className="bg-serai-cream-50 rounded-lg p-4 border border-serai-neutral-200">
                      <h4 className="font-semibold text-serai-navy-900 mb-3">{modelName}</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-serai-navy-700">Sign-Up:</span>
                          <p className="text-sm text-serai-charcoal-600">{data['Sign-Up']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-serai-navy-700">Charges:</span>
                          <p className="text-sm text-serai-charcoal-600">{data['Charges']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-serai-navy-700">Payment Frequency:</span>
                          <p className="text-sm text-serai-charcoal-600">{data['Payment Frequency']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-serai-navy-700">Photography:</span>
                          <p className="text-sm text-serai-charcoal-600">{data['Photography']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-serai-navy-700">Pricing:</span>
                          <p className="text-sm text-serai-charcoal-600">{data['Pricing']}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-serai-navy-700">Revenue to Serai:</span>
                          <p className="text-sm text-serai-charcoal-600">{data['Revenue to Serai']}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Original Flow View */
              <div className="space-y-6">
                {/* Financial Breakdown Card */}
                {moneyFlow && (
                  <div className="bg-serai-cream-50 rounded-lg p-6 border border-serai-neutral-200">
                    <h3 className="text-lg font-semibold text-serai-navy-900 mb-4">Financial Breakdown</h3>
                    
                    {title === 'Master Lease' && (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg border border-serai-neutral-200">
                          <h4 className="font-semibold text-serai-navy-700 mb-2">Master Lease</h4>
                          <p className="text-sm text-serai-charcoal-600 mb-3">Serai rents the property and takes full responsibility.</p>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium text-serai-navy-600">Owner receives:</span> <span className="text-serai-charcoal-600">Fixed monthly rent (guaranteed)</span></div>
                            <div><span className="font-medium text-serai-navy-600">Owner risk:</span> <span className="text-serai-charcoal-600">None</span></div>
                            <div><span className="font-medium text-serai-navy-600">Serai risk:</span> <span className="text-serai-charcoal-600">Full (Serai pays rent even if the property is empty)</span></div>
                            <div><span className="font-medium text-serai-navy-600">Best for:</span> <span className="text-serai-charcoal-600">Owners who want steady income with no involvement</span></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {title === 'Hybrid Lease' && (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg border border-serai-neutral-200">
                          <h4 className="font-semibold text-serai-navy-700 mb-2">Hybrid Lease</h4>
                          <p className="text-sm text-serai-charcoal-600 mb-3">Owner gets a smaller base rent plus a share of profits.</p>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium text-serai-navy-600">Owner receives:</span> <span className="text-serai-charcoal-600">Base rent + percentage of profits</span></div>
                            <div><span className="font-medium text-serai-navy-600">Owner risk:</span> <span className="text-serai-charcoal-600">Low</span></div>
                            <div><span className="font-medium text-serai-navy-600">Serai risk:</span> <span className="text-serai-charcoal-600">Moderate (Serai covers operations, but owner shares some performance risk)</span></div>
                            <div><span className="font-medium text-serai-navy-600">Best for:</span> <span className="text-serai-charcoal-600">Owners who want some upside without full risk</span></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {title === 'Revenue Share' && (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg border border-serai-neutral-200">
                          <h4 className="font-semibold text-serai-navy-700 mb-2">Revenue Share</h4>
                          <p className="text-sm text-serai-charcoal-600 mb-3">Serai runs everything and splits profits with the owner.</p>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium text-serai-navy-600">Owner receives:</span> <span className="text-serai-charcoal-600">A percentage of net profits</span></div>
                            <div><span className="font-medium text-serai-navy-600">Owner risk:</span> <span className="text-serai-charcoal-600">Shared (earnings depend on how well the property performs)</span></div>
                            <div><span className="font-medium text-serai-navy-600">Serai risk:</span> <span className="text-serai-charcoal-600">Shared</span></div>
                            <div><span className="font-medium text-serai-navy-600">Best for:</span> <span className="text-serai-charcoal-600">Owners who want higher potential income and are okay with variability</span></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {title === 'Management Agreement' && (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg border border-serai-neutral-200">
                          <h4 className="font-semibold text-serai-navy-700 mb-2">Management Agreement</h4>
                          <p className="text-sm text-serai-charcoal-600 mb-3">Owner hires Serai to operate the property for a fixed fee.</p>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium text-serai-navy-600">Owner receives:</span> <span className="text-serai-charcoal-600">Full revenue minus expenses and Serai's management fee</span></div>
                            <div><span className="font-medium text-serai-navy-600">Owner risk:</span> <span className="text-serai-charcoal-600">Full (covers all costs, earns more if the property performs well)</span></div>
                            <div><span className="font-medium text-serai-navy-600">Serai risk:</span> <span className="text-serai-charcoal-600">None (gets paid regardless of performance)</span></div>
                            <div><span className="font-medium text-serai-navy-600">Best for:</span> <span className="text-serai-charcoal-600">Owners who want to stay in control but need expert help</span></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {title === 'Franchise Model' && (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg border border-serai-neutral-200">
                          <h4 className="font-semibold text-serai-navy-700 mb-2">Franchise Model</h4>
                          <p className="text-sm text-serai-charcoal-600 mb-3">Owner runs the property under the SERAI brand and pays a royalty.</p>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium text-serai-navy-600">Owner receives:</span> <span className="text-serai-charcoal-600">Full control over revenue after paying fees</span></div>
                            <div><span className="font-medium text-serai-navy-600">Owner risk:</span> <span className="text-serai-charcoal-600">Full</span></div>
                            <div><span className="font-medium text-serai-navy-600">Serai risk:</span> <span className="text-serai-charcoal-600">None</span></div>
                            <div><span className="font-medium text-serai-navy-600">Best for:</span> <span className="text-serai-charcoal-600">Experienced operators who want branding, tools, and support</span></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Steps Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-serai-neutral-200" />
                  
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <div key={step.id} className="relative flex items-start">
                        {/* Timeline Dot */}
                        <div className="flex-shrink-0 w-8 h-8 bg-white border-2 border-serai-navy-200 rounded-full flex items-center justify-center relative z-10">
                          {index < steps.length - 1 ? (
                            <Circle className="h-4 w-4 text-serai-navy-400" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-serai-navy-600" />
                          )}
                        </div>
                        
                        {/* Step Content */}
                        <div className="ml-4 flex-1">
                          <h4 className="text-base font-semibold text-serai-navy-900 mb-1">
                            {step.label}
                          </h4>
                          <p className="text-sm text-serai-charcoal-600">
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
            <div className="sticky bottom-0 bg-white border-t border-serai-neutral-200 px-6 py-4 rounded-b-lg">
              <div className="flex flex-col sm:flex-row gap-3">
                {cta.secondary && (
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-serai-navy-300 text-serai-navy-600 rounded-lg hover:bg-serai-navy-50 transition-colors font-medium"
                  >
                    {cta.secondary}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className={`flex-1 px-4 py-2 bg-serai-navy-500 text-white rounded-lg hover:bg-serai-navy-600 transition-colors font-medium ${
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
