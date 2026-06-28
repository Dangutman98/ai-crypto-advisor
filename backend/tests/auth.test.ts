import request from 'supertest';
import express from 'express';
import { prisma } from '../src/db';
import authRoutes from '../src/routes/auth';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  // Clear the user table before tests to ensure a clean slate
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth Endpoints', () => {
  const testUser = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123',
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', testUser.email);
      expect(res.body.user).toHaveProperty('name', testUser.name);
    });

    it('Edge Case: should fail if email is already taken', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser); // Sending the exact same user again

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'User already exists');
    });

    it('Edge Case: should fail if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'missing@example.com' }); // Missing name and password

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Missing required fields');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('Edge Case: should fail with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('Edge Case: should fail with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'doesnotexist@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });
  });
});
