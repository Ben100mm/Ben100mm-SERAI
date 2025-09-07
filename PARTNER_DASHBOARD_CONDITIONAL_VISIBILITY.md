# Partner Dashboard Conditional Visibility Requirements

## Overview
The partner dashboard at `http://localhost:4000/partner-dashboard` needs to implement conditional visibility based on the 5 partnership models from the partner page.

## Partnership Models & Access Levels

### 1. Master Lease Partners
**Access Level:** Limited
**Visible Features:** 8-10 core features
- ✅ Revenue & Financial - Fixed rent tracking, payment schedules
- ✅ Property Management - Basic property details and status
- ❌ Pricing Management - No dynamic pricing controls (Serai sets prices)
- ❌ Revenue Share Tracking - Not applicable
- ❌ Channel Management - Limited access (Serai manages distribution)
- ✅ Guest Experience - Basic guest communication
- ✅ Analytics & Insights - Basic performance metrics
- ✅ Compliance & Legal - Regulatory compliance tracking

**Quick Stats:** Monthly Rent, Property Status, Occupancy Rate, Maintenance Requests
**Access Methods:** Web access only, limited API access

### 2. Hybrid Lease Partners
**Access Level:** Moderate
**Visible Features:** 12-13 features with limited access indicators
- ✅ Revenue & Financial - Base rent + revenue share tracking
- ✅ Property Management - Full property management features
- ⚠️ Pricing Management - Limited pricing controls with Serai oversight
- ✅ Revenue Share Tracking - Detailed revenue share analytics
- ⚠️ Channel Management - View-only access to distribution channels
- ✅ All other features with full access

**Quick Stats:** Monthly Revenue, Revenue Share %, Occupancy Rate, Guest Rating
**Access Methods:** Web + mobile, moderate API access

### 3. Revenue Share Partners
**Access Level:** Full
**Visible Features:** All 14 features with complete functionality
- ✅ All features with full access
- ✅ Complete revenue optimization and pricing controls
- ✅ Full channel management capabilities
- ✅ Comprehensive revenue share dashboard

**Quick Stats:** Monthly Revenue, Revenue Share %, Occupancy Rate, Guest Rating
**Access Methods:** Complete access to all methods

### 4. Management Agreement Partners
**Access Level:** Monitoring Focus
**Visible Features:** 10-11 features focused on monitoring
- ✅ Revenue & Financial - Revenue tracking and performance metrics
- ⚠️ Property Management - View-only property information
- ❌ Operations Management - Limited access (Serai handles operations)
- ❌ Staff Management - Not applicable (Serai manages staff)
- ✅ Analytics & Insights - Performance reporting and insights
- ✅ Guest Experience - Guest communication and reviews

**Quick Stats:** Revenue Performance, Occupancy Rate, Guest Satisfaction, Maintenance Status
**Access Methods:** Web access with reporting focus

### 5. Franchise Model Partners
**Access Level:** Complete + Franchise Tools
**Visible Features:** All 14 features plus franchise-specific tools
- ✅ All standard features with full access
- ✅ Brand Management - Serai brand guidelines and compliance
- ✅ Technology Features - Full access to Serai tech suite
- ✅ Training Resources - Franchise-specific training materials
- ✅ Support Access - Dedicated franchise support

**Quick Stats:** All standard metrics plus franchise-specific KPIs
**Access Methods:** Complete access with additional franchise tools

## Implementation Requirements

### 1. Partnership Model Detection
```typescript
const [partnershipModel, setPartnershipModel] = useState('Revenue Share'); // Default
// This would come from user profile/authentication
```

### 2. Conditional Feature Visibility
```typescript
const getVisibleFeatures = (model: string) => {
  const allFeatures = [...]; // All 14 features
  const modelRestrictions = {
    'Master Lease': ['pricing-management', 'channel-management'],
    'Hybrid Lease': ['pricing-management'], // Limited access
    'Management Agreement': ['operations', 'staff-management'],
    'Revenue Share': [], // All features visible
    'Franchise Model': [] // All features visible
  };
  
  return allFeatures.filter(feature => 
    !modelRestrictions[model]?.includes(feature.id)
  );
};
```

### 3. Conditional Content Rendering
```typescript
// In each feature section
{partnershipModel === 'Master Lease' && (
  <div className="bg-yellow-50 p-4 rounded-lg">
    <p className="text-sm text-yellow-800">
      <strong>Note:</strong> Pricing is managed by Serai under your Master Lease agreement.
    </p>
  </div>
)}
```

### 4. Partnership-Specific Quick Stats
```typescript
const getQuickStats = (model: string) => {
  switch(model) {
    case 'Master Lease':
      return ['Monthly Rent', 'Property Status', 'Occupancy Rate', 'Maintenance Requests'];
    case 'Hybrid Lease':
      return ['Monthly Revenue', 'Revenue Share %', 'Occupancy Rate', 'Guest Rating'];
    case 'Revenue Share':
      return ['Monthly Revenue', 'Revenue Share %', 'Occupancy Rate', 'Guest Rating'];
    case 'Management Agreement':
      return ['Revenue Performance', 'Occupancy Rate', 'Guest Satisfaction', 'Maintenance Status'];
    case 'Franchise Model':
      return ['All standard metrics plus franchise-specific KPIs'];
  }
};
```

### 5. Different Navigation Menus
- **Master Lease**: Simplified sidebar with 8-10 core features
- **Hybrid Lease**: 12-13 features with limited access indicators
- **Revenue Share**: All 14 features with full functionality
- **Management Agreement**: 10-11 features focused on monitoring
- **Franchise**: All 14 features plus franchise-specific tools

### 6. Access Method Variations
- **Master Lease**: Web access only, limited API access
- **Hybrid Lease**: Web + mobile, moderate API access
- **Revenue Share**: Full access to all methods
- **Management Agreement**: Web access with reporting focus
- **Franchise**: Complete access with additional franchise tools

## Benefits
- Personalized experience for each partnership type
- Appropriate feature access based on agreement terms
- Clear indication of available vs. restricted features
- Partnership-specific quick stats and metrics
- Streamlined navigation for each model
