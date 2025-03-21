import dotenv from 'dotenv';

// Load environment variables before any other imports
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import agentRoutes from './routes/agentRoutes';
import { tokenRoutes } from './routes/token';
import { createRateLimiter } from './middleware/rateLimiter';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Global rate limiter - 100 requests per 15 minutes
const globalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
  },
});

// OpenAI rate limiter - 3 requests per minute to honor free tier
const openAILimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per minute
  message: {
    success: false,
    error: 'Rate limit exceeded for AI operations. Please try again later.',
  },
});

// Apply global rate limiting to all requests
app.use(globalLimiter);

// Routes with specific rate limits
// We need to apply the OpenAI limiter to the specific route pattern
app.use('/api/agent/run', openAILimiter);

// Regular routes
app.use('/api/agent', agentRoutes);
app.use('/api/token', tokenRoutes);

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
interface ApiError extends Error {
  statusCode?: number;
}

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
}); 