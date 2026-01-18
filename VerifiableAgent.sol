// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// The SP1 Verifier Interface
interface ISP1Verifier {
    function verifyProof(bytes32 programVKey, bytes calldata publicValues, bytes calldata proofBytes) external view;
}

contract VerifiableAgent {
    // The SP1 Verifier address on Base Sepolia
    address public constant SP1_VERIFIER = 0x3B6041173B80E77f038f3F2C0f9744f04837185e;
    
    // YOUR UNIQUE PROGRAM ID (vKey)
    bytes32 public constant PROGRAM_VKEY = 0x008b8d537acadad249f65e73f35500a05dd068872599c32f82170f9f2d7a73fc;

    event TradeExecuted(uint32 price, uint32 limit);

    function executeVerifiableTrade(
        bytes calldata publicValues,
        bytes calldata proofBytes
    ) external {
        // 1. VERIFY: The blockchain checks the math against your vKey
        ISP1Verifier(SP1_VERIFIER).verifyProof(PROGRAM_VKEY, publicValues, proofBytes);

        // 2. DECODE: If we get here, the proof is valid. Extract the decision.
        // Public values are encoded as (uint32, uint32, uint32) from your Rust code
        (uint32 price, uint32 limit, uint32 decision) = abi.decode(publicValues, (uint32, uint32, uint32));

        require(decision == 1, "Agent logic did not authorize trade");

        // 3. ACT: This is where the money moves
        emit TradeExecuted(price, limit);
    }
}