import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MonitorCard } from '../components/MonitorCard';
import type { IMonitor } from '../types/monitor';

const mockMonitor: IMonitor = {
  _id: 'abc123',
  name: 'Test API Service',
  url: 'https://api.example.com/health',
  intervalMinutes: 5,
  status: 'UP',
  expectedStatusCode: 200,
  timeoutMs: 10000,
  isActive: true,
  uptimePercentage: 99.9,
  lastCheckedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockHandlers = {
  onEdit: vi.fn(),
  onDelete: vi.fn(),
  onViewLogs: vi.fn(),
  onToggleActive: vi.fn(),
};

describe('MonitorCard Component', () => {
  it('renders the monitor name and URL', () => {
    render(<MonitorCard monitor={mockMonitor} {...mockHandlers} />);

    expect(screen.getByText('Test API Service')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com/health')).toBeInTheDocument();
  });

  it('displays the UP status badge correctly', () => {
    render(<MonitorCard monitor={mockMonitor} {...mockHandlers} />);

    const badge = screen.getByText('🟢 UP');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('status-badge', 'up');
  });

  it('displays the DOWN status badge correctly', () => {
    const downMonitor = { ...mockMonitor, status: 'DOWN' as const };
    render(<MonitorCard monitor={downMonitor} {...mockHandlers} />);

    const badge = screen.getByText('🔴 DOWN');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('status-badge', 'down');
  });

  it('displays the metrics (interval, uptime, last checked)', () => {
    render(<MonitorCard monitor={mockMonitor} {...mockHandlers} />);

    expect(screen.getByText('5m')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
  });

  it('shows "Pause" button when monitor is active', () => {
    render(<MonitorCard monitor={mockMonitor} {...mockHandlers} />);
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
  });

  it('shows "Resume" button when monitor is paused', () => {
    const pausedMonitor = { ...mockMonitor, isActive: false };
    render(<MonitorCard monitor={pausedMonitor} {...mockHandlers} />);
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
  });

  it('calls onToggleActive when Pause/Resume is clicked', async () => {
    const { rerender } = render(<MonitorCard monitor={mockMonitor} {...mockHandlers} />);
    screen.getByRole('button', { name: /pause/i }).click();
    expect(mockHandlers.onToggleActive).toHaveBeenCalledWith(mockMonitor);

    const pausedMonitor = { ...mockMonitor, isActive: false };
    rerender(<MonitorCard monitor={pausedMonitor} {...mockHandlers} />);
    screen.getByRole('button', { name: /resume/i }).click();
    expect(mockHandlers.onToggleActive).toHaveBeenCalledWith(pausedMonitor);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<MonitorCard monitor={mockMonitor} {...mockHandlers} />);
    screen.getByTitle('Delete Monitor').click();
    expect(mockHandlers.onDelete).toHaveBeenCalledWith('abc123', 'Test API Service');
  });

  it('calls onEdit when edit button is clicked', () => {
    render(<MonitorCard monitor={mockMonitor} {...mockHandlers} />);
    screen.getByTitle('Edit Monitor').click();
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockMonitor);
  });

  it('calls onViewLogs when logs button is clicked', () => {
    render(<MonitorCard monitor={mockMonitor} {...mockHandlers} />);
    screen.getByTitle('View Ping Logs & Analytics').click();
    expect(mockHandlers.onViewLogs).toHaveBeenCalledWith(mockMonitor);
  });
});
