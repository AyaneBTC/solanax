import { AccountBalanceTokensInfo, TokenAccount } from "types";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

/**
 * `getAccountBalanceTokensInfo` fetches the balance and token accounts of a given account.
 *
 * @param account public key of the account
 * @param token token mint address, or `true` to fetch all token balances, or `false` to skip fetching token balances
 * @param connection rpc connection, or uses default connection to devnet
 * @returns AccountBalanceTokensInfo including balance and token accounts
 */
export async function getAccountBalanceTokensInfo(
  account: PublicKey,
  balance: boolean = false,
  token: boolean | PublicKey = false,
  connection?: Connection
): Promise<AccountBalanceTokensInfo> {
  if (!connection) {
    connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  }

  let accountBalance = 0;
  if (balance) {
    accountBalance = await connection.getBalance(account);
  }

  let tokens: TokenAccount[] = [];
  if (token instanceof PublicKey) {
    // fetch specific token balance
    let tokenAccounts;
    if (token.toString().startsWith("Token")) {
      tokenAccounts = await connection.getParsedTokenAccountsByOwner(account, {
        programId: token,
      });
    } else {
      tokenAccounts = await connection.getParsedTokenAccountsByOwner(account, {
        mint: token,
      });
    }
    tokens = tokenAccounts.value.map(
      (tokenAccount) => tokenAccount as TokenAccount
    );
  } else if (token) {
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
