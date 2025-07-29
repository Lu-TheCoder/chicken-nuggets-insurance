const DB = require('../../src/utils/db.v2.utils');
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
    const db = DB.getInstance();
    const result = await db.query('SELECT 1 as test');
    expect(result.rows).toEqual([{ test: 1 }]);
  });

  it('should be able to query the users table', async () => {
    const db = DB.getInstance();
    const users = await db.query('SELECT * FROM users WHERE email = $1', ['test@test.com']);
    expect(users.rows).toHaveLength(1);
    expect(users.rows[0].email).toBe('test@test.com');
  });

  it('should use the correct database configuration', () => {
    const db = DB.getInstance();
    
    // Verify the instance exists
    expect(db).toBeDefined();
    
    // Verify we're using the test environment
    expect(db.isTestEnvironment()).toBe(true);
    
    // Verify we can get the pool
    const pool = db.getPool();
    expect(pool).toBeDefined();
  });
}); 