const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying contracts...");

  // Deploy Token
  const Token = await hre.ethers.getContractFactory("FaucetToken");
  const token = await Token.deploy(hre.ethers.ZeroAddress);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("Token deployed to:", tokenAddress);

  // Deploy Faucet
  const Faucet = await hre.ethers.getContractFactory("TokenFaucet");
  const faucet = await Faucet.deploy(tokenAddress);
  await faucet.waitForDeployment();
  const faucetAddress = await faucet.getAddress();
  console.log("Faucet deployed to:", faucetAddress);

  // Set Faucet in Token
  await token.setFaucet(faucetAddress);
  console.log("Token faucet set to:", faucetAddress);

  // Save to frontend
  const contractsDir = path.join(__dirname, "..", "frontend", "src");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const contractsConfig = {
    token: tokenAddress,
    faucet: faucetAddress
  };

  fs.writeFileSync(
    path.join(contractsDir, "contracts-config.json"),
    JSON.stringify(contractsConfig, null, 2)
  );

  // Save ABIs
  const tokenArtifact = await hre.artifacts.readArtifact("FaucetToken");
  const faucetArtifact = await hre.artifacts.readArtifact("TokenFaucet");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(tokenArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, "TokenFaucet.json"),
    JSON.stringify(faucetArtifact, null, 2)
  );

  console.log("Deployment info saved to frontend/src/");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
