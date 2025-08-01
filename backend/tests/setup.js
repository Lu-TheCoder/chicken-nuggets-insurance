const DB = require('../src/utils/db.v2.utils');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Read the init.sql file - using a more reliable path
const initSQL = fs.readFileSync(path.join(__dirname, '../../database/init.sql'), 'utf8');

// Test data setup
const setupTestData = async () => {
  try {
    const db = DB.getInstance();
    
    // Execute the init.sql to create tables
    await db.query(initSQL);

    // Hash the test password
    const hashedPassword = await bcrypt.hash('test', 10);

    // Insert test user with hashed password
    await db.query(`
      INSERT INTO users (first_name, last_name, email, password, role) 
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO NOTHING
    `, ['Test', 'User', 'test@test.com', hashedPassword, 'user']);

  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
};

// Clean up test data
const cleanupTestData = async () => {
  try {
    const db = DB.getInstance();
    
    // Clean up in reverse order of dependencies
    await db.query('DELETE FROM user_alerts');
    await db.query('DELETE FROM diagnostic_tests');
    await db.query('DELETE FROM monitored_destinations');
    await db.query('DELETE FROM users');

  } catch (error) {
    console.error('Error cleaning up test database:', error);
    throw error;
  }
};

// Clean up all database connections
const cleanupConnections = async () => {
  try {
    await DB.closeAllPools();
  } catch (error) {
    console.error('Error closing database connections:', error);
    throw error;
  }
};

module.exports = {
  setupTestData,
  cleanupTestData,
  cleanupConnections
}; 