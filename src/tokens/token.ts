import {
  getTokenMetadata,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { fetchDigitalAsset, Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import type { TokenMetadata } from '@solana/spl-token-metadata';

/**
 * Fetches the general token metadata for a given mint (classic ver. or 2022 ver.).
 * 
 * @param mint PublicKey of the mint
 * @param programId Program ID of the mint. If not provided, it will be fetched from the mint account.
 * @param connection RPC connection to use. If not provided, it will use the devnet cluster.
 * @returns General token metadata or null if not found. `TokenMetadata` for 2022 tokens, `Metadata` for classic tokens.
 * @see TokenMetadata
 * @see Metadata
 */
export async function getTokenMetadataGeneral(
  mint: PublicKey,
  programId?: PublicKey,
  connection?: Connection
): Promise<Metadata | TokenMetadata | null> {
  if (!connection) {
    connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  }

  if (!programId) {
    const mintAccount = await connection.getAccountInfo(mint);
    if (!mintAccount) {
      return null;
    }
    programId = mintAccount.owner;
  }

  if (programId.equals(TOKEN_2022_PROGRAM_ID)) {
    // NOTE: Some expired data may not be accessible through this API
    return await getTokenMetadata(connection, mint);
  }
  if (programId.equals(TOKEN_PROGRAM_ID)) {
    const umi = createUmi(connection.rpcEndpoint);
    return (await fetchDigitalAsset(umi, mint as any)).metadata;
  }

  return null;
}
