import { Router } from 'express';

const router = Router();

// Get token configuration
router.get('/', (_, res) => {
  try {
    const tokenConfig = {
      mint: process.env.FORGE_TOKEN_MINT || '',
      minBalance: Number(process.env.MIN_FORGE_BALANCE || '100'),
    };
    res.json({ success: true, config: tokenConfig });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get token configuration',
    });
  }
});

// Check token balance
router.get('/balance/:wallet', async (req, res) => {
  try {
    const { wallet } = req.params;
    // TODO: Implement balance check
    res.json({ message: `Check balance for ${wallet}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check balance' });
  }
});

export const tokenRoutes = router; 