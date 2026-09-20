import { Schema, model, type Document, type Types } from 'mongoose';

export interface IPingLog {
  monitorId: Types.ObjectId;
  statusCode?: number;
  responseTimeMs: number;
  isUp: boolean;
  errorMessage?: string;
  timestamp: Date;
}

export interface IPingLogDocument extends IPingLog, Document {}

const pingLogSchema = new Schema<IPingLogDocument>(
  {
    monitorId: {
      type: Schema.Types.ObjectId,
      ref: 'Monitor',
      required: [true, 'Monitor ID is required'],
      index: true,
    },
    statusCode: {
      type: Number,
    },
    responseTimeMs: {
      type: Number,
      required: [true, 'Response time in milliseconds is required'],
      min: 0,
    },
    isUp: {
      type: Boolean,
      required: [true, 'isUp status flag is required'],
    },
    errorMessage: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  },
);

// Compound index for ultra-fast time-series queries per monitor
pingLogSchema.index({ monitorId: 1, timestamp: -1 });

export const PingLog = model<IPingLogDocument>('PingLog', pingLogSchema);
