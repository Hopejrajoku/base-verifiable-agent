use alloy_sol_types::sol;

sol! {
    // Ensure "pub" is not used inside sol! but the struct itself 
    // is generated as public by the macro.
    struct PublicValues {
        uint32 price;
        uint32 limit;
        bool decision;
    }
}