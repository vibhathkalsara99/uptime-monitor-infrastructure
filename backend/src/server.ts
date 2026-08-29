import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// ─────────────────────────────────────────────────────────────
// App Initialization
// ─────────────────────────────────────────────────────────────
const app: Application = express();
const PORT: number = parseInt(process.env.PORT ?? '5000', 10);
const NODE_ENV: string = process.env.NODE_ENV ?? 'development';

// ─────────────────────────────────────────────────────────────
// Global Middleware
// ─────────────────────────────────────────────────────────────
app.use(helmet());                          // Security headers
app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*' }));
app.use(express.json({ limit: '10kb' }));   // Body parser (JSON)
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─────────────────────────────────────────────────────────────
// Health Check Route
// ─────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Uptime Monitor API is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────────────────────
// 404 Handler — Unknown Routes
// ─────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// ─────────────────────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({
    status: 'error',
    message: NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

// ─────────────────────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Server running in [${NODE_ENV}] mode`);
  console.log(`📡  Listening on http://localhost:${PORT}`);
  console.log(`❤️   Health check: http://localhost:${PORT}/health\n`);
});

export default app;
