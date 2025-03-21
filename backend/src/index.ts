import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { agentRoutes } from './routes/agent';
import { tokenRoutes } from './routes/token';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());

// Routes
app.use('/api/agent', agentRoutes);
app.use('/api/token', tokenRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 