import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

/**
 * Simple in-memory rate limiter
 * This is not production-ready (doesn't scale across multiple instances),
 * but works well for development and demonstrations
 */
export function createRateLimiter(options: {
  windowMs: number;
  max: number;
  message?: string | object;
}) {
  const { windowMs, max, message = 'Too many requests, please try again later' } = options;
  const store: RateLimitStore = {};

  // Clean up the store every minute
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (store[key] && store[key].resetTime < now) {
        delete store[key];
      }
    }
  }, 60000);

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const resetTime = now + windowMs;

    // Initialize or reset if expired
    if (!store[ip] || store[ip].resetTime < now) {
      store[ip] = {
        count: 1,
        resetTime,
      };
      return next();
    }

    // Increment count
    store[ip].count++;

    // Check if over limit
    if (store[ip].count > max) {
      const retryAfter = Math.ceil((store[ip].resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfter.toString());
      return res.status(429).json(
        typeof message === 'string' ? { success: false, error: message } : message
      );
    }

    next();
  };
} 