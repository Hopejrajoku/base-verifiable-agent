use sp1_sdk::{ProverClient, SP1Stdin};
use alloy_sol_types::SolValue;
use std::env;

// This defines the data structure so it matches Solidity's abi.decode
alloy_sol_types::sol! {
    struct PublicValues {
        uint32 price;
        uint32 limit;
        bool decision;
    }
}

fn main() {
    // 1. Initialize the Prover Client
    let client = ProverClient::new();
    
    // 2. Point to the ELF (the binary we built earlier)
    // Adjust path if your binary is named differently
    let elf = include_bytes!("../target/elf-compilation/riscv32im-succinct-zkvm-elf/release/fibonacci-program");
    let (pk, vk) = client.setup(elf);

    // 3. Setup Inputs (Price = 100, Limit = 150)
    // This simulates the AI "seeing" a price and deciding to act
    let mut stdin = SP1Stdin::new();
    stdin.write(&100u32); 
    stdin.write(&150u32);

    println!("Starting ZK Proof generation... this might take a minute.");

    // 4. Generate the Proof
    let (output, proof) = client.prove(&pk, stdin).run().expect("Proving failed");
    
    // 5. Format the results for the Blockchain
    let public_values_bytes = proof.public_values.as_slice();
    
    println!("--- PROOF GENERATED SUCCESSFULLY ---");
    println!("Contract Address: 0x597504E67DF783349720f70095696f0Bc053E25A");
    println!("");
    println!("PUBLIC VALUES (Hex):");
    println!("0x{}", hex::encode(public_values_bytes));
    println!("");
    println!("PROOF (Hex):");
    println!("0x{}", hex::encode(proof.proof.as_bytes()));
    println!("-------------------------------------");
}