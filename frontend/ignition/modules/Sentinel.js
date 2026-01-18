import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const INITIAL_VKEY = "0x0000000000000000000000000000000000000000000000000000000000000000";

export default buildModule("SentinelModule", (m) => {
  const sentinel = m.contract("SentinelVerifier", [INITIAL_VKEY]);

  return { sentinel };
});
