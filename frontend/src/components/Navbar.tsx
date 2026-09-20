import type { FC } from 'react';

interface NavbarProps {
  onOpenAddModal: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Navbar: FC<NavbarProps> = ({ onOpenAddModal, onRefresh, isRefreshing }) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="/" className="brand">
          <div className="brand-icon">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="brand-title">
            Agent<span>OS</span> Uptime
          </span>
        </a>

        <div className="nav-actions">
          <div className="live-badge">
            <span className="pulse-dot" />
            <span>Live Monitoring Active</span>
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh monitor data"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                transform: isRefreshing ? 'rotate(360deg)' : 'none',
                transition: 'transform 0.6s ease',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
          </button>

          <button type="button" className="btn-primary" onClick={onOpenAddModal}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Monitor</span>
          </button>
        </div>
      </div>
    </header>
  );
};
