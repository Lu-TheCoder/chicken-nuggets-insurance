// Set environment variables for tests
process.env.NODE_ENV = 'test';
process.env.TEST_DB_HOST = 'localhost';
process.env.TEST_DB_PORT = '5434';
process.env.TEST_DB_NAME = 'chicken_nuggets_insurance_test';
process.env.TEST_DB_USER = 'postgres';
process.env.TEST_DB_PASSWORD = 'postgres';

// Suppress console logs during tests (except for test-related logs)
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
  const message = args.join(' ');
  // Only show logs that are test-related or from our test setup
  if (message.includes('Test database') || 
      message.includes('Database connections') ||
      message.includes('Jest') ||
      message.includes('PASS') ||
      message.includes('FAIL')) {
    originalConsoleLog(...args);
  }
};

console.error = (...args) => {
  const message = args.join(' ');
  // Only show errors that are test-related or important
  if (message.includes('Test database') || 
      message.includes('DB') ||
      message.includes('Jest') ||
      message.includes('Error setting up') ||
      message.includes('Error cleaning up')) {
    originalConsoleError(...args);
  }
}; 