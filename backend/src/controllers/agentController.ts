import { Request, Response } from 'express';
import { OpenAIService } from '../services/openaiService';
import { WalletValidator } from '../utils/validateWallet';
import { RunAgentRequest, RunAgentResponse, ValidationError } from '../types/agent';

export class AgentController {
  private openaiService: OpenAIService;
  private walletValidator: WalletValidator;

  constructor() {
    this.openaiService = new OpenAIService();
    this.walletValidator = new WalletValidator();
  }

  /**
   * Validate the run agent request body
   */
  private validateRunRequest(body: Partial<RunAgentRequest>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!body.wallet) {
      errors.push({ field: 'wallet', message: 'Wallet address is required' });
    }
    if (!body.agentId) {
      errors.push({ field: 'agentId', message: 'Agent ID is required' });
    }
    if (!body.input) {
      errors.push({ field: 'input', message: 'Input prompt is required' });
    }

    return errors;
  }

  /**
   * Get all available agents
   */
  async getAgents(_req: Request, res: Response): Promise<void> {
    try {
      const agents = this.openaiService.getAvailableAgents();
      res.json({ success: true, agents });
    } catch (error) {
      console.error('Error getting agents:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get available agents',
      });
    }
  }

  /**
   * Run an agent with the given input
   */
  async runAgent(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const validationErrors = this.validateRunRequest(req.body);
      if (validationErrors.length > 0) {
        res.status(400).json({
          success: false,
          errors: validationErrors,
        });
        return;
      }

      const { wallet, agentId, input } = req.body as RunAgentRequest;

      // Validate wallet
      const walletValidation = await this.walletValidator.validateWallet(wallet);
      if (!walletValidation.isValid) {
        res.status(403).json({
          success: false,
          error: walletValidation.error || 'Invalid wallet',
        });
        return;
      }

      // Execute agent
      const output = await this.openaiService.executeAgent(agentId, input);

      // TODO: Log usage for billing/analytics

      const response: RunAgentResponse = {
        success: true,
        agentId,
        output,
      };

      res.json(response);
    } catch (error) {
      console.error('Error running agent:', error);
      const response: RunAgentResponse = {
        success: false,
        agentId: req.body.agentId || '',
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
      res.status(500).json(response);
    }
  }
} 