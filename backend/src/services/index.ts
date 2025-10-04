import { initializeLogger, logInfo } from './logger';
import { initializeDatabase } from './database';
import { initializeCache } from './cache';

export const initializeServices = async (): Promise<void> => {
  try {
    logInfo('Initializing services...');
    
    await initializeLogger();
    logInfo('Logger initialized');
    
    await initializeCache();
    logInfo('Cache initialized');
    
    await initializeDatabase();
    logInfo('Database initialized');
    
    logInfo('All services initialized successfully');
  } catch (error) {
    logInfo('Failed to initialize services:', error);
    throw error;
  }
};

export * from './logger';
export * from './database';
export * from './cache';