// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {BaseAgent} from "../src/BaseAgent.sol";

contract DeployAgent is Script {
    function run() external {
        // Retrieve variables from your .env
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address verifier = vm.envAddress("VERIFIER_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        BaseAgent agent = new BaseAgent(verifier);
        
        console.log("BaseAgent deployed at:", address(agent));

        vm.stopBroadcast();
    }
}