// Centralized constants to avoid hard-coded duplication across components.
// Keep these as the single source of truth.

// External buy link (Raydium swap)
export const BUY_LINK = process.env.NEXT_PUBLIC_BUY_LINK || "https://pump.fun/coin/85taNYVWKBJtGSKrk23NRZTaK9aDThf2e9e6diRLpump";

// X (Twitter) profile
export const X_LINK = process.env.NEXT_PUBLIC_X_LINK || "https://x.com/hellcoin666";

// DEXScreener link
export const DEXSCREENER_LINK =
  process.env.NEXT_PUBLIC_DEXSCREENER_LINK || "https://dexscreener.com/solana/hellcoin";

// Contract address - warning-only until launch
// Set NEXT_PUBLIC_CONTRACT_ADDRESS environment variable with actual contract address at launch
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "85taNYVWKBJtGSKrk23NRZTaK9aDThf2e9e6diRLpump";

// Site URL for metadata
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hellcoin.fun";

// Build-time validation (runs at import time)
if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
  if (
    !process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS === "TBD"
  ) {
    console.warn(
      "WARNING: NEXT_PUBLIC_CONTRACT_ADDRESS is not set or is still 'TBD'. " +
      "Set the environment variable NEXT_PUBLIC_CONTRACT_ADDRESS to the actual Solana contract address at launch."
    );
  }
}
