# Test Database Setup

This project now supports separate database configurations for development and testing environments, with organized test categories.

## Test Organization

### Test Categories
- **Database Tests** (`tests/database/`): Tests database connections, queries, and utilities
- **Integration Tests** (`tests/integration/`): Tests API endpoints and full request/response flows
- **Unit Tests** (`tests/unit/`): Tests individual functions and services with mocked dependencies

## Database Configurations

### Main Database (Development)
- **Host**: localhost
- **Port**: 5433
- **Database**: chicken_nuggets_insurance
- **User**: postgres
- **Password**: postgres

### Test Database
- **Host**: localhost
- **Port**: 5434
- **Database**: chicken_nuggets_insurance_test
- **User**: postgres
- **Password**: postgres

## Environment Variables

The database configuration automatically switches based on the `NODE_ENV` environment variable:

- When `NODE_ENV=test`: Uses test database configuration
- When `NODE_ENV` is anything else: Uses main database configuration

### Test Environment Variables
```bash
NODE_ENV=test
TEST_DB_HOST=localhost
TEST_DB_PORT=5434
TEST_DB_NAME=chicken_nuggets_insurance_test
TEST_DB_USER=postgres
TEST_DB_PASSWORD=postgres
```

## Running Tests

### 1. Start the test database
```bash
npm run test:db:start
```

### 2. Run specific test types
```bash
# Run all tests
npm test

# Run only database tests
npm run test:db

# Run only integration tests (API endpoints)
npm run test:integration

# Run only unit tests (mocked dependencies)
npm run test:unit

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### 3. Stop the test database
```bash
npm run test:db:stop
```

### 4. Reset the test database (stop, remove, and restart)
```bash
npm run test:db:reset
```

## Available Test Scripts

- `npm test` - Run all tests
- `npm run test:db` - Run only database tests
- `npm run test:integration` - Run only integration tests
- `npm run test:unit` - Run only unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:db:start` - Start test database container
- `npm run test:db:stop` - Stop test database container
- `npm run test:db:reset` - Reset test database container

## Test Categories Explained

### Database Tests (`tests/database/`)
- Test database connections and configurations
- Test database utility functions
- Test database query functions
- **Requires**: Test database running

### Integration Tests (`tests/integration/`)
- Test complete API endpoints
- Test request/response flows
- Test authentication flows
- **Requires**: Test database running, full application setup

### Unit Tests (`tests/unit/`)
- Test individual functions and services
- Use mocked dependencies
- Fast execution, no external dependencies
- **Requires**: No database, uses mocks

## Database Utilities

The `src/utils/db.utils.js` file provides the following exports:

- `pool` - The current active pool (main or test based on NODE_ENV)
- `mainPool` - Main database connection pool
- `testPool` - Test database connection pool
- `getPool()` - Function to get the appropriate pool based on environment
- `query(text, params, client)` - Execute database queries
- `connectTest()` - Test database connection
- `closeAllPools()` - Close all database connections (useful for tests)

## Test Setup

Tests automatically:
1. Set up test data using `setupTestData()`
2. Clean up test data using `cleanupTestData()`
3. Close database connections using `cleanupConnections()`

## Example Test Usage

### Database Test Example
```javascript
const db = require('../src/utils/db.utils');
const { setupTestData, cleanupTestData, cleanupConnections } = require('./setup');

describe('Database Configuration', () => {
  beforeAll(async () => {
    await setupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
    await cleanupConnections();
  });

  it('should connect to test database', async () => {
    const result = await db.query('SELECT 1 as test');
    expect(result).toEqual([{ test: 1 }]);
  });
});
```

### Integration Test Example
```javascript
const request = require('supertest');
const app = require('../src/main');
const { setupTestData, cleanupTestData, cleanupConnections } = require('./setup');

describe('Auth API Flow', () => {
  beforeAll(async () => {
    await setupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
    await cleanupConnections();
  });

  it('should authenticate user', async () => {
    const response = await request(app).post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'test' });
    expect(response.status).toBe(200);
  });
});
```

### Unit Test Example
```javascript
const { loginUser } = require('../src/services/auth.services');
const db = require('../src/utils/db.utils');

jest.mock('../src/utils/db.utils');

describe('Auth Services', () => {
  it('should throw error for invalid email', async () => {
    db.query.mockResolvedValue([]);
    await expect(loginUser({ email: 'nonexistent@test.com', password: 'test' }))
      .rejects.toThrow('Invalid email');
  });
});
``` 