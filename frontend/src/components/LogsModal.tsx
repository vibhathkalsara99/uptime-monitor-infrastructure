import { useState, useEffect, type FC } from 'react';
import type { IMonitor, IPingLog, ISlaStats } from '../types/monitor';
import { fetchMonitorLogs } from '../services/api';

interface LogsModalProps {
  monitor: IMonitor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LogsModal: FC<LogsModalProps> = ({ monitor, isOpen, onClose }) => {
  const [logs, setLogs] = useState<IPingLog[]>([]);
  const [sla, setSla] = useState<ISlaStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (monitor && isOpen) {
      void loadLogs(monitor._id);
    }
  }, [monitor, isOpen]);

  const loadLogs = async (monitorId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchMonitorLogs(monitorId, 50);
      setLogs(res.data);
      setSla(res.sla);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load logs';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !monitor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '780px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{monitor.name}</h2>
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {monitor.url}
            </div>
          </div>
          <button type="button" className="btn-icon" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          {sla && (
            <div className="summary-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="stat-card" style={{ padding: '1rem' }}>
                <span className="stat-header">Total Checks</span>
                <span className="stat-value" style={{ fontSize: '1.5rem' }}>
                  {sla.totalPings}
                </span>
              </div>
              <div className="stat-card" style={{ padding: '1rem' }}>
                <span className="stat-header">SLA Uptime</span>
                <span
                  className="stat-value"
                  style={{
                    fontSize: '1.5rem',
                    color:
                      sla.slaUptimePercentage >= 99
                        ? 'var(--emerald-primary)'
                        : 'var(--status-down)',
                  }}
                >
                  {sla.slaUptimePercentage}%
                </span>
              </div>
              <div className="stat-card" style={{ padding: '1rem' }}>
                <span className="stat-header">Avg Latency</span>
                <span className="stat-value" style={{ fontSize: '1.5rem' }}>
                  {sla.averageResponseTimeMs}ms
                </span>
              </div>
              <div className="stat-card" style={{ padding: '1rem' }}>
                <span className="stat-header">Failed Pings</span>
                <span
                  className="stat-value"
                  style={{
                    fontSize: '1.5rem',
                    color: sla.failedPings > 0 ? 'var(--status-down)' : 'var(--text-muted)',
                  }}
                >
                  {sla.failedPings}
                </span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
              Time-Series Ping Logs
            </h3>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '0.3rem 0.7rem', fontSize: '0.75rem' }}
              onClick={() => loadLogs(monitor._id)}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh Logs'}
            </button>
          </div>

          {error && <div style={{ color: 'var(--status-down)', fontSize: '0.85rem' }}>{error}</div>}

          {logs.length === 0 && !loading ? (
            <div className="empty-state" style={{ padding: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                No ping logs recorded yet for this endpoint.
              </p>
            </div>
          ) : (
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>HTTP Code</th>
                  <th>Latency</th>
                  <th>Timestamp</th>
                  <th>Error Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td>
                      <span
                        className={`status-badge ${log.isUp ? 'up' : 'down'}`}
                        style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
                      >
                        {log.isUp ? 'SUCCESS' : 'FAILURE'}
                      </span>
                    </td>
                    <td>{log.statusCode ?? '—'}</td>
                    <td>
                      <span
                        style={{
                          color:
                            log.responseTimeMs > 2000
                              ? 'var(--status-unknown)'
                              : 'var(--text-primary)',
                        }}
                      >
                        {log.responseTimeMs}ms
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td style={{ color: 'var(--status-down)', fontSize: '0.78rem' }}>
                      {log.errorMessage ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
