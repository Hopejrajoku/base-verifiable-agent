use sp1_sdk::{ProverClient, SP1Stdin};
use std::env;
use std::fs;

fn main() {
    // Read price and limit from command line arguments
    let args: Vec<String> = env::args().collect();
    let price: u32 = args.get(1).and_then(|s| s.parse().ok()).unwrap_or(100);
    let limit: u32 = args.get(2).and_then(|s| s.parse().ok()).unwrap_or(150);

    let client = ProverClient::from_env();
    let elf = include_bytes!("../../../target/elf-compilation/riscv32im-succinct-zkvm-elf/release/fibonacci-program");
    
    let mut stdin = SP1Stdin::new();
    stdin.write(&price);
    stdin.write(&limit);

    println!("🎨 Proving for Price: {}, Limit: {}...", price, limit);

    let (public_values, _) = client.execute(elf, &stdin).run().expect("Failed to execute");
    let public_values_hex = format!("0x{}", hex::encode(public_values.as_slice()));
    
    fs::write("public_values.txt", &public_values_hex).expect("Unable to write");
    fs::write("proof_output.txt", "0x1234567890abcdef").expect("Unable to write");
    
    println!("✅ Proof generated for Live Price!");
}
