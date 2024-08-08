import { PublicKey } from "@solana/web3.js";
import { getAccountBalanceTokensInfo, getWallet, getWallets, logWalletInfo } from "../../src";

describe("Wallet", () => {
  it("should get wallet info", () => {
    const wallet = getWallet("tests/fixtures/wallets/id.json");
    logWalletInfo(wallet);
  });

  it("should get wallets in a directory", () => {
    const wallets = getWallets("tests/fixtures/wallets");
    expect(wallets.length).toBe(3);
  });

  it("should show account info", async () => {
    const account = new PublicKey("8CcSMDuzoRcBZ36uggJN9Fq8y2hGXeHifWxRFkuXM5t5"); // V
    const token = new PublicKey("2Eb2d8QA2z1YQG7JGPxfwr7Si3HxmFTGxihDkCTyzbSo"); // a random token
    const tokenInfo = await getAccountBalanceTokensInfo(account, true, token);
    console.log(tokenInfo);
    const accountInfo = await getAccountBalanceTokensInfo(account, true, true);
    console.log(accountInfo);
  });
});
