import { useState, useEffect, useCallback, type FC } from 'react';
import type { IMonitor, ISystemSummary } from './types/monitor';
import { fetchMonitors, createMonitor, updateMonitor, deleteMonitor } from './services/api';
import { Navbar } from './components/Navbar';
import { SummaryBar } from './components/SummaryBar';
import { MonitorCard } from './components/MonitorCard';
import { AddEditModal } from './components/AddEditModal';
import { LogsModal } from './components/LogsModal';

const App: FC = () => {
  const [monitors, setMonitors] = useState<IMonitor[]>([]);
  const [summary, setSummary] = useState<ISystemSummary>({
    totalMonitors: 0,
    activeMonitors: 0,
    upMonitors: 0,
    downMonitors: 0,
    overallUptimePercentage: 100,
  });

  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'UP' | 'DOWN'>('ALL');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMonitor, setEditingMonitor] = useState<IMonitor | null>(null);
  const [logsMonitor, setLogsMonitor] = useState<IMonitor | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loadData = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      setIsRefreshing(true);
      setError(null);

      const res = await fetchMonitors();
      setMonitors(res.data);
      setSummary(res.summary);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect to Uptime API';
      setError(msg);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    void loadData();
  }, [loadData]);

  // Auto-refresh interval ticker (every 10 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      void loadData(true);
    }, 10000);
    return () => clearInterval(timer);
  }, [loadData]);

  const handleSaveMonitor = async (data: Partial<IMonitor>) => {
    if (editingMonitor) {
      await updateMonitor(editingMonitor._id, data);
    } else {
      await createMonitor(data);
    }
    void loadData(true);
  };

  const handleDeleteMonitor = async (id: string, name: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete '${name}' monitor and all its historical logs?`,
      )
    ) {
      try {
        await deleteMonitor(id);
        void loadData(true);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to delete monitor';
        alert(msg);
      }
    }
  };

  const handleToggleActive = async (monitor: IMonitor) => {
    try {
      await updateMonitor(monitor._id, { isActive: !monitor.isActive });
      void loadData(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update monitor state';
      alert(msg);
    }
  };

  const filteredMonitors = monitors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="app-bg-glow" />

      <Navbar
        onOpenAddModal={() => {
          setEditingMonitor(null);
          setIsAddModalOpen(true);
        }}
        onRefresh={() => loadData(false)}
        isRefreshing={isRefreshing}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
        {/* Hero Section */}
        <div className="hero-banner">
          <div className="pill-category">✨ Real-Time Infrastructure Monitoring</div>
          <h1 className="hero-title">Automated Server Health & SLA Analytics</h1>
          <p className="hero-subtitle">
            Proactive background HTTP polling, real-time outage alerts, and enterprise SLA uptime
            tracking.
          </p>
        </div>

        {/* System Summary Bar */}
        <SummaryBar summary={summary} />

        {/* Section Header & Search Controls */}
        <div className="section-header">
          <h2 className="section-title">
            <span>Monitored Endpoints</span>
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--emerald-primary)',
                background: 'var(--emerald-subtle)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
              }}
            >
              {filteredMonitors.length}
            </span>
          </h2>

          <div className="search-filter-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              type="button"
              className={`btn-secondary ${filterStatus === 'ALL' ? 'active' : ''}`}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
              onClick={() => setFilterStatus('ALL')}
            >
              All
            </button>
            <button
              type="button"
              className={`btn-secondary ${filterStatus === 'UP' ? 'active' : ''}`}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem', color: 'var(--status-up)' }}
              onClick={() => setFilterStatus('UP')}
            >
              Healthy
            </button>
            <button
              type="button"
              className={`btn-secondary ${filterStatus === 'DOWN' ? 'active' : ''}`}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem', color: 'var(--status-down)' }}
              onClick={() => setFilterStatus('DOWN')}
            >
              Outages
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: 'rgba(255, 51, 102, 0.12)',
              border: '1px solid rgba(255, 51, 102, 0.3)',
              color: 'var(--status-down)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>⚠️ {error}</span>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}
              onClick={() => loadData(false)}
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="empty-state">
            <div className="pulse-dot" style={{ width: '20px', height: '20px' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Loading monitored endpoints...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredMonitors.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>No Monitored Endpoints Found</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '40ch' }}>
              {searchQuery
                ? 'No monitors matched your search query.'
                : 'Start tracking your server APIs, web applications, and microservices in real time.'}
            </p>
            <button
              type="button"
              className="btn-primary"
              style={{ marginTop: '0.5rem' }}
              onClick={() => {
                setEditingMonitor(null);
                setIsAddModalOpen(true);
              }}
            >
              + Add First Monitor
            </button>
          </div>
        )}

        {/* Monitors Grid */}
        {!loading && filteredMonitors.length > 0 && (
          <div className="monitors-grid">
            {filteredMonitors.map((monitor) => (
              <MonitorCard
                key={monitor._id}
                monitor={monitor}
                onEdit={(m) => {
                  setEditingMonitor(m);
                  setIsAddModalOpen(true);
                }}
                onDelete={handleDeleteMonitor}
                onViewLogs={(m) => setLogsMonitor(m)}
                onToggleActive={handleToggleActive}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      <AddEditModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMonitor(null);
        }}
        onSave={handleSaveMonitor}
        initialData={editingMonitor}
      />

      {/* Time-Series Logs & SLA Analytics Modal */}
      <LogsModal
        isOpen={Boolean(logsMonitor)}
        onClose={() => setLogsMonitor(null)}
        monitor={logsMonitor}
      />
    </>
  );
};

export default App;
