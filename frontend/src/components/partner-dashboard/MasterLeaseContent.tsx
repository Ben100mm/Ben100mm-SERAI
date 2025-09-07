'use client';

import { LazyBarChart3, LazyBuilding2, LazyMessageSquare, LazyFileText, LazyCheckCircle, LazyPhone, LazyMail, LazyEye } from '@/components/icons/LazyIcons';
import { PARTNERSHIP_RESTRICTIONS } from '@/data/partnershipData';

interface MasterLeaseContentProps {
  featureId: string;
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
}

export default function MasterLeaseContent({ featureId, activeSubTab, setActiveSubTab }: MasterLeaseContentProps) {
  const feature = PARTNERSHIP_RESTRICTIONS['Master Lease'].customFeatures.find(f => f.id === featureId);
  if (!feature) return null;

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-300 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h2>
        <p className="text-gray-600 mb-6">{feature.description}</p>
        
        {/* Sub-tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {feature.subTabs.map((subTab) => (
            <button
              key={subTab.id}
              onClick={() => setActiveSubTab(subTab.id)}
              className={`p-4 text-left border rounded-lg transition-colors ${
                activeSubTab === subTab.id
                  ? 'border-gray-500 bg-gray-400 text-gray-900'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'
              }`}
            >
              <h3 className="font-semibold text-gray-900 mb-2">{subTab.title}</h3>
              <p className="text-sm text-gray-600">{subTab.description}</p>
            </button>
          ))}
        </div>

        {/* Sub-tab content */}
        {activeSubTab && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {feature.subTabs.find(st => st.id === activeSubTab)?.title}
            </h3>
            <div className="space-y-4">
              {renderMasterLeaseSubContent(activeSubTab)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function renderMasterLeaseSubContent(subTabId: string) {
  switch (subTabId) {
    case 'rent-payments':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-300 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Current Month Status</h4>
              <p className="text-sm text-gray-700">Rent payment received on time</p>
            </div>
            <LazyCheckCircle className="h-8 w-8 text-gray-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <h5 className="font-medium text-gray-900">Monthly Rent</h5>
              <p className="text-2xl font-bold text-gray-900">$8,500</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <h5 className="font-medium text-gray-900">Due Date</h5>
              <p className="text-2xl font-bold text-gray-900">1st of Month</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <h5 className="font-medium text-gray-900">Next Payment</h5>
              <p className="text-2xl font-bold text-gray-900">Jan 1, 2025</p>
            </div>
          </div>
        </div>
      );

    case 'payment-history':
      return (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dec 1, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$8,500</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bank Transfer</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nov 1, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$8,500</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bank Transfer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'condition-reports':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <h5 className="font-medium text-gray-900 mb-2">Last Inspection</h5>
              <p className="text-sm text-gray-600">December 1, 2024</p>
              <p className="text-sm text-gray-700 font-medium">Excellent Condition</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <h5 className="font-medium text-gray-900 mb-2">Next Inspection</h5>
              <p className="text-sm text-gray-600">March 1, 2025</p>
              <p className="text-sm text-gray-700 font-medium">Scheduled</p>
            </div>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Recent Notes</h5>
            <p className="text-sm text-blue-700">Property is in excellent condition. All systems functioning properly. No maintenance issues identified.</p>
          </div>
        </div>
      );

    case 'property-manager':
      return (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border">
            <h5 className="font-medium text-gray-900 mb-2">Primary Contact</h5>
            <p className="text-sm text-gray-600">Sarah Johnson - Property Manager</p>
            <div className="flex space-x-4 mt-2">
              <a href="tel:+1234567890" className="flex items-center text-sm text-gray-700 hover:text-gray-800">
                <LazyPhone className="h-4 w-4 mr-1" />
                (123) 456-7890
              </a>
              <a href="mailto:sarah.johnson@serai.com" className="flex items-center text-sm text-gray-700 hover:text-gray-800">
                <LazyMail className="h-4 w-4 mr-1" />
                sarah.johnson@serai.com
              </a>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h5 className="font-medium text-gray-900 mb-2">Emergency Contact</h5>
            <p className="text-sm text-gray-600">24/7 Emergency Hotline</p>
            <a href="tel:+1234567891" className="flex items-center text-sm text-gray-700 hover:text-gray-800 mt-1">
              <LazyPhone className="h-4 w-4 mr-1" />
              (123) 456-7891
            </a>
          </div>
        </div>
      );

    default:
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <LazyEye className="h-12 w-12 mx-auto" />
          </div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Coming Soon</h4>
          <p className="text-gray-500">This section is under development and will be available soon.</p>
        </div>
      );
  }
}
