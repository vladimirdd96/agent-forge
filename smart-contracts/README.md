# Smart Contracts - AgentForge

Solana smart contracts for AgentForge, built using the Anchor framework.

## 🚀 Features

- Agent minting and management
- $FORGE token (SPL)
- Access control and permissions
- Upgradeable agents
- Solana Program Library integration

## 📁 Directory Structure

```
smart-contracts/
├── programs/
│   └── agent_forge/    # Main Anchor program
│       ├── src/        # Program source code
│       └── Cargo.toml  # Rust dependencies
├── migrations/         # Deployment scripts
└── Anchor.toml        # Anchor configuration
```

## 🛠️ Prerequisites

1. Install Rust:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Install Solana CLI tools:
```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"
```

3. Install Anchor:
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked
avm install latest
avm use latest
```

## 📦 Building

1. Build the program:
```bash
anchor build
```

2. Deploy to devnet:
```bash
solana config set --url devnet
anchor deploy
```

## 🧪 Development

- `anchor test`: Run tests
- `anchor build`: Build program
- `anchor deploy`: Deploy to network
- `anchor verify`: Verify deployment

## 📝 Program Structure

### Instructions

1. Initialize Agent Factory
```rust
pub fn initialize(ctx: Context<Initialize>) -> Result<()>
```

2. Mint Agent
```rust
pub fn mint_agent(ctx: Context<MintAgent>, metadata: AgentMetadata) -> Result<()>
```

3. Upgrade Agent
```rust
pub fn upgrade_agent(ctx: Context<UpgradeAgent>, new_level: u8) -> Result<()>
```

### Accounts

- `AgentFactory`: Manages agent creation
- `Agent`: Individual agent data
- `ForgeToken`: SPL token mint

## 🔒 Security

- Program Derived Addresses (PDAs)
- Owner checks
- Signature verification
- Token-gated access
- Rate limiting 