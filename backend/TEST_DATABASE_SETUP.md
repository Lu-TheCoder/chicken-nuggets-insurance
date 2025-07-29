# Test Database Setup

This document explains how to set up and use the test database for running your test scripts.

## Overview

The test database is a separate PostgreSQL instance that runs on port 5434, isolated from your development database. This ensures that your tests don't interfere with your development data.

## Quick Start

1. **Start the test database:**
   ```bash
   npm run test:db:start
   ```

2. **Run your tests:**
   ```bash
   npm test
   ```

3. **Stop the test database when done:**
   ```bash
   npm run test:db:stop
   ```

## Available Scripts

- `npm run test:db:start` - Starts the test database container
- `npm run test:db:stop` - Stops the test database container
- `npm run test:db:reset` - Resets the test database (stops, removes, and recreates the container)
- `npm test` - Runs all tests with the test database
- `npm run test:watch` - Runs tests in watch mode
- `npm run test:coverage` - Runs tests with coverage reporting

## Database Configuration

The test database uses the following configuration:
- **Host:** localhost
- **Port:** 5434
- **Database:** chicken_nuggets_insurance_test
- **User:** postgres
- **Password:** postgres

## Test Setup

The test setup automatically:
1. Creates all necessary tables using the `init.sql` schema
2. Inserts test data (including a test user with email: `test@test.com`, password: `test`)
3. Cleans up all test data after tests complete

## Writing Tests

When writing new tests, make sure to:

1. Import the setup functions:
   ```javascript
   const { setupTestData, cleanupTestData } = require('./setup');
   ```

2. Use `beforeAll` and `afterAll` hooks:
   ```javascript
   describe('Your Test Suite', () => {
     beforeAll(async () => {
       await setupTestData();
     });

     afterAll(async () => {
       await cleanupTestData();
     });

     // Your tests here...
   });
   ```

## Troubleshooting

If you encounter issues:

1. **Database connection errors:** Make sure the test database is running:
   ```bash
   npm run test:db:start
   ```

2. **Port conflicts:** Ensure port 5434 is available. You can change it in `docker-compose.yml` if needed.

3. **Reset the database:** If the database gets into a bad state:
   ```bash
   npm run test:db:reset
   ```

4. **Check container status:**
   ```bash
   docker-compose ps
   ```

## Environment Variables

The test environment automatically sets these variables:
- `NODE_ENV=test`
- `TEST_DB_HOST=localhost`
- `TEST_DB_PORT=5434`
- `TEST_DB_NAME=chicken_nuggets_insurance_test`
- `TEST_DB_USER=postgres`
- `TEST_DB_PASSWORD=postgres` 