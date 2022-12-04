const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');

const api = supertest(app);

describe('GET /api/blogs', () => {
  test('responds with json', async () => {
    await api.get('/api/blogs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});