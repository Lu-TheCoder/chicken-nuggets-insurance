const db = require('../../src/utils/db.utils');
const { setupTestData, cleanupTestData, cleanupConnections } = require('../setup');

describe('Database Configuration', () => {
  beforeAll(async () => {
    await setupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
    await cleanupConnections();
  });

  it('should connect to test database when NODE_ENV is test', async () => {
    // Verify we're using the test database
    expect(process.env.NODE_ENV).toBe('test');
    
    // Test a simple query
    const result = await db.query('SELECT 1 as test');
    expect(result).toEqual([{ test: 1 }]);
  });

  it('should be able to query the users table', async () => {
    const users = await db.query('SELECT * FROM users WHERE email = $1', ['test@test.com']);
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('test@test.com');
  });

  it('should use the correct database configuration', () => {
    const testPool = db.testPool;
    const mainPool = db.mainPool;
    
    // Verify both pools exist
    expect(testPool).toBeDefined();
    expect(mainPool).toBeDefined();
    
    // Verify we're using the test pool in test environment
    expect(db.getPool()).toBe(testPool);
  });
}); 