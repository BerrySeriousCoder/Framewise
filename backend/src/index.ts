import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';

import componentRoutes from './routes/components';
import healthRoutes from './routes/health';

import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

import { initializeServices, logInfo, logError } from './services';

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(morgan('combined'));
app.use(requestLogger);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/health', healthRoutes);
app.use('/api/components', componentRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'PixelPerfect Component Generator API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      components: '/api/components'
    }
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

app.use(errorHandler);

async function startServer() {
  try {
    await initializeServices();
    
    server.listen(PORT, () => {
      logInfo(`Server running on port ${PORT}`);
      logInfo(`Health check: http://localhost:${PORT}/api/health`);
      logInfo(`API docs: http://localhost:${PORT}/api`);
      logInfo(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logError('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', () => {
  logInfo('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logInfo('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logInfo('SIGINT received, shutting down gracefully');
  server.close(() => {
    logInfo('Server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (error) => {
  logError('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logError('Unhandled Rejection at:', { promise, reason });
  process.exit(1);
});

startServer();

export default app;
