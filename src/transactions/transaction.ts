import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { parseSolAmount } from "../utils";

export async function transfer(
  sender: Keypair,
  receiver: PublicKey,
  solAmount: number | string,
  connection?: Connection
) {
  if (!connection) {
    connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  }
  solAmount = parseSolAmount(solAmount);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiver,
      lamports: solAmount,
    })
  );
  const signers = [sender];
  const tx = await sendAndConfirmTransaction(connection, transaction, signers);
  console.log(
    `Tx ${tx}: ${sender.publicKey} sent ${solAmount} lamports to ${receiver}`
  );
}

export function batch_transfer() {}

export function batch_gather() {}

export function batch_transfer_token() {}

export function batch_gather_token() {}
