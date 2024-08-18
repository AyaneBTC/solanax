# SolanaX

Solana TypeScript SDK super extension, with better Solana helper functions.

## Usage

Use following command to add this extension to your project.

`npm install solanax`

## API

### Accounts

`getWallet`: powerful function to get a keypair. You can provide keypair file path, or a mnemonic, or a secret key, or None which means default keypair file path `~/.config/solana/id.json`.

`getWallets`: an array version of above functions. You can provide a directory or an array of keypair file path, a mnemonic or a secret key.

`logWalletInfo`: a helper function to show the public key, secret key, and secret key in uint8 array format.

`getAccountBalanceTokensInfo`: powerful function to retrive balance or spl tokens of given account.

### Tokens

`getTokenMetadataGeneral`: powerful function to get the token metadata. You can provide token mint of either classic version or 2022 version.

### Transactons

`transfer`: transfer SOL. The amount can have different formats, you can refer to `parseSolAmount`.

`batch_transfer` / `batch_gather`: batch 

### Utils

`parseSolAmount`: powerful function to parses different formats of SOL amounts and returns the amount in lamports. The following formats all represent sol instead of lamports: `1.5`, `"1.5"`, `"1.5sol"`, `"1.5 sol"`.

## Claim

This open-source project is provided "as is," without warranty of any kind. The contributors are not responsible for any potential financial loss or damage resulting from its use. Please use this software at your own risk and exercise caution.

## Buy me a coffee

BTC Address: bc1pjpx2mupcku5llldgj8ly3y3kkceamrxctgwx6eaz3pva5k80fz5sc8cthq

ETH Address: 0xb94bbf8b0e97c51d690d4efc311a204b9ea8833c

SOL Address: CV1pz5rYeAanimjG4jDhYEJTDwJcAAHGpyhdNUvAwyXM