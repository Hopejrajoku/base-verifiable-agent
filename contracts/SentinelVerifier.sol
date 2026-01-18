// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISP1Verifier {
    function verifyProof(bytes32 programVKey, bytes calldata publicValues, bytes calldata proofBytes) external view;
}

contract SentinelVerifier {
    // The official SP1 Verifier address on Base Sepolia
    address public constant SP1_VERIFIER = 0x3b68480500a4D685718a9B9e0481878E7643361E;
    bytes32 public programVKey; // Your Rust Program's Fingerprint

    event TradeExecuted(uint256 price, uint256 limit, uint256 timestamp);

    constructor(bytes32 _vKey) {
        programVKey = _vKey;
    }

    function executeVerifiableTrade(
        bytes calldata publicValues,
        bytes calldata proofBytes
    ) external {
        // 1. Verify the ZK-Proof using SP1
        ISP1Verifier(SP1_VERIFIER).verifyProof(programVKey, publicValues, proofBytes);

        // 2. Extract verified values from the proof
        (uint32 price, uint32 limit) = abi.decode(publicValues, (uint32, uint32));

        // 3. Final safety check (Enforced by Math + Solidity)
        require(price <= limit, "ZK Proof valid, but logic condition not met");

        emit TradeExecuted(price, limit, block.timestamp);
    }
}
