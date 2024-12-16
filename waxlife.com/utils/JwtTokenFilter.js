const JwtTokenUtil = require('../utils/JwtTokenUtil');

function JwtTokenFilter(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const decoded = JwtTokenUtil.validateToken(token);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = JwtTokenFilter;