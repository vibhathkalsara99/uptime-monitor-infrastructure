import type { Request, Response } from 'express';
import { Monitor, PingLog } from '../models';
import { isValidObjectId } from 'mongoose';

interface CreateMonitorBody {
  name?: string;
  url?: string;
  intervalMinutes?: number;
  expectedStatusCode?: number;
  timeoutMs?: number;
  webhookUrl?: string;
  alertEmail?: string;
}

interface UpdateMonitorBody {
  name?: string;
  url?: string;
  intervalMinutes?: number;
  expectedStatusCode?: number;
  timeoutMs?: number;
  isActive?: boolean;
  webhookUrl?: string;
  alertEmail?: string;
}

// ─────────────────────────────────────────────────────────────
// POST /api/monitors — Create a new monitor
// ─────────────────────────────────────────────────────────────
export const createMonitor = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as CreateMonitorBody;
  const name = body.name?.trim();
  const url = body.url?.trim();
  const intervalMinutes = body.intervalMinutes;
  const expectedStatusCode = body.expectedStatusCode;
  const timeoutMs = body.timeoutMs;
  const webhookUrl = body.webhookUrl?.trim();
  const alertEmail = body.alertEmail?.trim();

  if (!name || !url) {
    res.status(400).json({
      status: 'error',
      message: 'Monitor name and URL are required.',
    });
    return;
  }

  const createPayload: Record<string, unknown> = {
    name,
    url,
    intervalMinutes: intervalMinutes ?? 5,
    expectedStatusCode: expectedStatusCode ?? 200,
    timeoutMs: timeoutMs ?? 10000,
  };

  if (webhookUrl) {
    createPayload.webhookUrl = webhookUrl;
  }
  if (alertEmail) {
    createPayload.alertEmail = alertEmail;
  }

  const newMonitor = await Monitor.create(createPayload);

  res.status(201).json({
    status: 'success',
    data: newMonitor,
  });
};

// ─────────────────────────────────────────────────────────────
// GET /api/monitors — List all monitors + overall system metrics
// ─────────────────────────────────────────────────────────────
export const getMonitors = async (_req: Request, res: Response): Promise<void> => {
  const monitors = await Monitor.find().sort({ createdAt: -1 });

  const totalMonitors = monitors.length;
  const upMonitors = monitors.filter((m) => m.status === 'UP').length;
  const downMonitors = monitors.filter((m) => m.status === 'DOWN').length;
  const activeMonitors = monitors.filter((m) => m.isActive).length;

  const overallUptimePercentage =
    totalMonitors > 0
      ? parseFloat(
          (monitors.reduce((acc, m) => acc + m.uptimePercentage, 0) / totalMonitors).toFixed(2),
        )
      : 100;

  res.status(200).json({
    status: 'success',
    summary: {
      totalMonitors,
      activeMonitors,
      upMonitors,
      downMonitors,
      overallUptimePercentage,
    },
    data: monitors,
  });
};

// ─────────────────────────────────────────────────────────────
// GET /api/monitors/:id — Get a single monitor by ID
// ─────────────────────────────────────────────────────────────
export const getMonitorById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid monitor ID format.',
    });
    return;
  }

  const monitor = await Monitor.findById(id);

  if (!monitor) {
    res.status(404).json({
      status: 'error',
      message: 'Monitor not found.',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: monitor,
  });
};

// ─────────────────────────────────────────────────────────────
// GET /api/monitors/:id/logs — Fetch historical ping logs & SLA stats
// ─────────────────────────────────────────────────────────────
export const getMonitorLogs = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const limitParam = typeof req.query.limit === 'string' ? req.query.limit : '50';
  const limit = Math.min(parseInt(limitParam, 10), 500);

  if (!isValidObjectId(id)) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid monitor ID format.',
    });
    return;
  }

  const monitor = await Monitor.findById(id);
  if (!monitor) {
    res.status(404).json({
      status: 'error',
      message: 'Monitor not found.',
    });
    return;
  }

  const logs = await PingLog.find({ monitorId: id }).sort({ timestamp: -1 }).limit(limit);

  const totalPings = logs.length;
  const successfulPings = logs.filter((l) => l.isUp).length;
  const slaUptimePercentage =
    totalPings > 0 ? parseFloat(((successfulPings / totalPings) * 100).toFixed(2)) : 100;
  const averageResponseTimeMs =
    totalPings > 0
      ? Math.round(logs.reduce((acc, l) => acc + l.responseTimeMs, 0) / totalPings)
      : 0;

  res.status(200).json({
    status: 'success',
    sla: {
      totalPings,
      successfulPings,
      failedPings: totalPings - successfulPings,
      slaUptimePercentage,
      averageResponseTimeMs,
    },
    data: logs,
  });
};

// ─────────────────────────────────────────────────────────────
// PUT /api/monitors/:id — Update monitor configuration
// ─────────────────────────────────────────────────────────────
export const updateMonitor = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const body = req.body as UpdateMonitorBody;

  if (!isValidObjectId(id)) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid monitor ID format.',
    });
    return;
  }

  const monitor = await Monitor.findById(id);

  if (!monitor) {
    res.status(404).json({
      status: 'error',
      message: 'Monitor not found.',
    });
    return;
  }

  if (body.name !== undefined) {
    monitor.name = body.name.trim();
  }
  if (body.url !== undefined) {
    monitor.url = body.url.trim();
  }
  if (body.intervalMinutes !== undefined) {
    monitor.intervalMinutes = body.intervalMinutes;
  }
  if (body.expectedStatusCode !== undefined) {
    monitor.expectedStatusCode = body.expectedStatusCode;
  }
  if (body.timeoutMs !== undefined) {
    monitor.timeoutMs = body.timeoutMs;
  }
  if (body.isActive !== undefined) {
    monitor.isActive = body.isActive;
  }
  if (body.webhookUrl !== undefined) {
    monitor.webhookUrl = body.webhookUrl.trim();
  }
  if (body.alertEmail !== undefined) {
    monitor.alertEmail = body.alertEmail.trim();
  }

  await monitor.save();

  res.status(200).json({
    status: 'success',
    data: monitor,
  });
};

// ─────────────────────────────────────────────────────────────
// DELETE /api/monitors/:id — Delete monitor & clear its ping logs
// ─────────────────────────────────────────────────────────────
export const deleteMonitor = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid monitor ID format.',
    });
    return;
  }

  const monitor = await Monitor.findByIdAndDelete(id);

  if (!monitor) {
    res.status(404).json({
      status: 'error',
      message: 'Monitor not found.',
    });
    return;
  }

  // Cascade delete associated ping logs
  await PingLog.deleteMany({ monitorId: id });

  res.status(200).json({
    status: 'success',
    message: `Monitor '${monitor.name}' and all associated logs deleted successfully.`,
  });
};
