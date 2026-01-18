import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io"); // Public RPC

const addresses = [
    "0x5E7F77D429F49cf6a4059E0Ec7B7cdfbA626d05c",
    "0x2a692E809D6dEC5B9985064987eFfa1184329378",
    "0x7ae96a2b657c07106e64479eac3434e99cf04975"
];

async function check() {
    console.log("Checking addresses...");
    for (const addr of addresses) {
        try {
            const code = await provider.getCode(addr);
            if (code === "0x") {
                console.log(`${addr}: EOA`);
                continue;
            }

            try {
                const token = new ethers.Contract(addr, ["function name() view returns (string)", "function symbol() view returns (string)"], provider);
                const name = await token.name();
                console.log(`${addr}: Token Name = ${name}`);
            } catch (e) {
                // Not a token, maybe faucet?
                console.log(`${addr}: Contract (Likely Faucet or other)`);
            }
        } catch (e) {
            console.log(`${addr}: Error - ${e.message}`);
        }
    }
}

check();
