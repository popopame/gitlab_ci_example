import request from 'supertest';

import app from '../app';

describe('GET /', () => {
  it('should response Hello World!', async () => {
    process.env.ENVIRONMENT = 'test';

    const response = await request(app).get('/');

    expect(response.text).toBe('Hello World! Je suis sur test');
    expect(response.statusCode).toBe(200);
  })
});