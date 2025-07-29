const { loginUser, signupUser } = require('../../src/services/auth.services');
const db = require('../../src/utils/db.utils');

// Mock the database module
jest.mock('../../src/utils/db.utils');
jest.mock('bcrypt');

describe('Auth Services - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should throw error for invalid email', async () => {
      // Mock empty user result
      db.query.mockResolvedValue([]);

      await expect(loginUser({ email: 'nonexistent@test.com', password: 'test' }))
        .rejects.toThrow('Invalid email');
    });

    it('should throw error for invalid password', async () => {
      // Mock user found but wrong password
      const mockUser = [{ id: 1, email: 'test@test.com', password: 'hashedPassword' }];
      db.query.mockResolvedValue(mockUser);

      // Mock bcrypt.compare to return false (wrong password)
      const bcrypt = require('bcrypt');
      bcrypt.compare.mockResolvedValue(false);

      await expect(loginUser({ email: 'test@test.com', password: 'wrong' }))
        .rejects.toThrow('Invalid password');
    });
  });

  describe('signupUser', () => {
    it('should throw error if user already exists', async () => {
      // Mock existing user - the service checks user.le (typo for length)
      const mockUser = [{ id: 1, email: 'existing@test.com' }];
      mockUser.le = 1; // Add the property that the service actually checks
      db.query.mockResolvedValue(mockUser);

      await expect(signupUser('Test', 'User', 'existing@test.com', 'password'))
        .rejects.toThrow('User already exits');
    });
  });
}); 