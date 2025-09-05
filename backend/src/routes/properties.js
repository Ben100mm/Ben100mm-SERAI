const express = require('express');
const { body, param, query } = require('express-validator');
const {
  getProperties,
  getProperty,
  checkAvailability
} = require('../controllers/propertyController-simple');
const { auth, authorize } = require('../middleware/auth-simple');

const router = express.Router();

// Validation rules
const createPropertyValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Property name is required and must be less than 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('type')
    .isIn(['BOUTIQUE_HOTEL', 'HOMESTAY', 'ECO_LODGE', 'LUXURY_GLAMPING', 'HERITAGE_HAVELI', 'DESERT_CAMP', 'MOUNTAIN_CABIN', 'APARTMENT', 'HOUSE', 'VILLA', 'CONDO', 'COTTAGE', 'CHALET'])
    .withMessage('Invalid property type'),
  body('category')
    .isIn(['LUXURY', 'BOUTIQUE', 'BUDGET', 'MID_RANGE', 'PREMIUM'])
    .withMessage('Invalid property category'),
  body('address')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Address is required and must be less than 500 characters'),
  body('city')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('City is required and must be less than 100 characters'),
  body('state')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('State is required and must be less than 100 characters'),
  body('country')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Country is required and must be less than 100 characters'),
  body('postalCode')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Postal code is required and must be less than 20 characters'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid number between -90 and 90'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid number between -180 and 180'),
  body('bedrooms')
    .isInt({ min: 0, max: 50 })
    .withMessage('Bedrooms must be a valid number between 0 and 50'),
  body('bathrooms')
    .isInt({ min: 0, max: 50 })
    .withMessage('Bathrooms must be a valid number between 0 and 50'),
  body('maxGuests')
    .isInt({ min: 1, max: 100 })
    .withMessage('Max guests must be a valid number between 1 and 100'),
  body('basePrice')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a valid positive number'),
  body('currency')
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-character code'),
  body('amenities')
    .optional()
    .isArray()
    .withMessage('Amenities must be an array'),
  body('houseRules')
    .optional()
    .isArray()
    .withMessage('House rules must be an array'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  body('videos')
    .optional()
    .isArray()
    .withMessage('Videos must be an array')
];

const updatePropertyValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid property ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Property name must be less than 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('type')
    .optional()
    .isIn(['BOUTIQUE_HOTEL', 'HOMESTAY', 'ECO_LODGE', 'LUXURY_GLAMPING', 'HERITAGE_HAVELI', 'DESERT_CAMP', 'MOUNTAIN_CABIN', 'APARTMENT', 'HOUSE', 'VILLA', 'CONDO', 'COTTAGE', 'CHALET'])
    .withMessage('Invalid property type'),
  body('category')
    .optional()
    .isIn(['LUXURY', 'BOUTIQUE', 'BUDGET', 'MID_RANGE', 'PREMIUM'])
    .withMessage('Invalid property category'),
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid number between -90 and 90'),
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid number between -180 and 180'),
  body('bedrooms')
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage('Bedrooms must be a valid number between 0 and 50'),
  body('bathrooms')
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage('Bathrooms must be a valid number between 0 and 50'),
  body('maxGuests')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Max guests must be a valid number between 1 and 100'),
  body('basePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Base price must be a valid positive number')
];

const getPropertyValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid property ID')
];

const checkAvailabilityValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid property ID'),
  query('checkIn')
    .isISO8601()
    .withMessage('Check-in date must be a valid ISO 8601 date'),
  query('checkOut')
    .isISO8601()
    .withMessage('Check-out date must be a valid ISO 8601 date'),
  query('guests')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Guests must be a valid number between 1 and 100')
];

// Routes
router.get('/', getProperties);
router.get('/:id', getPropertyValidation, getProperty);
router.get('/:id/availability', checkAvailabilityValidation, checkAvailability);

module.exports = router;
