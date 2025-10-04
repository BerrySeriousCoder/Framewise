
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, PoolClient } from 'pg';
import { logInfo, logError, logDebug } from './logger';
import * as schema from '../db/schema';

let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

export const initializeDatabase = async (): Promise<void> => {
  try {
    logInfo('Initializing database connection...');
    
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
   
    db = drizzle(pool, { schema });
    logInfo('Database connected successfully');
  } catch (error: any) {
    logError('Database connection failed', { error: error.message });
    throw error;
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
};

export const getPool = () => {
  if (!pool) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return pool;
};

export const queryDatabase = async (text: string, params?: any[]): Promise<any> => {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logDebug('Executed query', { 
      text: text.substring(0, 100) + '...',
      duration: `${duration}ms`,
      rows: result.rowCount 
    });
    return result;
  } catch (error: any) {
    logError('Database query failed', { error: error.message });
    throw error;
  }
};

export const getDatabaseClient = async (): Promise<PoolClient> => {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  return await pool.connect();
};

export const closeDatabase = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    logInfo('Database connections closed');
  }
};