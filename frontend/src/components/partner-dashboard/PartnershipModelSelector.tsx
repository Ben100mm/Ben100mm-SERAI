'use client';

interface PartnershipModelSelectorProps {
  partnershipModel: string;
  setPartnershipModel: (model: string) => void;
}

export default function PartnershipModelSelector({ partnershipModel, setPartnershipModel }: PartnershipModelSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Partnership Model:</span>
      <select
        value={partnershipModel}
        onChange={(e) => setPartnershipModel(e.target.value)}
        className="px-3 py-1 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="Master Lease">Master Lease</option>
        <option value="Hybrid Lease">Hybrid Lease</option>
        <option value="Revenue Share">Revenue Share</option>
        <option value="Management Agreement">Management Agreement</option>
        <option value="Franchise Model">Franchise Model</option>
      </select>
    </div>
  );
}
