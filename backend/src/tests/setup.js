const db = require('../config/database');
const fs = require('fs');
const path = require('path');

// Read the init.sql file
const initSQL = fs.readFileSync(path.join(__dirname, '../../../database/init.sql'), 'utf8');

// Test data setup
const setupTestData = async () => {
  try {
    // Execute the init.sql to create tables
    await db.query(initSQL);
    
    // Insert test user
    await db.query(`
      INSERT INTO users (first_name, last_name, email, password, role) 
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO NOTHING
    `, ['Test', 'User', 'test@test.com', 'test', 'user']);
    
    console.log('Test database setup completed');
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
};

// Clean up test data
const cleanupTestData = async () => {
  try {
    // Clean up in reverse order of dependencies
    await db.query('DELETE FROM user_alerts');
    await db.query('DELETE FROM diagnostic_tests');
    await db.query('DELETE FROM monitored_destinations');
    await db.query('DELETE FROM users');
    
    console.log('Test database cleanup completed');
  } catch (error) {
    console.error('Error cleaning up test database:', error);
    throw error;
  }
};

module.exports = {
  setupTestData,
  cleanupTestData
}; 