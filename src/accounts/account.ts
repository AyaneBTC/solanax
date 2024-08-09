import { AccountBalanceTokensInfo, TokenAccount } from "./types";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

/**
 * `getAccountBalanceTokensInfo` fetches the balance and token accounts of a given account.
 *
 * @param account public key of the account
 * @param config 
 * `balance`: whether to get account balance, default `false`. 
 * 
 * `token`: token mint address, or token program id(if starts with "Token"), 
 * or `true` to fetch all token balances, or `false` to skip fetching token balances, default `false`.
 * @param connection rpc connection, or uses default connection to devnet
 * @returns AccountBalanceTokensInfo including balance and token accounts
 */
export async function getAccountBalanceTokensInfo(
  account: PublicKey,
  config: {
    balance?: boolean;
    token?: boolean | PublicKey;
  } = { balance: false, token: false },
  connection?: Connection
): Promise<AccountBalanceTokensInfo> {
  if (!connection) {
    connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  }

  let accountBalance = 0;
  if (config.balance) {
    accountBalance = await connection.getBalance(account);
  }

  let tokens: TokenAccount[] = [];
  if (config.token instanceof PublicKey) {
    // fetch specific token balance
    let tokenAccounts;
    if (config.token.toString().startsWith("Token")) {
      tokenAccounts = await connection.getParsedTokenAccountsByOwner(account, {
        programId: config.token,
      });
    } else {
      tokenAccounts = await connection.getParsedTokenAccountsByOwner(account, {
        mint: config.token,
      });
    }
    tokens = tokenAccounts.value.map(
      (tokenAccount) => tokenAccount as TokenAccount
    );
  } else if (config.token) {
    // fetch all token balances
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      account,
      {
        programId: TOKEN_PROGRAM_ID, // NOTE: ignore 2022 upgrade
      }
    );
    tokens = tokenAccounts.value.map(
      (tokenAccount) => tokenAccount as TokenAccount
    );
  }
  return {
    pubkey: account,
    balance: accountBalance,
    tokens: tokens,
  };
}
