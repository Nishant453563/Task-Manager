const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Joi = require('joi');


exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // --- DEMO MODE BYPASS ---
    const isConnected = mongoose.connection.readyState === 1;
    if (!isConnected) {
      console.log('💡 Demo Mode: Bypassing registration for email:', email);
      return res.status(201).json({
        token: 'demo-token-' + Date.now(),
        user: {
          id: 'demo-user-id',
          name: name || 'Demo User',
          email: email,
          role: role || 'Member'
        }
      });
    }
    // -------------------------

    const schema = Joi.object({
      name: Joi.string().required().min(2),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      role: Joi.string().valid('Admin', 'Member')
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role: role || 'Member'
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- DEMO MODE BYPASS (If no database is connected) ---
    const isConnected = mongoose.connection.readyState === 1;
    if (!isConnected) {
      console.log('💡 Demo Mode: Bypassing login for email:', email);
      return res.json({
        token: 'demo-token-' + Date.now(),
        user: {
          id: 'demo-user-id',
          name: 'Demo Admin',
          email: email,
          role: 'Admin'
        }
      });
    }
    // -----------------------------------------------------

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    if (!isConnected) {
      return res.json({
        id: 'demo-user-id',
        name: 'Demo Admin',
        email: 'admin@demo.com',
        role: 'Admin'
      });
    }

    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
