import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenArtifact from './Token.json';
import FaucetArtifact from './TokenFaucet.json';
import ContractAddresses from './contracts-config.json';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [feedback, setFeedback] = useState('');

  const connectWallet = async () => {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    return accounts[0];
  };

  const getProvider = () => {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    return new ethers.BrowserProvider(window.ethereum);
  };

  const getSigner = async () => {
    const provider = getProvider();
    return await provider.getSigner();
  };

  const getContracts = async (runner) => {
    const r = runner || await getSigner(); // Default to signer for transactions
    return {
      token: new ethers.Contract(ContractAddresses.token, TokenArtifact.abi, r),
      faucet: new ethers.Contract(ContractAddresses.faucet, FaucetArtifact.abi, r)
    };
  };

  // EVAL INTERFACE
  useEffect(() => {
    window.__EVAL__ = {
      connectWallet: async () => {
        return await connectWallet();
      },
      requestTokens: async () => {
        const { faucet } = await getContracts();
        const tx = await faucet.requestTokens();
        // Return transaction hash as string
        return tx.hash;
      },
      getBalance: async (address) => {
        const provider = getProvider();
        const token = new ethers.Contract(ContractAddresses.token, TokenArtifact.abi, provider);
        const bal = await token.balanceOf(address);
        return bal.toString();
      },
      canClaim: async (address) => {
        const provider = getProvider();
        const faucet = new ethers.Contract(ContractAddresses.faucet, FaucetArtifact.abi, provider);
        return await faucet.canClaim(address);
      },
      getRemainingAllowance: async (address) => {
        const provider = getProvider();
        const faucet = new ethers.Contract(ContractAddresses.faucet, FaucetArtifact.abi, provider);
        const rem = await faucet.remainingAllowance(address);
        return rem.toString();
      },
      getContractAddresses: async () => {
        return {
          token: ContractAddresses.token,
          faucet: ContractAddresses.faucet
        };
      }
    };
  }, []);

  const handleClaim = async () => {
    try {
      setFeedback('Claiming...');
      const hash = await window.__EVAL__.requestTokens();
      setFeedback(`Claimed! Tx: ${hash}`);
    } catch (e) {
      setFeedback(`Error: ${e.message}`);
    }
  };

  return (
    <div className="App">
      <h1>ERC-20 Faucet</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {account}</p>
          <button onClick={handleClaim}>Claim Tokens</button>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default App;
