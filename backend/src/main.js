const express = require('express');
const cors = require('cors');
const AuthRouter = require('./routes/auth.route');
const alertRoutes = require('./routes/alerts.route');

const monitoredDestinationRoutes = require('./routes/monitoredDestination.route');
const { connectTest } = require("./utils/db.utils");
const { DiagnosticRouter } = require('./routes/diagnostic.route');
const { DestinationRouter } = require('./routes/destination.route');
require('dotenv').config();

const DB = require('./utils/db.v2.utils');
const { DiagnosticRouter } = require('./routes/diagnostic.route');
// Load environment variables quietly (only if not already loaded)
if (!process.env.DB_HOST && !process.env.TEST_DB_HOST) {
  require('dotenv').config({ silent: true });
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JSON parsing error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid JSON format'
    });
  }
  next();
});

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Chicken Nuggets Insurance API!',
    status: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

//routes
app.use('/api/auth/', AuthRouter);
app.use('/api/diagnostic', DiagnosticRouter);

// Health check endpoint
app.get('/health', async (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    // database: await connectTest() THIS DOESNT WORK "FOR NOW"
  });
});

// Sample API endpoint
app.get('/api/insurance', (req, res) => {
  res.json({
    message: 'Insurance data endpoint',
    data: {
      policies: [],
      customers: [],
      claims: []
    }
  });
});

//routes
app.use('/api/auth/', AuthRouter);
app.use('/api/users/', alertRoutes);
app.use('/api/destinantion/', DestinationRouter);
app.use('/api/diagnostic/', DiagnosticRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  // Only log errors in development or when not in test mode
  if (process.env.NODE_ENV !== 'test') {
    console.error('Error:', err.message);
  }
  
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!',
    message: err.message 
  });
});

//404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📱 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 API base: http://localhost:${PORT}/api`);
    
    // Initialize database connection
    const db = DB.getInstance();
    db.connect().catch(console.error);
  });
}

module.exports = app;
