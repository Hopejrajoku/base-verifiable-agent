use sp1_sdk::{ProverClient, SP1Stdin};
use fibonacci_lib::PublicValues;
use alloy_sol_types::SolValue;

fn main() {
    // 1. Setup the logger to see what's happening under the hood
    sp1_sdk::utils::setup_logger();

    // 2. Load the ELF (the compiled ZK program)
    let elf = include_bytes!("../../../target/elf-compilation/riscv32im-succinct-zkvm-elf/release/fibonacci-program");

    // 3. Prepare inputs for the guest program
    let mut stdin = SP1Stdin::new();
    stdin.write(&100u32); // Input: Price
    stdin.write(&150u32); // Input: Limit

    // 4. Initialize the Prover Client
    // Ensure you have run 'export SP1_PROVER=mock' in your terminal
    let client = ProverClient::from_env();
    let (pk, _vk) = client.setup(elf);
    
    // 5. Generate the proof (Core/Mock mode)
    let proof_data = client.prove(&pk, &stdin).run().expect("Proving failed");

    // 6. Decode the Public Values to confirm the logic worked
    let public_values_bytes = proof_data.public_values.as_slice();
    let public_values = PublicValues::abi_decode(public_values_bytes, true)
        .expect("Failed to decode public values");

    // 7. Print the results
    println!("Success!");
    println!("Decision: {}", public_values.decision);
    println!("Public Values (Hex): 0x{}", hex::encode(public_values_bytes));
    
    // 8. Handle Proof printing safely without panicking in mock mode
    match proof_data.proof {
        sp1_sdk::SP1Proof::Plonk(_) => {
            // This only runs if you are using the Succinct Network or high-RAM local Plonk
            println!("Proof (Hex): 0x{}", hex::encode(proof_data.bytes()));
        }
        _ => {
            // This runs in Mock or Core mode to avoid the 'Core is not supported' panic
            println!("Proof (Hex): 0x[MOCK_PROOF_FOR_DEV_ONLY]");
            println!("Note: To get a real on-chain proof, use the Succinct Network.");
        }
    }
}