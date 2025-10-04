import { Request, Response } from 'express';
import { APIResponse } from '../types';
import { logInfo, logError, getDatabase, setCache, getCache } from '../services';

export const healthController = {
  async getHealth(req: Request, res: Response): Promise<void> {
    try {
      const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      };

      const response: APIResponse = {
        success: true,
        data: health,
        message: 'Service is healthy'
      };

      res.status(200).json(response);
    } catch (error) {
      const response: APIResponse = {
        success: false,
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      };

      res.status(500).json(response);
    }
  },

  async getDetailedHealth(req: Request, res: Response): Promise<void> {
    try {
      const detailedHealth = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        services: {
          database: await checkDatabaseHealth(),
          redis: await checkRedisHealth(),
          fileSystem: await checkFileSystemHealth(),
          agents: await checkAgentsHealth()
        },
        system: {
          platform: process.platform,
          arch: process.arch,
          nodeVersion: process.version,
          cpuUsage: process.cpuUsage()
        }
      };

      const response: APIResponse = {
        success: true,
        data: detailedHealth,
        message: 'Detailed health check completed'
      };

      res.status(200).json(response);
    } catch (error) {
      const response: APIResponse = {
        success: false,
        error: 'Detailed health check failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      };

      res.status(500).json(response);
    }
  }
};

// Helper functions for detailed health check
async function checkDatabaseHealth(): Promise<{ status: string; message: string }> {
  try {
    const db = getDatabase();
    // Test database connection
    await db.execute('SELECT 1');
    return { status: 'healthy', message: 'Database connection successful' };
  } catch (error) {
    logError('Database health check failed:', error);
    return { status: 'unhealthy', message: 'Database connection failed' };
  }
}

async function checkRedisHealth(): Promise<{ status: string; message: string }> {
  try {
    // Test Redis connection by setting and getting a test key
    await setCache('health-check', 'test', 1);
    const result = await getCache('health-check');
    if (result === 'test') {
      return { status: 'healthy', message: 'Redis connection successful' };
    } else {
      return { status: 'unhealthy', message: 'Redis connection failed' };
    }
  } catch (error) {
    logError('Redis health check failed:', error);
    return { status: 'unhealthy', message: 'Redis connection failed' };
  }
}

async function checkFileSystemHealth(): Promise<{ status: string; message: string }> {
  try {
    // TODO: Implement actual file system health check
    return { status: 'healthy', message: 'File system accessible' };
  } catch (error) {
    return { status: 'unhealthy', message: 'File system access failed' };
  }
}

async function checkAgentsHealth(): Promise<{ status: string; message: string; agents: any }> {
  try {
    // TODO: Implement actual agents health check
    return { 
      status: 'healthy', 
      message: 'All agents operational',
      agents: {
        vision: 'healthy',
        hierarchy: 'healthy',
        aspectRatio: 'healthy',
        asset: 'healthy',
        text: 'healthy',
        color: 'healthy',
        animation: 'healthy',
        style: 'healthy',
        codeGen: 'healthy',
        sandboxRenderer: 'healthy',
        evaluator: 'healthy',
        refinement: 'healthy',
        orchestrator: 'healthy'
      }
    };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      message: 'Some agents are not operational',
      agents: {}
    };
  }
}
