import { Router } from 'express';
import { AgentController } from '../controllers/agentController';

const router = Router();
const agentController = new AgentController();

// Get all available agents
router.get('/', (_, res) => agentController.getAgents(_, res));

// Run an agent
router.post('/run', (req, res) => agentController.runAgent(req, res));

export default router; 