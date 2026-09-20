import { useState, useEffect, type FC, type FormEvent } from 'react';
import type { IMonitor } from '../types/monitor';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<IMonitor>) => Promise<void>;
  initialData?: IMonitor | null;
}

export const AddEditModal: FC<AddEditModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [intervalMinutes, setIntervalMinutes] = useState(5);
  const [expectedStatusCode, setExpectedStatusCode] = useState(200);
  const [timeoutMs, setTimeoutMs] = useState(10000);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [alertEmail, setAlertEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setUrl(initialData.url);
      setIntervalMinutes(initialData.intervalMinutes ?? 5);
      setExpectedStatusCode(initialData.expectedStatusCode ?? 200);
      setTimeoutMs(initialData.timeoutMs ?? 10000);
      setWebhookUrl(initialData.webhookUrl ?? '');
      setAlertEmail(initialData.alertEmail ?? '');
    } else {
      setName('');
      setUrl('');
      setIntervalMinutes(5);
      setExpectedStatusCode(200);
      setTimeoutMs(10000);
      setWebhookUrl('');
      setAlertEmail('');
    }
    setError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) {
      setError('Name and URL are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSave({
        name: name.trim(),
        url: url.trim(),
        intervalMinutes: Number(intervalMinutes),
        expectedStatusCode: Number(expectedStatusCode),
        timeoutMs: Number(timeoutMs),
        webhookUrl: webhookUrl.trim() || undefined,
        alertEmail: alertEmail.trim() || undefined,
      });
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save monitor';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {initialData ? 'Edit Monitor' : 'Add New Endpoint Monitor'}
          </h2>
          <button type="button" className="btn-icon" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div
                style={{
                  background: 'rgba(255, 51, 102, 0.12)',
                  border: '1px solid rgba(255, 51, 102, 0.3)',
                  color: 'var(--status-down)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                }}
              >
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Service Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Primary Payment API"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://api.example.com/health"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Ping Interval (mins)</label>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  max="1440"
                  value={intervalMinutes}
                  onChange={(e) => setIntervalMinutes(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expected Status Code</label>
                <input
                  type="number"
                  className="form-input"
                  min="100"
                  max="599"
                  value={expectedStatusCode}
                  onChange={(e) => setExpectedStatusCode(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Timeout (milliseconds)</label>
              <input
                type="number"
                className="form-input"
                min="1000"
                max="60000"
                step="500"
                value={timeoutMs}
                onChange={(e) => setTimeoutMs(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Slack/Discord Webhook URL (Optional)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://hooks.slack.com/services/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Alert Notification Email (Optional)</label>
              <input
                type="email"
                className="form-input"
                placeholder="ops-alerts@company.com"
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Monitor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
