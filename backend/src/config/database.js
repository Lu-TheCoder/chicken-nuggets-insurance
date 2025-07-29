const { Pool } = require('pg');
require('dotenv').config();

// Database configuration for different environments
const config = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5433,
    database: process.env.DB_NAME || 'chicken_nuggets_insurance',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },
  test: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: process.env.TEST_DB_PORT || 5434,
    database: process.env.TEST_DB_NAME || 'chicken_nuggets_insurance_test',
    user: process.env.TEST_DB_USER || 'postgres',
    password: process.env.TEST_DB_PASSWORD || 'postgres',
  }
};

// Get current environment
const env = process.env.NODE_ENV || 'development';

// Create pool based on environment
const pool = new Pool(config[env]);

// Test the connection
pool.on('connect', () => {
  console.log(`Connected to ${env} database`);
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  config: config[env]
}; 