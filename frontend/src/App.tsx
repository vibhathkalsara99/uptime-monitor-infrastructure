import type { FC } from 'react';

const App: FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="status-indicator" aria-label="System operational" />
        <h1 className="app-title">Uptime Monitor</h1>
        <p className="app-subtitle">Real-time server health monitoring — coming soon</p>
      </header>
    </div>
  );
};

export default App;
