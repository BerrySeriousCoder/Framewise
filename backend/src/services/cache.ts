import { createClient, RedisClientType } from 'redis';
import { logInfo, logError } from './logger';

let client: RedisClientType | null = null;

export const initializeCache = async (): Promise<void> => {
  try {
    client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    client.on('error', (err) => {
      logError('Redis Client Error:', err);
    });

    await client.connect();
    logInfo('Connected to Redis');
  } catch (error) {
    logError('Failed to connect to Redis:', error);
    throw error;
  }
};

const getClient = () => {
  if (!client) {
    throw new Error('Cache not initialized. Call initializeCache() first.');
  }
  return client;
};

export const setCache = async (key: string, value: string, ttl?: number): Promise<void> => {
  const redisClient = getClient();
  if (ttl) {
    await redisClient.setEx(key, ttl, value);
  } else {
    await redisClient.set(key, value);
  }
};

export const getCache = async (key: string): Promise<string | null> => {
  const redisClient = getClient();
  return await redisClient.get(key);
};

export const deleteCache = async (key: string): Promise<void> => {
  const redisClient = getClient();
  await redisClient.del(key);
};

export const existsCache = async (key: string): Promise<boolean> => {
  const redisClient = getClient();
  const result = await redisClient.exists(key);
  return result === 1;
};

export const expireCache = async (key: string, ttl: number): Promise<void> => {
  const redisClient = getClient();
  await redisClient.expire(key, ttl);
};

export const closeCache = async (): Promise<void> => {
  if (client) {
    await client.quit();
  }
};
