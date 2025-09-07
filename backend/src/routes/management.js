const express = require('express');
const router = express.Router();
const {
  getDashboardOverview,
  getPartnerManagement,
  getPropertyOperations,
  getRevenueFinancial,
  getGuestExperience,
  getOperationsManagement,
  getBusinessIntelligence,
  sendPartnerNotification,
  updatePartnerData,
  updatePropertyData
} = require('../controllers/managementController');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Dashboard Overview
router.get('/overview', getDashboardOverview);

// Partner Management
router.get('/partners', getPartnerManagement);
router.put('/partners/:partnerId', updatePartnerData);
router.post('/partners/notify', sendPartnerNotification);

// Property Operations
router.get('/properties', getPropertyOperations);
router.put('/properties/:propertyId', updatePropertyData);

// Revenue & Financial
router.get('/revenue', getRevenueFinancial);

// Guest Experience
router.get('/guest-experience', getGuestExperience);

// Operations Management
router.get('/operations', getOperationsManagement);

// Business Intelligence
router.get('/business-intelligence', getBusinessIntelligence);

module.exports = router;
