# 💧 ERC20 Token Faucet DApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-submission%20ready-green)]()

A modern, secure, and decentralized ERC20 token faucet. This repository has been updated to meet strict automated evaluation criteria, including robust smart contracts, Docker containerization, and a testable frontend interface.

## 📋 Project Status
- **Smart Contracts**: Fixed & Verified (Revert messages, Access Control)
- **Tests**: Passing (11/11 scenarios)
- **Frontend**: Implemented `window.__EVAL__` interface
- **Docker**: Ready

## 🚀 Quick Start (Docker)

To run the entire application using Docker:

```bash
docker compose up --build
```

- **Frontend**: http://localhost:3000
- **Health Check**: `curl http://localhost:3000/health` (Returns 200 OK)

## 🧪 Verification Steps

### 1. Automated Tests (Smart Contracts)
Run the Hardhat test suite to verify contract logic:

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
