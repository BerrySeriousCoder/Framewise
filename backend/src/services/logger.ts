import winston from 'winston';

const createLogger = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ];
  
  if (!isDevelopment) {
    transports.push(
      new winston.transports.File({
        filename: './logs/error.log',
        level: 'error'
      }),
      new winston.transports.File({
        filename: './logs/combined.log'
      })
    );
  }

  return winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    defaultMeta: { service: 'pixelperfect-backend' },
    transports
  });
};

const logger = createLogger();

export const logInfo = (message: string, meta?: any) => {
  logger.info(message, meta);
};

export const logWarn = (message: string, meta?: any) => {
  logger.warn(message, meta);
};

export const logError = (message: string, meta?: any) => {
  logger.error(message, meta);
};

export const logDebug = (message: string, meta?: any) => {
  logger.debug(message, meta);
};

export const initializeLogger = async (): Promise<void> => {
  logInfo('Logger initialized successfully');
};






