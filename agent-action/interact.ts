import { ethers } from "ethers";
const CONTRACT_ADDRESS = "0xF823c70d2b48e5918528db664d372bb73219Fe08";
const RPC_URL = "https://sepolia.base.org";
const PRIVATE_KEY = "0x6ef819c161238b2fbc3375bbed4f4846fab008d0fd7c4780e247ba7425557ac3";
const PUBLIC_VALUES_HEX = "0x000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000960000000000000000000000000000000000000000000000000000000000000001";
const MOCK_PROOF = "0x1234";
async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const abi = ["function executeVerifiableTrade(bytes, bytes) external"];
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
    console.log("🤖 Agent calling the Judge on Base...");
    try {
        const tx = await contract.executeVerifiableTrade(PUBLIC_VALUES_HEX, MOCK_PROOF);
        console.log(`✅ Transaction Sent! Hash: ${tx.hash}`);
        const receipt = await tx.wait();
        console.log(`🔥 Trade Executed on Base! Block: ${receipt.blockNumber}`);
    } catch (error) {
        console.log("❌ REVERTED: The Judge caught the fake proof!");
        console.log("💡 This is GOOD. It proves your vKey security is working.");
    }
}
main().catch(console.error);
