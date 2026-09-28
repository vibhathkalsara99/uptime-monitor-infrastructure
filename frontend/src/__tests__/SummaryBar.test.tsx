import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SummaryBar } from '../components/SummaryBar';
import type { ISystemSummary } from '../types/monitor';

const healthySummary: ISystemSummary = {
  totalMonitors: 10,
  activeMonitors: 8,
  upMonitors: 7,
  downMonitors: 0,
  overallUptimePercentage: 99.9,
};

const criticalSummary: ISystemSummary = {
  totalMonitors: 5,
  activeMonitors: 5,
  upMonitors: 3,
  downMonitors: 2,
  overallUptimePercentage: 60,
};

describe('SummaryBar Component', () => {
  it('renders all four stat cards', () => {
    render(<SummaryBar summary={healthySummary} />);

    expect(screen.getByText('Total Monitors')).toBeInTheDocument();
    expect(screen.getByText('Operational')).toBeInTheDocument();
    expect(screen.getByText('Active Outages')).toBeInTheDocument();
    expect(screen.getByText('Overall SLA Uptime')).toBeInTheDocument();
  });

  it('displays correct summary values', () => {
    render(<SummaryBar summary={healthySummary} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
  });

  it('shows "Zero active incidents" text when no outages', () => {
    render(<SummaryBar summary={healthySummary} />);
    expect(screen.getByText('Zero active incidents')).toBeInTheDocument();
  });

  it('shows "Requires immediate attention" when there are outages', () => {
    render(<SummaryBar summary={criticalSummary} />);
    expect(screen.getByText('Requires immediate attention')).toBeInTheDocument();
  });

  it('applies "down" class to outages subtext when downMonitors > 0', () => {
    render(<SummaryBar summary={criticalSummary} />);
    const alertText = screen.getByText('Requires immediate attention');
    expect(alertText).toHaveClass('down');
  });

  it('shows active background jobs count', () => {
    render(<SummaryBar summary={healthySummary} />);
    expect(screen.getByText('8 Active background jobs')).toBeInTheDocument();
  });
});
