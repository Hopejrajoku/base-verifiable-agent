// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ISP1Verifier} from "sp1-contracts/ISP1Verifier.sol";

contract BaseAgent {
    address public verifier;
    // Your actual Agent VKey!
    bytes32 public constant AGENT_VKEY = 0x00adac01e9d94d615a9e6686e625668ec6d5d85cb868f8e8868769632445d7fd;

    event AgentActionVerified(bool decision, uint32 price);

    constructor(address _verifier) {
        verifier = _verifier;
    }

    function verifyAgentExecution(bytes calldata proof, bytes calldata publicValues) external {
        // Verify the proof against your DNA (AGENT_VKEY)
        ISP1Verifier(verifier).verifyProof(AGENT_VKEY, publicValues, proof);

        // Decode the data from the AI "Brain"
        (uint32 price, uint32 limit, bool decision) = abi.decode(publicValues, (uint32, uint32, bool));
        
        require(decision, "Agent logic: Condition not met");
        emit AgentActionVerified(decision, price);
    }
}