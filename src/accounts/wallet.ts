import fs from "fs";
import os from "os";
import path from "path";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";

/**
 * `getWallet` function returns a keypair from a wallet file, a mnemonic, a secret key or None.
 *
 * @throws Error if wallet is not found or invalid.
 * @param wallet `wallet` can be keypair file path, a mnemonic, a secret key or None.
 * If `wallet` is None, it will try to read the default wallet file from `~/.config/solana/id.json`.
 * If `wallet` is a mnemonic, it will derive the first keypair from the mnemonic.
 * @returns Keypair
 */
export function getWallet(wallet?: string): Keypair {
  if (!wallet) {
    const home = os.homedir();
    wallet = fs.readFileSync(
      path.join(home, ".config/solana/id.json"),
      "utf-8"
    );
  } else if (fs.existsSync(wallet)) {
    wallet = fs.readFileSync(wallet, "utf-8");
  }

  if (wallet.startsWith("[")) {
    const raw = new Uint8Array(JSON.parse(wallet));
    return Keypair.fromSecretKey(raw);
  }

  if (wallet.split(" ").length > 1) {
    const seed = mnemonicToSeedSync(wallet, "");
    const path = `m/44'/501'/0'/0'`; // we assume it's first path
    return Keypair.fromSeed(derivePath(path, seed.toString("hex")).key);
  }

  return Keypair.fromSecretKey(bs58.decode(wallet));
}

/**
 * `getWallets` function returns an array of keypairs from an array of wallets.
 *
 * @throws Error if wallet is not found or invalid.
 * @param wallets Wallets' directory path or an array of wallets.
 * @returns An array of keypairs.
 * @see getWallet
 *
 */
export function getWallets(wallets: string | string[]): Keypair[] {
  if (typeof wallets === "string") {
    // read all the files in the `wallets` directory
    wallets = fs
      .readdirSync(wallets)
      .map((file) => path.join(wallets as string, file));
  }
  return wallets.map((wallet) => getWallet(wallet));
}

/**
 * `logWalletInfo` function logs the wallet's public key and secret key.
 * @param wallet A keypair or a string(keypair file path, a mnemonic, a secret key) or None.
 * @see getWallet
 */
export function logWalletInfo(wallet?: string | Keypair) {
  if (!wallet) {
    wallet = getWallet();
  }

  if (typeof wallet === "string") {
    wallet = getWallet(wallet);
  }

  console.log(`PublicKey: ${wallet.publicKey.toBase58()}`);
  console.log(`SecretKey: ${bs58.encode(wallet.secretKey)}`);
  console.log(`SecretKey(uint8): [${wallet.secretKey.toString()}]`);
}
