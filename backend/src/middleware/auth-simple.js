const jwt = require('jsonwebtoken');

// In-memory storage for demo purposes
const users = [];

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    
    // For demo purposes, create a mock user
    const user = {
      id: decoded.id,
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      role: 'GUEST',
      isActive: true,
      preferences: {
        language: 'en',
        currency: 'CAD',
        timezone: 'America/Toronto'
      }
    };

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }

    next();
  };
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
      
      const user = {
        id: decoded.id,
        email: 'demo@example.com',
        firstName: 'Demo',
        lastName: 'User',
        role: 'GUEST',
        isActive: true,
        preferences: {
          language: 'en',
          currency: 'CAD',
          timezone: 'America/Toronto'
        }
      };

      req.user = user;
    }

    next();
  } catch (error) {
    // If token is invalid, continue without user
    next();
  }
};

module.exports = {
  auth,
  authorize,
  optionalAuth
};
