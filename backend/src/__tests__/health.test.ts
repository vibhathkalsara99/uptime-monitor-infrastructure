import request from 'supertest';
import app from '../server';

describe('Health Check API', () => {
  it('should return 200 OK and status message', async () => {
    const res = await request(app).get('/health');
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('message', 'Uptime Monitor API is running');
    expect(res.body).toHaveProperty('environment', 'test');
    expect(res.body).toHaveProperty('timestamp');
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('message', 'Route not found');
  });
});
