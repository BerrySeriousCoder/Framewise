import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  console.log(`${req.method} ${req.url} - ${req.ip} - ${new Date().toISOString()}`);
  
res.on('finish', () => {
  const duration = Date.now() - start;
  const statuscode = res.statusCode;
  console.log(`${req.method} ${req.url} - ${duration} - ${statuscode}`)
})
  
  next();
};
