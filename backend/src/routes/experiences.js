const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Placeholder routes for experience management
// These will be implemented in the experience controller

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      experiences: [],
      message: 'Experience routes - to be implemented'
    }
  });
});

module.exports = router;
