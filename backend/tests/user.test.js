const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('User API - Login', () => {

  it('should fail login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode === 404).toBe(true); // Assert.That-style
    expect(/user not found/i.test(res.body.message)).toBe(true); // Assert.That-style
  });

    it('should login with correct credentials', async () => {
    const res = await request(app)
        .post('/api/users/login')
        .send({
        email: 'test5@example.com',
        password: 'testuser5'
        });

    console.log('STATUS:', res.statusCode);
    console.log('BODY:', res.body);

    expect(res.statusCode === 200).toBe(true);
    expect('token' in res.body).toBe(true);
    });


  afterAll(async () => {
    await mongoose.connection.close();
  });

});
