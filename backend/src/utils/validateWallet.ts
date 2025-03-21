import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

interface WalletValidationResult {
  isValid: boolean;
  error?: string;
}

interface TokenAccountInfo {
  mint: string;
  tokenAmount: {
    amount: string;
    decimals: number;
    uiAmount: number;
  };
}

export class WalletValidator {
  private connection: Connection;
  private forgeTokenMint?: PublicKey;
  private minForgeBalance: number;

  constructor() {
    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
    this.connection = new Connection(rpcUrl, 'confirmed');
    
    // Initialize token mint if available
    const tokenMint = process.env.FORGE_TOKEN_MINT;
    if (tokenMint && tokenMint !== 'your-token-mint-address-here') {
      try {
        this.forgeTokenMint = new PublicKey(tokenMint);
      } catch (error) {
        console.warn('Invalid FORGE_TOKEN_MINT address provided:', error instanceof Error ? error.message : 'Unknown error');
      }
    }

    const minBalance = process.env.MIN_FORGE_BALANCE;
    this.minForgeBalance = minBalance ? Number(minBalance) : 100;
    if (isNaN(this.minForgeBalance)) {
      console.warn('Invalid MIN_FORGE_BALANCE provided, using default value of 100');
      this.minForgeBalance = 100;
    }
  }

  /**
   * Validate a wallet address format
   */
  private isValidWalletAddress(address: string): boolean {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get the token balance for a wallet
   */
  private async getTokenBalance(walletAddress: string): Promise<number> {
    if (!this.forgeTokenMint) {
      return 0;
    }

    try {
      const wallet = new PublicKey(walletAddress);
      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
        wallet,
        { programId: TOKEN_PROGRAM_ID }
      );

      const forgeAccount = tokenAccounts.value.find((account) => {
        const parsedData = account.account.data.parsed;
        return (
          parsedData &&
          'info' in parsedData &&
          (parsedData.info as TokenAccountInfo).mint === this.forgeTokenMint?.toString()
        );
      });

      if (!forgeAccount) {
        return 0;
      }

      const parsedInfo = forgeAccount.account.data.parsed.info as TokenAccountInfo;
      return Number(parsedInfo.tokenAmount.amount);
    } catch (error) {
      console.error('Error getting token balance:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error('Failed to get token balance');
    }
  }

  /**
   * Validate a wallet for agent execution
   */
  async validateWallet(walletAddress: string): Promise<WalletValidationResult> {
    // Validate wallet address format
    if (!this.isValidWalletAddress(walletAddress)) {
      return {
        isValid: false,
        error: 'Invalid wallet address format',
      };
    }

    try {
      // Skip token balance check if token mint is not configured
      if (!this.forgeTokenMint) {
        console.warn('FORGE_TOKEN_MINT not configured, skipping balance check');
        return { isValid: true };
      }

      const balance = await this.getTokenBalance(walletAddress);
      if (balance < this.minForgeBalance) {
        return {
          isValid: false,
          error: `Insufficient $FORGE balance. Required: ${this.minForgeBalance}`,
        };
      }

      return { isValid: true };
    } catch (error) {
      console.error('Wallet validation error:', error instanceof Error ? error.message : 'Unknown error');
      return {
        isValid: false,
        error: 'Failed to validate wallet',
      };
    }
  }
} 