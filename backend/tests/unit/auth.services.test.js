const { loginUser, signupUser } = require('../../src/services/auth.services');
const DB = require('../../src/utils/db.v2.utils');

// Mock the database module
jest.mock('../../src/utils/db.v2.utils');
jest.mock('bcrypt');

describe('Auth Services - Unit Tests', () => {
  let mockDB;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create a mock DB instance
    mockDB = {
      query: jest.fn(),
      getInstance: jest.fn()
    };
    
    // Mock the getInstance method to return our mock
    DB.getInstance.mockReturnValue(mockDB);
  });

  describe('loginUser', () => {
    it('should throw error for invalid email', async () => {
      // Mock empty user result
      mockDB.query.mockResolvedValue({ rows: [] });

      await expect(loginUser({ email: 'nonexistent@test.com', password: 'test' }))
        .rejects.toThrow('Invalid email');
    });

    it('should throw error for invalid password', async () => {
      // Mock user found but wrong password
      const mockUser = [{ id: 1, email: 'test@test.com', password: 'hashedPassword' }];
      mockDB.query.mockResolvedValue({ rows: mockUser });

      // Mock bcrypt.compare to return false (wrong password)
      const bcrypt = require('bcrypt');
      bcrypt.compare.mockResolvedValue(false);

      await expect(loginUser({ email: 'test@test.com', password: 'wrong' }))
        .rejects.toThrow('Invalid password');
    });
  });

  describe('signupUser', () => {
    it('should throw error if user already exists', async () => {
      // Mock existing user
      const mockUser = [{ id: 1, email: 'existing@test.com' }];
      mockDB.query.mockResolvedValue({ rows: mockUser });

      await expect(signupUser('Test', 'User', 'existing@test.com', 'password'))
        .rejects.toThrow('User already exists');
    });
  });
}); 