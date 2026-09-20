import { Schema, model, type Document } from 'mongoose';

export type MonitorStatus = 'UP' | 'DOWN' | 'UNKNOWN';

export interface IMonitor {
  name: string;
  url: string;
  intervalMinutes: number;
  status: MonitorStatus;
  expectedStatusCode: number;
  timeoutMs: number;
  isActive: boolean;
  lastCheckedAt?: Date;
  uptimePercentage: number;
  webhookUrl?: string;
  alertEmail?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMonitorDocument extends IMonitor, Document {}

const monitorSchema = new Schema<IMonitorDocument>(
  {
    name: {
      type: String,
      required: [true, 'Monitor name is required'],
      trim: true,
      maxlength: [100, 'Monitor name cannot exceed 100 characters'],
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
      validate: {
        validator: (value: string): boolean => {
          try {
            const parsed = new URL(value);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
          } catch {
            return false;
          }
        },
        message: 'Please provide a valid HTTP or HTTPS URL',
      },
    },
    intervalMinutes: {
      type: Number,
      default: 5,
      min: [1, 'Interval must be at least 1 minute'],
      max: [1440, 'Interval cannot exceed 1440 minutes (24 hours)'],
    },
    status: {
      type: String,
      enum: {
        values: ['UP', 'DOWN', 'UNKNOWN'],
        message: 'Status must be UP, DOWN, or UNKNOWN',
      },
      default: 'UNKNOWN',
    },
    expectedStatusCode: {
      type: Number,
      default: 200,
      min: 100,
      max: 599,
    },
    timeoutMs: {
      type: Number,
      default: 10000,
      min: 1000,
      max: 60000,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastCheckedAt: {
      type: Date,
    },
    uptimePercentage: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    webhookUrl: {
      type: String,
      trim: true,
    },
    alertEmail: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Monitor = model<IMonitorDocument>('Monitor', monitorSchema);
