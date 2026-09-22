import request from 'supertest';
import app from '../server';
import { Monitor } from '../models/Monitor';
import { PingLog } from '../models/PingLog';

describe('Monitor Logs API', () => {
  const sampleMonitor = {
    name: 'Test Logs Website',
    url: 'https://logs-test.com',
    intervalMinutes: 1,
    expectedStatusCode: 200,
  };

  it('should retrieve logs and calculate uptime for a monitor', async () => {
    // 1. Create a monitor
    const monitor = await Monitor.create(sampleMonitor);

    // 2. Create some sample ping logs
    await PingLog.create([
      { monitorId: monitor._id, statusCode: 200, responseTimeMs: 150, isUp: true, timestamp: new Date(Date.now() - 1000) },
      { monitorId: monitor._id, statusCode: 200, responseTimeMs: 120, isUp: true, timestamp: new Date(Date.now() - 2000) },
      { monitorId: monitor._id, statusCode: 500, responseTimeMs: 300, isUp: false, timestamp: new Date(Date.now() - 3000) },
      { monitorId: monitor._id, statusCode: 200, responseTimeMs: 140, isUp: true, timestamp: new Date(Date.now() - 4000) },
    ]);

    // 3. Fetch logs via API
    const res = await request(app).get(`/api/monitors/${monitor._id}/logs`);
    
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('monitor');
    expect(res.body.data.monitor._id).toBe(monitor._id.toString());
    
    expect(res.body.data).toHaveProperty('logs');
    expect(Array.isArray(res.body.data.logs)).toBe(true);
    expect(res.body.data.logs.length).toBe(4);

    expect(res.body.data).toHaveProperty('stats');
    expect(res.body.data.stats.totalPings).toBe(4);
    expect(res.body.data.stats.successfulPings).toBe(3);
    
    // Uptime should be 75%
    expect(res.body.data.stats.uptimePercentage).toBe(75);
  });
});
