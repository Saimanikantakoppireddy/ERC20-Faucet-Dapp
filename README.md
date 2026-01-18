# 💧 ERC20 Token Faucet DApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-submission%20ready-green)]()

A modern, secure, and decentralized ERC20 token faucet deployed on the Sepolia Ethereum test network. This application demonstrates a production-grade Web3 architecture with on-chain rate limiting and a premium user interface.

**[👉 Live Demo](https://erc-20-faucet-dapp.vercel.app/)**

## ✨ Key Features

- **🛡️ Secure On-Chain Rate Limiting**: All cooldowns and limits are enforced directly by the smart contract.
- **👛 Wallet Integration**: Seamless specific-network connection with MetaMask.
- **⚡ Real-time Updates**: Live tracking of token balance, allowance, and cooldown timers.
- **⛽ Gas Estimation**: Built-in gas cost preview before transaction submission.
- **🎨 Premium UI**: A responsive, glassmorphism-styled interface built with React and Vite.
- **🚫 Serverless**: No backend database; purely decentralized logic.

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Smart Contracts** | Solidity, OpenZeppelin, Hardhat |
| **Frontend** | React 19, Vite, Ethers.js v6, CSS3 (Glassmorphism) |
| **Network** | Sepolia Testnet |
| **Tools** | Vercel, Etherscan |

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18+)
- MetaMask Browser Extension

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/erc20-faucet-dapp.git
   cd erc20-faucet-dapp
   ```

2. **Install Root Dependencies (Hardhat)**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Configuration (Frontend)

Create a `.env` file in the `frontend` directory:

```env
VITE_TOKEN_ADDRESS=0xYourTokenContractAddress
VITE_FAUCET_ADDRESS=0xYourFaucetContractAddress
```

### Running Locally

To start the frontend application:

```bash
npx hardhat test
```

### 2. Frontend Interface (`window.__EVAL__`)
The frontend exposes a testing interface at `window.__EVAL__`. easy validation.
Open the browser console at http://localhost:3000 and run:

```javascript
// Connect Wallet
await window.__EVAL__.connectWallet();

// Request Tokens
await window.__EVAL__.requestTokens(); // Returns tx hash

// Check Balance
await window.__EVAL__.getBalance("YOUR_WALLET_ADDRESS");

// Check Remaining Allowance
await window.__EVAL__.getRemainingAllowance("YOUR_WALLET_ADDRESS");
```

## 📜 Contract Addresses (Local Deployment)

These addresses are automatically configured in the frontend when running `scripts/deploy.js`.

- **FaucetToken**: `0x5FbDB2315678afecb367f032d93F642f64180aa3` (Default Hardhat)
- **TokenFaucet**: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` (Default Hardhat)

## 🏗️ Project Structure

```
erc20-faucet-dapp/
├── contracts/            # Fixed Smart Contracts
│   ├── Token.sol         # ERC20 with Access Control
│   └── TokenFaucet.sol   # Faucet Logic
├── scripts/              # Deployment script
├── test/                 # Comprehensive Hardhat Tests
├── frontend/             # React Application
│   ├── Dockerfile        # Frontend Container config
│   ├── server.js         # Express server for health checks
│   └── src/App.jsx       # Main UI & EVAL Interface
├── docker-compose.yml    # Docker Compose orchestration
└── hardhat.config.js     # Hardhat Configuration
```

## 📝 License
MIT
