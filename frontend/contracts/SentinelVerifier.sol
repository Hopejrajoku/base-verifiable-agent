// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISP1Verifier {
    function verifyProof(bytes32 programVKey, bytes calldata publicValues, bytes calldata proofBytes) external view;
}

contract SentinelVerifier {
    // Official SP1 Judge on Base Sepolia
    address public constant SP1_VERIFIER = 0x3B68480500A4D685718a9B9e0481878e7643361e;
    bytes32 public programVKey; 

    event TradeVerified(uint32 price, uint32 limit, bytes32 indexed proofHash);

    constructor(bytes32 _vKey) {
        programVKey = _vKey;
    }

    function verifyAndExecute(bytes calldata publicValues, bytes calldata proofBytes) external {
        ISP1Verifier(SP1_VERIFIER).verifyProof(programVKey, publicValues, proofBytes);
        (uint32 price, uint32 limit) = abi.decode(publicValues, (uint32, uint32));
        emit TradeVerified(price, limit, keccak256(proofBytes));
    }
}
