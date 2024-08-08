import { getWallet, getWalletInfo, getWallets } from "../../src";

describe("Wallet", () => {
  it("should get wallet info", () => {
    const wallet = getWallet("tests/fixtures/wallets/id.json");
    const info = getWalletInfo(wallet);
    expect(info).toHaveProperty("publicKey");
    expect(info).toHaveProperty("secretKey");
  });

  it("should get wallets in a directory", () => {
    const wallets = getWallets("tests/fixtures/wallets");
    expect(wallets.length).toBe(3);
  });
});
