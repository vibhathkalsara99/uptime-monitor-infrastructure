import request from 'supertest';
import app from '../server';
import { Monitor } from '../models/Monitor';

describe('Monitors API', () => {
  const sampleMonitor = {
    name: 'Test Website',
    url: 'https://example.com',
    intervalMinutes: 5,
    expectedStatusCode: 200,
  };

  it('should create a new monitor', async () => {
    const res = await request(app)
      .post('/api/monitors')
      .send(sampleMonitor);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.name).toBe(sampleMonitor.name);
    expect(res.body.data.url).toBe(sampleMonitor.url);
  });

  it('should list monitors', async () => {
    await Monitor.create(sampleMonitor);

    const res = await request(app).get('/api/monitors');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.summary).toHaveProperty('totalMonitors');
  });

  it('should retrieve a single monitor by ID', async () => {
    const monitor = await Monitor.create(sampleMonitor);

    const res = await request(app).get(`/api/monitors/${monitor._id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(monitor._id.toString());
  });

  it('should delete a monitor', async () => {
    const monitor = await Monitor.create(sampleMonitor);

    const res = await request(app).delete(`/api/monitors/${monitor._id}`);
    expect(res.status).toBe(200);

    const check = await Monitor.findById(monitor._id);
    expect(check).toBeNull();
  });
});
