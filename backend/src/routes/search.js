const express = require('express');
const { query } = require('express-validator');
const {
  globalSearch,
  getSearchSuggestions,
  getPopularDestinations
} = require('../controllers/searchController');

const router = express.Router();

// Validation rules
const searchValidation = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  query('type')
    .optional()
    .isIn(['properties', 'experiences', 'services', 'routes'])
    .withMessage('Type must be one of: properties, experiences, services, routes'),
  query('location')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Location must be between 1 and 100 characters'),
  query('checkIn')
    .optional()
    .isISO8601()
    .withMessage('Check-in date must be a valid ISO 8601 date'),
  query('checkOut')
    .optional()
    .isISO8601()
    .withMessage('Check-out date must be a valid ISO 8601 date'),
  query('guests')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Guests must be a valid number between 1 and 100'),
  query('priceMin')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a valid positive number'),
  query('priceMax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a valid positive number'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a valid positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

const suggestionsValidation = [
  query('q')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

const popularDestinationsValidation = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

// Routes
router.get('/', searchValidation, globalSearch);
router.get('/suggestions', suggestionsValidation, getSearchSuggestions);
router.get('/popular-destinations', popularDestinationsValidation, getPopularDestinations);

module.exports = router;
