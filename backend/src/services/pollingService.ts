import { Monitor, PingLog, type IMonitorDocument } from '../models';
import { dispatchAlert } from './alertService';

let pollingTimer: NodeJS.Timeout | null = null;
const TICK_INTERVAL_MS = 60 * 1000; // Run check cycle every 60 seconds

/**
 * Pings a single monitor endpoint, logs the result to MongoDB, and updates monitor status.
 */
export const pingMonitor = async (monitor: IMonitorDocument): Promise<void> => {
  const startTime = performance.now();
  let statusCode: number | undefined;
  let isUp = false;
  let errorMessage: string | undefined;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), monitor.timeoutMs);

    const response = await fetch(monitor.url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'UptimeMonitor-PollingEngine/1.0',
      },
    });

    clearTimeout(timeoutId);
    const endTime = performance.now();
    const responseTimeMs = Math.round(endTime - startTime);

    statusCode = response.status;
    const expected = monitor.expectedStatusCode || 200;

    if (response.status === expected || (expected === 200 && response.ok)) {
      isUp = true;
    } else {
      isUp = false;
      errorMessage = `HTTP status ${response.status} did not match expected ${expected}`;
    }

    await recordPingAndStatus(monitor, statusCode, responseTimeMs, isUp, errorMessage);
  } catch (error: unknown) {
    const endTime = performance.now();
    const responseTimeMs = Math.round(endTime - startTime);
    isUp = false;

    if (error instanceof Error) {
      errorMessage =
        error.name === 'AbortError'
          ? `Request timed out after ${monitor.timeoutMs}ms`
          : error.message;
    } else {
      errorMessage = 'Unknown network error';
    }

    await recordPingAndStatus(monitor, statusCode, responseTimeMs, isUp, errorMessage);
  }
};

/**
 * Persists the ping log, calculates SLA uptime, updates monitor status, and dispatches alerts on status transition.
 */
const recordPingAndStatus = async (
  monitor: IMonitorDocument,
  statusCode: number | undefined,
  responseTimeMs: number,
  isUp: boolean,
  errorMessage?: string,
): Promise<void> => {
  try {
    // 1. Create PingLog payload matching exactOptionalPropertyTypes
    const pingLogPayload: Record<string, unknown> = {
      monitorId: monitor._id,
      responseTimeMs,
      isUp,
      timestamp: new Date(),
    };

    if (statusCode !== undefined) {
      pingLogPayload.statusCode = statusCode;
    }
    if (errorMessage !== undefined) {
      pingLogPayload.errorMessage = errorMessage;
    }

    await PingLog.create(pingLogPayload);

    // 2. Calculate new SLA Uptime Percentage from logs
    const totalPings = await PingLog.countDocuments({ monitorId: monitor._id });
    const successfulPings = await PingLog.countDocuments({ monitorId: monitor._id, isUp: true });

    const newUptimePercentage =
      totalPings > 0 ? parseFloat(((successfulPings / totalPings) * 100).toFixed(2)) : 100;

    // 3. Track state transitions for alerting
    const previousStatus = monitor.status;
    const newStatus = isUp ? 'UP' : 'DOWN';

    monitor.status = newStatus;
    monitor.lastCheckedAt = new Date();
    monitor.uptimePercentage = newUptimePercentage;

    await monitor.save();

    // 4. Dispatch Alert on State Transition
    if (previousStatus !== newStatus && previousStatus !== 'UNKNOWN') {
      const alertType = newStatus === 'DOWN' ? 'DOWN' : 'RECOVERY';
      void dispatchAlert(monitor, alertType, previousStatus, statusCode, errorMessage);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error recording ping log';
    console.error(`[POLLING ERROR] Monitor ${monitor.name} (${monitor.url}): ${msg}`);
  }
};

/**
 * Scans MongoDB for active monitors due for a ping check.
 */
export const pollActiveMonitors = async (): Promise<void> => {
  try {
    const activeMonitors = await Monitor.find({ isActive: true });

    const now = new Date().getTime();

    const dueMonitors = activeMonitors.filter((m) => {
      if (!m.lastCheckedAt) {
        return true;
      }
      const elapsedMs = now - new Date(m.lastCheckedAt).getTime();
      const intervalMs = m.intervalMinutes * 60 * 1000;
      return elapsedMs >= intervalMs - 5000; // 5 sec threshold window
    });

    if (dueMonitors.length === 0) {
      return;
    }

    console.log(`[POLLING ENGINE] Checking ${dueMonitors.length} monitor(s)...`);

    await Promise.allSettled(dueMonitors.map((monitor) => pingMonitor(monitor)));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error during polling cycle';
    console.error(`[POLLING ENGINE ERROR] ${msg}`);
  }
};

/**
 * Starts the background polling interval loop.
 */
export const startPollingEngine = (): void => {
  if (pollingTimer) {
    console.log('[POLLING ENGINE] Already running.');
    return;
  }

  console.log('⏰ [POLLING ENGINE] Background service started (scanning every 60s)');

  // Run an immediate check on startup
  void pollActiveMonitors();

  // Schedule recurring checks every 60 seconds
  pollingTimer = setInterval(() => {
    void pollActiveMonitors();
  }, TICK_INTERVAL_MS);
};

/**
 * Stops the background polling interval loop cleanly.
 */
export const stopPollingEngine = (): void => {
  if (pollingTimer) {
    clearInterval(pollingTimer);
    pollingTimer = null;
    console.log('⏹️ [POLLING ENGINE] Background service stopped.');
  }
};
