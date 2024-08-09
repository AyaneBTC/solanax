import { AccountInfo, PublicKey } from "@solana/web3.js";
import BN from "bn.js";

export interface AccountBalanceTokensInfo {
  pubkey: PublicKey;
  balance: number;
  tokens: TokenAccount[];
}

export interface TokenAccountInfo {
  isNative: boolean;
  mint: PublicKey;
  owner: PublicKey;
  state: string;
  tokenAmount: {
    amount: BN;
    decimals: number;
    uiAmount: BN;
    uiAmountString: string;
  };
}

export interface ParsedAccountData {
  /** Name of the program that owns this account */
  program: string;
  /** Parsed account data */
  parsed: {
    /** Block type */
    type: string;
    /** Parsed token account data */
    info: TokenAccountInfo;
  };
  /** Space used by account data */
  space: number;
}

export interface TokenAccount {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}
