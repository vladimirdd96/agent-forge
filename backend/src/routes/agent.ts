import { Router } from 'express';
import { Agent } from '../../../shared/types';

const router = Router();

// Get all agents
router.get('/', async (req, res) => {
  try {
    // TODO: Implement agent listing
    res.json({ message: 'List agents endpoint' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list agents' });
  }
});

// Get agent by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Implement agent retrieval
    res.json({ message: `Get agent ${id}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get agent' });
  }
});

// Run agent
router.post('/:id/run', async (req, res) => {
  try {
    const { id } = req.params;
    const { prompt, wallet } = req.body;
    // TODO: Implement agent execution
    res.json({ message: `Run agent ${id}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to run agent' });
  }
});

export const agentRoutes = router; 