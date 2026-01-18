
const { execSync } = require('child_process');

const { ethers } = require('ethers');

const fs = require('fs');

require('dotenv').config();



const RPC_URL = "https://sepolia.base.org";

const CONTRACT_ADDRESS = "0x361F924a791B77b5E4d4A5da85630cCE5b7B1062"; // We will fill this soon



async function main() {

    const provider = new ethers.JsonRpcProvider(RPC_URL);

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);



    console.log("🤖 Sentinel Agent Online...");

    

    // Simulate getting price (In Phase 3 we'll use an Oracle)

    const price = 3200; 

    const limit = 3500;



    if (price <= limit) {

        console.log("⚡ Generating ZK-STARK Proof for Trade...");

        

        // This generates the proof using our SP1 Rust program

        execSync(`cd ../program/script && cargo run --release -- --prove ${price} ${limit}`, { stdio: 'inherit' });



        // Load generated proof data

        const proofBytes = fs.readFileSync('../program/script/proof.bin');

        const publicValues = fs.readFileSync('../program/script/public_values.bin');



        console.log("📡 Submitting Proof to Base Sepolia...");

        

        const contract = new ethers.Contract(CONTRACT_ADDRESS, [

            "function executeVerifiableTrade(bytes, bytes) external"

        ], wallet);



        try {

            const tx = await contract.executeVerifiableTrade(publicValues, proofBytes);

            console.log(`✅ Trade Verified on Base! TX: ${tx.hash}`);

            

            // Log for Dashboard

            const logEntry = {

                timestamp: new Date().toISOString(),

                price,

                limit,

                txHash: tx.hash,

                status: "VERIFIED_ON_CHAIN"

            };

            fs.appendFileSync('agent_logs.json', JSON.stringify(logEntry) + "\n");

        } catch (e) {

            console.error("❌ On-chain Verification Failed:", e.reason);

        }

    }

}

main();

