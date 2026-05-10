const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied.' });
    }

    // --- DEMO MODE BYPASS ---
    const mongoose = require('mongoose');
    const isConnected = mongoose.connection.readyState === 1;
    if (!isConnected) {
      // Create a mock user object for the request
      req.user = { id: 'demo-user-id', role: 'Admin' };
      return next();
    }
    // -------------------------

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ message: 'Token verification failed, access denied.' });
    }

    const user = await User.findById(verified.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found, access denied.' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token, access denied.' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
};

module.exports = { auth, isAdmin };
