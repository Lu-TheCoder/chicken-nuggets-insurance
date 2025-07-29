const request = require('supertest');
const app = require('../main');
const { setupTestData, cleanupTestData } = require('./setup');

describe('Auth API Flow', () => {
  beforeAll(async () => {
    await setupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  it('should return a 200 status code', async () => {
    const response = await request(app).post('/api/auth/login')
    .send({
      email: 'test@test.com',
      password: 'test'
    });
    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('token');
  });

  it('should return a 401 status code', async () => {
    const response = await request(app).post('/api/auth/login')
    .send({
      email: 'test@test.com',
      password: 'wrong'
    });
    expect(response.status).toBe(401);
  });
});