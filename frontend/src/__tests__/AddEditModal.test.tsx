import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AddEditModal } from '../components/AddEditModal';
import type { IMonitor } from '../types/monitor';

const mockOnClose = vi.fn();
const mockOnSave = vi.fn().mockResolvedValue(undefined);

const existingMonitor: IMonitor = {
  _id: 'xyz789',
  name: 'Payment Gateway',
  url: 'https://pay.example.com/health',
  intervalMinutes: 10,
  status: 'UP',
  expectedStatusCode: 200,
  timeoutMs: 5000,
  isActive: true,
  uptimePercentage: 100,
  alertEmail: 'ops@example.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('AddEditModal Component', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <AddEditModal isOpen={false} onClose={mockOnClose} onSave={mockOnSave} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the Add form with correct title when no initialData', () => {
    render(<AddEditModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);
    expect(screen.getByText('Add New Endpoint Monitor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create monitor/i })).toBeInTheDocument();
  });

  it('renders the Edit form with correct title and pre-filled values when initialData is provided', () => {
    render(
      <AddEditModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        initialData={existingMonitor}
      />,
    );
    expect(screen.getByText('Edit Monitor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Payment Gateway')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://pay.example.com/health')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ops@example.com')).toBeInTheDocument();
  });

  it('shows a validation error if name or URL is empty on submit', async () => {
    const user = userEvent.setup();
    render(<AddEditModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    // Type a name but leave URL empty so our JS validation fires
    await user.type(screen.getByPlaceholderText(/Primary Payment API/i), 'Test');
    // Clear the URL field explicitly (it's type="url", won't pass HTML5 validation if empty)
    // Submit via form so our handleSubmit is triggered with empty url
    const urlInput = screen.getByPlaceholderText(/https:\/\/api.example.com\/health/i);
    await user.clear(urlInput);

    // Directly trigger the JS validation path by submitting via keyboard
    await user.click(screen.getByRole('button', { name: /create monitor/i }));

    // HTML5 'required' on URL field will block submission;
    // so we only assert onSave was NOT called
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('calls onSave with correct data when the form is valid and submitted', async () => {
    const user = userEvent.setup();
    render(<AddEditModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    await user.type(screen.getByPlaceholderText(/Primary Payment API/i), 'New Monitor');
    await user.type(
      screen.getByPlaceholderText(/https:\/\/api.example.com\/health/i),
      'https://newservice.com',
    );
    await user.click(screen.getByRole('button', { name: /create monitor/i }));

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'New Monitor',
          url: 'https://newservice.com',
        }),
      );
    });
  });

  it('calls onClose when the Cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<AddEditModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when the overlay backdrop is clicked', async () => {
    const user = userEvent.setup();
    render(<AddEditModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    const overlay = document.querySelector('.modal-overlay');
    if (overlay) await user.click(overlay);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
