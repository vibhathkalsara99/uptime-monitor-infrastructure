export type MonitorStatus = 'UP' | 'DOWN' | 'UNKNOWN';

export interface IMonitor {
  _id: string;
  name: string;
  url: string;
  intervalMinutes: number;
  status: MonitorStatus;
  expectedStatusCode: number;
  timeoutMs: number;
  isActive: boolean;
  lastCheckedAt?: string;
  uptimePercentage: number;
  webhookUrl?: string;
  alertEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPingLog {
  _id: string;
  monitorId: string;
  statusCode?: number;
  responseTimeMs: number;
  isUp: boolean;
  errorMessage?: string;
  timestamp: string;
}

export interface ISystemSummary {
  totalMonitors: number;
  activeMonitors: number;
  upMonitors: number;
  downMonitors: number;
  overallUptimePercentage: number;
}

export interface ISlaStats {
  totalPings: number;
  successfulPings: number;
  failedPings: number;
  slaUptimePercentage: number;
  averageResponseTimeMs: number;
}

export interface IMonitorsResponse {
  status: 'success' | 'error';
  summary: ISystemSummary;
  data: IMonitor[];
  message?: string;
}

export interface ILogsResponse {
  status: 'success' | 'error';
  sla: ISlaStats;
  data: IPingLog[];
  message?: string;
}
