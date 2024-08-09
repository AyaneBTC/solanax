import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { lamportsToSol, parseSolAmount } from "../utils";

/**
 * `transfer` sends lamports from sender to receiver.
 *
 * @param sender Keypair of the sender
 * @param receiver Public key of the receiver
 * @param solAmount amount of lamports to send, can be number or string(eg. "0.1", "1 sol", "1000000000", "all").
 * @see parseSolAmount
 * @param connection rpc connection, or uses default connection to devnet
 */
export async function transfer(
  sender: Keypair,
  receiver: PublicKey,
  solAmount: number | string,
  connection?: Connection
) {
  if (!connection) {
    connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  }
  if (solAmount === "all") {
    solAmount = (await connection.getBalance(sender.publicKey)) - 5000; // leave some for fees
  } else {
    solAmount = parseSolAmount(solAmount);
  }
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiver,
      lamports: solAmount,
    })
  );
  const signers = [sender];
  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    signers
  );
  console.log(
    `Signature ${signature}: ${sender.publicKey} sent ${lamportsToSol(
      solAmount
    )} sol (${solAmount} lamports) to ${receiver}`
  );
}

/**
 * `batch_transfer` sends lamports from sender to multiple receivers.
 *
 * @param sender Keypair of the sender
 * @param receivers Public keys of the receivers
 * @param solAmount amount of lamports to send, can be number or string(eg. "0.1", "1 sol", "1000000000").
 * NOTE: "all" is not supported.
 * @see parseSolAmount
 * @param connection rpc connection, or uses default connection to devnet
 * @see transfer
 */
export function batch_transfer(
  sender: Keypair,
  receivers: PublicKey[],
  solAmount: number | string,
  connection?: Connection
) {
  // TODO: implement batch transfer
  if (solAmount === "all") {
    throw new Error("Cannot send 'all' in batch transfer");
  }
  solAmount = parseSolAmount(solAmount);
  for (const receiver of receivers) {
    transfer(sender, receiver, solAmount, connection);
  }
}

/**
 * `batch_gather` sends lamports from multiple senders to a receiver.
 *
 * @param senders Keypairs of the senders
 * @param receiver Public key of the receiver
 * @param solAmount amount of lamports to send, can be number or string(eg. "0.1", "1 sol", "1000000000", "all").
 * @see parseSolAmount
 * @param connection rpc connection, or uses default connection to devnet
 * @see transfer
 */
export function batch_gather(
  senders: Keypair[],
  receiver: PublicKey,
  solAmount: number | string,
  connection?: Connection
) {
  for (const sender of senders) {
    transfer(sender, receiver, solAmount, connection);
  }
}

export function batch_transfer_token() {}

export function batch_gather_token() {}
