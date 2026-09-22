import type { FC } from 'react';
import type { IMonitor } from '../types/monitor';

interface MonitorCardProps {
  monitor: IMonitor;
  onEdit: (monitor: IMonitor) => void;
  onDelete: (id: string, name: string) => void;
  onViewLogs: (monitor: IMonitor) => void;
  onToggleActive: (monitor: IMonitor) => void;
}

export const MonitorCard: FC<MonitorCardProps> = ({
  monitor,
  onEdit,
  onDelete,
  onViewLogs,
  onToggleActive,
}) => {
  const getStatusBadgeClass = () => {
    switch (monitor.status) {
      case 'UP':
        return 'status-badge up';
      case 'DOWN':
        return 'status-badge down';
      default:
        return 'status-badge unknown';
    }
  };

  const formatLastChecked = (timestamp?: string) => {
    if (!timestamp) return 'Never checked';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className={`monitor-card ${!monitor.isActive ? 'paused' : ''}`}>
      <div className="monitor-card-header">
        <div className="monitor-info">
          <h3 className="monitor-name">{monitor.name}</h3>
          <a
            href={monitor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="monitor-url"
            title={monitor.url}
          >
            {monitor.url}
          </a>
        </div>
        <span className={getStatusBadgeClass()}>
          {monitor.status === 'UP' && '🟢 UP'}
          {monitor.status === 'DOWN' && '🔴 DOWN'}
          {monitor.status === 'UNKNOWN' && '🟡 PENDING'}
        </span>
      </div>

      <div className="monitor-metrics">
        <div className="metric-item">
          <span className="metric-label">Check Interval</span>
          <span className="metric-value">{monitor.intervalMinutes}m</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Uptime SLA</span>
          <span
            className="metric-value"
            style={{
              color:
                monitor.uptimePercentage >= 99 ? 'var(--emerald-primary)' : 'var(--status-down)',
            }}
          >
            {monitor.uptimePercentage}%
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Last Checked</span>
          <span className="metric-value" style={{ fontSize: '0.8rem' }}>
            {formatLastChecked(monitor.lastCheckedAt)}
          </span>
        </div>
      </div>

      <div className="monitor-card-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
            onClick={() => onToggleActive(monitor)}
          >
            {monitor.isActive ? 'Pause' : 'Resume'}
          </button>
        </div>

        <div className="action-buttons">
          <button
            type="button"
            className="btn-icon"
            onClick={() => onViewLogs(monitor)}
            title="View Ping Logs & Analytics"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="btn-icon"
            onClick={() => onEdit(monitor)}
            title="Edit Monitor"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="btn-icon danger"
            onClick={() => onDelete(monitor._id, monitor.name)}
            title="Delete Monitor"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
