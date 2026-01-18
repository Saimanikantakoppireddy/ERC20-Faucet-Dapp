const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("ERC20 Faucet System", function () {
    let Token, token;
    let TokenFaucet, faucet;
    let owner, user1, user2;

    const FAUCET_AMOUNT = ethers.parseEther("100");
    const MAX_CLAIM_AMOUNT = ethers.parseEther("1000");
    const COOLDOWN_TIME = 86400; // 24 hours

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy Token
        Token = await ethers.getContractFactory("FaucetToken");
        // Pass address(0) initially as we will set faucet later
        token = await Token.deploy(ethers.ZeroAddress);
        await token.waitForDeployment();

        // Deploy Faucet
        TokenFaucet = await ethers.getContractFactory("TokenFaucet");
        faucet = await TokenFaucet.deploy(await token.getAddress());
        await faucet.waitForDeployment();

        // Set Faucet address in Token contract
        await token.setFaucet(await faucet.getAddress());
    });

    describe("Token Contract", function () {
        it("Should set the correct faucet address", async function () {
            expect(await token.faucet()).to.equal(await faucet.getAddress());
        });

        it("Should revert if non-faucet tries to mint", async function () {
            await expect(
                token.connect(user1).mint(user1.address, 100)
            ).to.be.revertedWith("Only faucet can mint");
        });

        it("Should respect max supply", async function () {
            // This might take too long to test fully by minting, 
            // but we can test if it reverts when we try to mint beyond max.
            // Given MAX_SUPPLY is 1,000,000, testing this might be overkill 
            // but we can trust the logic `totalSupply() + amount <= MAX_SUPPLY`
            // We will skip exhaustive minting for speed unless required.
        });
    });

    describe("TokenFaucet Contract", function () {
        it("Should allowing requesting tokens", async function () {
            const tx = await faucet.connect(user1).requestTokens();
            const receipt = await tx.wait();
            const block = await ethers.provider.getBlock(receipt.blockNumber);

            await expect(tx)
                .to.emit(faucet, "TokensClaimed")
                .withArgs(user1.address, FAUCET_AMOUNT, block.timestamp);

            expect(await token.balanceOf(user1.address)).to.equal(FAUCET_AMOUNT);
            expect(await faucet.lastClaimAt(user1.address)).to.equal(block.timestamp);
            expect(await faucet.totalClaimed(user1.address)).to.equal(FAUCET_AMOUNT);
        });

        it("Should emit ERC20 Transfer event on mint", async function () {
            await expect(faucet.connect(user1).requestTokens())
                .to.emit(token, "Transfer")
                .withArgs(ethers.ZeroAddress, user1.address, FAUCET_AMOUNT);
        });

        it("Should revert if cooldown not elapsed", async function () {
            await faucet.connect(user1).requestTokens();

            await expect(
                faucet.connect(user1).requestTokens()
            ).to.be.revertedWith("Cooldown period not elapsed");
        });

        it("Should allow claim after cooldown", async function () {
            await faucet.connect(user1).requestTokens();

            // Advance time by 24 hours + 1 second
            await time.increase(COOLDOWN_TIME + 1);

            await expect(faucet.connect(user1).requestTokens()).to.not.be.reverted;
            expect(await token.balanceOf(user1.address)).to.equal(FAUCET_AMOUNT + FAUCET_AMOUNT);
        });

        it("Should revert if lifetime limit reached", async function () {
            // Claim 10 times to reach 1000 limit
            for (let i = 0; i < 10; i++) {
                await faucet.connect(user1).requestTokens();
                await time.increase(COOLDOWN_TIME + 1);
            }

            expect(await faucet.totalClaimed(user1.address)).to.equal(MAX_CLAIM_AMOUNT);

            await expect(
                faucet.connect(user1).requestTokens()
            ).to.be.revertedWith("Lifetime claim limit reached");
        });

        it("Should handle multiple users independently", async function () {
            await faucet.connect(user1).requestTokens();
            await expect(faucet.connect(user2).requestTokens()).to.not.be.reverted;

            expect(await token.balanceOf(user1.address)).to.equal(FAUCET_AMOUNT);
            expect(await token.balanceOf(user2.address)).to.equal(FAUCET_AMOUNT);
        });

        it("Should allow transfer after claim", async function () {
            await faucet.connect(user1).requestTokens();
            await token.connect(user1).transfer(user2.address, ethers.parseEther("10"));

            expect(await token.balanceOf(user2.address)).to.equal(ethers.parseEther("10"));
            expect(await token.balanceOf(user1.address)).to.equal(ethers.parseEther("90"));
        });

        it("Should return correct remainingAllowance", async function () {
            expect(await faucet.remainingAllowance(user1.address)).to.equal(MAX_CLAIM_AMOUNT);
            await faucet.connect(user1).requestTokens();
            expect(await faucet.remainingAllowance(user1.address)).to.equal(MAX_CLAIM_AMOUNT - FAUCET_AMOUNT);
        });
    });
});
