#![no_main]
sp1_zkvm::entrypoint!(main);

use fibonacci_lib::PublicValues;
use alloy_sol_types::SolValue;

pub fn main() {
    // Read inputs from the host
    let price = sp1_zkvm::io::read::<u32>();
    let limit = sp1_zkvm::io::read::<u32>();

    // Logic
    let decision = price <= limit;

    // Commit the results to the public proof
    let bytes = PublicValues { price, limit, decision }.abi_encode();
    sp1_zkvm::io::commit_slice(&bytes);
}