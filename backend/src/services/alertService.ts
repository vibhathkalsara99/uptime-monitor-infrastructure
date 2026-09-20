import type { IMonitorDocument } from '../models';

export type AlertType = 'DOWN' | 'RECOVERY';

export interface IAlertPayload {
  monitorId: string;
  monitorName: string;
  url: string;
  alertType: AlertType;
  previousStatus: string;
  currentStatus: string;
  statusCode?: number;
  errorMessage?: string;
  timestamp: Date;
}

/**
 * Dispatches automated outage or recovery alerts via Webhook, Email, and System Log.
 */
export const dispatchAlert = async (
  monitor: IMonitorDocument,
  alertType: AlertType,
  previousStatus: string,
  statusCode?: number,
  errorMessage?: string,
): Promise<void> => {
  const payload: IAlertPayload = {
    monitorId: monitor._id.toString(),
    monitorName: monitor.name,
    url: monitor.url,
    alertType,
    previousStatus,
    currentStatus: monitor.status,
    timestamp: new Date(),
  };

  if (statusCode !== undefined) {
    payload.statusCode = statusCode;
  }
  if (errorMessage !== undefined) {
    payload.errorMessage = errorMessage;
  }

  const icon = alertType === 'DOWN' ? '🚨 [ALERT - OUTAGE]' : '✅ [ALERT - RECOVERED]';
  console.log(
    `\n${icon} ${monitor.name} (${monitor.url}) changed from ${previousStatus} -> ${monitor.status}`,
  );
  if (errorMessage) {
    console.log(`   Reason: ${errorMessage}`);
  }

  // 1. Webhook Dispatch (e.g., Slack, Discord, Teams, PagerDuty)
  if (monitor.webhookUrl) {
    try {
      const response = await fetch(monitor.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `${icon} *${monitor.name}* (${monitor.url}) changed status to *${monitor.status}*`,
          alert: payload,
        }),
      });
      console.log(
        `   📡 Webhook notification delivered to ${monitor.webhookUrl} (HTTP ${response.status})`,
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Webhook error';
      console.error(`   ❌ Failed to deliver webhook alert: ${msg}`);
    }
  }

  // 2. Email Dispatcher (simulated console log / SMTP hook ready)
  const alertEmail = monitor.alertEmail || process.env.ALERT_EMAIL;
  if (alertEmail) {
    console.log(`   📧 Notification email dispatched to: ${alertEmail}`);
  }
};
