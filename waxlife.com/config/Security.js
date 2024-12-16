const cors = require('cors');
const UserRole = require('../enums/UserRole');
const JwtTokenFilter = require('../utils/JwtTokenFilter');

// CORS Configuration - Allow specific origins
const corsOptions = {
  origin: ['*', '*'],  // Specify your allowed origins here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies or authorization headers
};

// Middleware to apply CORS settings globally
function setupCors(app) {
  app.use(cors(corsOptions)); // Apply CORS settings globally
}

// Role-based authorization middleware
function authorizeRoles(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role; // Extract role from decoded token (added by JwtTokenFilter)

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }

    next();
  };
}

// Allow access to specific roles (e.g., user, admin, super admin)
function permitAll(req, res, next) {
  next();  // Allows the request to proceed without any role check
}

// Exporting both functions for use in routes or globally
module.exports = {
  setupCors,
  authorizeRoles,
  permitAll,
};
