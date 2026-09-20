import type { FC } from 'react';
import type { ISystemSummary } from '../types/monitor';

interface SummaryBarProps {
  summary: ISystemSummary;
}

export const SummaryBar: FC<SummaryBarProps> = ({ summary }) => {
  return (
    <div className="summary-grid">
      <div className="stat-card">
        <div className="stat-header">
          <span>Total Monitors</span>
          <div className="stat-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <div className="stat-value">{summary.totalMonitors}</div>
        <div className="stat-subtext">{summary.activeMonitors} Active background jobs</div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span>Operational</span>
          <div className="stat-icon" style={{ color: 'var(--status-up)' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <div className="stat-value" style={{ color: 'var(--status-up)' }}>
          {summary.upMonitors}
        </div>
        <div className="stat-subtext up">100% healthy status</div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span>Active Outages</span>
          <div className="stat-icon" style={{ color: 'var(--status-down)' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <div
          className="stat-value"
          style={{ color: summary.downMonitors > 0 ? 'var(--status-down)' : 'var(--text-muted)' }}
        >
          {summary.downMonitors}
        </div>
        <div className={`stat-subtext ${summary.downMonitors > 0 ? 'down' : ''}`}>
          {summary.downMonitors === 0 ? 'Zero active incidents' : 'Requires immediate attention'}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span>Overall SLA Uptime</span>
          <div className="stat-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
        <div className="stat-value">{summary.overallUptimePercentage}%</div>
        <div className="stat-subtext up">Target: 99.9% Enterprise SLA</div>
      </div>
    </div>
  );
};
