const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('/{*path}', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/team-task-manager';

// In-Memory Database Mode (No MongoDB Atlas Required)
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running in IN-MEMORY MODE on port ${PORT}`);
    console.log(`⚠️  Warning: Data will be lost on server restart.`);
  });
};

if (MONGODB_URI.includes('localhost') || !process.env.MONGODB_URI) {
  console.log('💡 No remote MongoDB URI found. Starting in In-Memory mode...');
  startServer();
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB successfully');
      startServer();
    })
    .catch(err => {
      console.error('❌ Failed to connect to MongoDB. Falling back to In-Memory mode...');
      startServer();
    });
}
