import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createMintToInstruction,
  getOrCreateAssociatedTokenAccount,
} from '@solana/spl-token';
import * as dotenv from 'dotenv';
import { TokenConfig } from '../shared/types';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const NETWORK = process.env.SOLANA_NETWORK || 'devnet';
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;
const INITIAL_SUPPLY = parseInt(process.env.INITIAL_SUPPLY || '1000000');

// Type guard for checking if value is a valid private key array
function isValidPrivateKeyArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(item => typeof item === 'number');
}

if (!ADMIN_PRIVATE_KEY) {
  throw new Error('ADMIN_PRIVATE_KEY is required in .env file');
}

// Parse and validate private key
let privateKeyArray: number[];
try {
  const parsed = JSON.parse(ADMIN_PRIVATE_KEY);
  if (!isValidPrivateKeyArray(parsed)) {
    throw new Error('ADMIN_PRIVATE_KEY must be a JSON array of numbers');
  }
  privateKeyArray = parsed;
} catch (error) {
  console.error('Error parsing ADMIN_PRIVATE_KEY:', error);
  process.exit(1);
}

const FORGE_TOKEN_CONFIG: TokenConfig = {
  mint: '', // Will be set after creation
  decimals: 9,
  symbol: 'FORGE',
  name: 'AgentForge Token',
};

async function initializeToken(): Promise<void> {
  try {
    // Connect to network
    const connection = new Connection(
      NETWORK === 'devnet' 
        ? 'https://api.devnet.solana.com'
        : 'https://api.mainnet-beta.solana.com',
      'confirmed'
    );

    // Create admin wallet from private key
    const adminKeypair = Keypair.fromSecretKey(
      Uint8Array.from(privateKeyArray)
    );

    console.log('Creating $FORGE token...');
    console.log('Admin public key:', adminKeypair.publicKey.toString());

    // Generate new mint account
    const mintKeypair = Keypair.generate();
    const mintRent = await getMinimumBalanceForRentExemptMint(connection);

    // Create transaction for token mint
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: adminKeypair.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports: mintRent,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        FORGE_TOKEN_CONFIG.decimals,
        adminKeypair.publicKey,
        adminKeypair.publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    // Send and confirm transaction
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [adminKeypair, mintKeypair],
      { commitment: 'confirmed' }
    );

    console.log('Token mint created successfully!');
    console.log('Mint address:', mintKeypair.publicKey.toString());
    console.log('Transaction signature:', signature);

    // Create associated token account for admin
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      adminKeypair,
      mintKeypair.publicKey,
      adminKeypair.publicKey
    );

    console.log('Token account created:', tokenAccount.address.toString());

    // Mint initial supply to admin
    const mintToTransaction = new Transaction().add(
      createMintToInstruction(
        mintKeypair.publicKey,
        tokenAccount.address,
        adminKeypair.publicKey,
        INITIAL_SUPPLY * Math.pow(10, FORGE_TOKEN_CONFIG.decimals)
      )
    );

    const mintSignature = await sendAndConfirmTransaction(
      connection,
      mintToTransaction,
      [adminKeypair],
      { commitment: 'confirmed' }
    );

    console.log('Initial supply minted successfully!');
    console.log('Mint transaction signature:', mintSignature);

    // Update token config with new mint address
    FORGE_TOKEN_CONFIG.mint = mintKeypair.publicKey.toString();

    // Save token config to a file
    const configPath = path.join(__dirname, '..', 'shared', 'token-config.json');
    fs.writeFileSync(configPath, JSON.stringify(FORGE_TOKEN_CONFIG, null, 2));
    console.log('Token configuration saved to:', configPath);

  } catch (error) {
    console.error('Error initializing token:', error);
    process.exit(1);
  }
}

initializeToken(); 