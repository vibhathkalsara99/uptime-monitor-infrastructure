import type { IMonitorsResponse, ILogsResponse, IMonitor } from '../types/monitor';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/monitors';

export const fetchMonitors = async (): Promise<IMonitorsResponse> => {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch monitors (HTTP ${res.status})`);
  }
  return res.json() as Promise<IMonitorsResponse>;
};

export const fetchMonitorLogs = async (id: string, limit = 50): Promise<ILogsResponse> => {
  const res = await fetch(`${API_BASE_URL}/${id}/logs?limit=${limit}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch monitor logs (HTTP ${res.status})`);
  }
  return res.json() as Promise<ILogsResponse>;
};

export const createMonitor = async (data: Partial<IMonitor>): Promise<IMonitor> => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = (await res.json()) as { status: string; data: IMonitor; message?: string };
  if (!res.ok) {
    throw new Error(json.message ?? 'Failed to create monitor');
  }
  return json.data;
};

export const updateMonitor = async (id: string, data: Partial<IMonitor>): Promise<IMonitor> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = (await res.json()) as { status: string; data: IMonitor; message?: string };
  if (!res.ok) {
    throw new Error(json.message ?? 'Failed to update monitor');
  }
  return json.data;
};

export const deleteMonitor = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const json = (await res.json()) as { message?: string };
    throw new Error(json.message ?? 'Failed to delete monitor');
  }
};
