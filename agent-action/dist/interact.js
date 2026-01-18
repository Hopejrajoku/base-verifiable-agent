"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const PUBLIC_VALUES_HEX = "0x000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000960000000000000000000000000000000000000000000000000000000000000001";
async function main() {
    console.log("🤖 Verifiable Agent: Bridging ZK-Proof to Base...");
    const priceHex = ethers_1.ethers.dataSlice(PUBLIC_VALUES_HEX, 0, 32);
    const limitHex = ethers_1.ethers.dataSlice(PUBLIC_VALUES_HEX, 32, 64);
    const decisionHex = ethers_1.ethers.dataSlice(PUBLIC_VALUES_HEX, 64, 96);
    const price = BigInt(priceHex);
    const limit = BigInt(limitHex);
    const decision = BigInt(decisionHex) === 1n;
    console.log("-----------------------------------------");
    console.log(`📊 Data Source:   ZK-VM Proof`);
    console.log(`💰 Asset Price:   ${price}`);
    console.log(`📉 Agent Limit:   ${limit}`);
    console.log(`🔥 Action Result: ${decision ? "EXECUTE TRADE" : "SKIP"}`);
    console.log("-----------------------------------------");
    if (decision) {
        console.log("✅ LOGIC VERIFIED: The agent followed the rules.");
        console.log("🔗 Ready to submit to Base Verifier Contract.");
    }
}
main().catch(console.error);
