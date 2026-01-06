# 💧 ERC20 Token Faucet DApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Network](https://img.shields.io/badge/Network-Sepolia-blue)](https://sepolia.etherscan.io/)
[![Status](https://img.shields.io/badge/Status-Active-green)]()

A modern, secure, and decentralized ERC20 token faucet deployed on the Sepolia Ethereum test network. This application demonstrates a production-grade Web3 architecture with on-chain rate limiting and a premium user interface.

**[👉 Live Demo](https://erc-20-faucet-dapp-omega.vercel.app/)**

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
cd frontend
npm run dev
```

The app will launch at `http://localhost:5173`.

## 🏗️ Project Structure

```
erc20-faucet-dapp/
├── contracts/            # Smart Contracts (Solidity)
├── scripts/              # Deployment & management scripts
├── test/                 # Contract test suite
├── frontend/             # React Application
│   ├── src/
│   │   ├── utils/        # Blockchain interaction logic
│   │   ├── App.jsx       # Main UI Component
│   │   └── App.css       # Styling
│   └── vite.config.js    # Vite Configuration
└── hardhat.config.js     # Hardhat Configuration
```

## 🔒 Security

- **No Private Keys**: The frontend never accesses or stores private keys.
- **Client-Side Validation**: Checks for network mismatches and insufficient funds.
- **Smart Contract Audited Logic**: Uses standard OpenZeppelin implementations for tokens.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
**Author:** Sai Manikanta.
