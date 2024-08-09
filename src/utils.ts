/**
 * `parseSolAmount` parses different formats of SOL amounts and returns the amount in lamports.
 *
 * @param amount can be a string or a number.
 * If it is in the format `x sol`, it will be parsed as `x * 10^9`.
 * If it is a float, it will be multiplied by `10^9`.
 * Otherwise, it will directly be parsed as a number.
 * @returns the amount in lamports
 */
export function parseSolAmount(amount: number | string): number {
  if (typeof amount === "number" && !Number.isInteger(amount)) {
    amount = solToLamports(amount);
  }
  if (typeof amount === "string") {
    const re = /(\d+(\.\d+)?)\s*sol/;
    const match = amount.match(re);
    if (match) {
      amount = solToLamports(parseFloat(match[1]));
    } else {
      amount = parseFloat(amount);
      if (!Number.isInteger(amount)) {
        amount = solToLamports(amount);
      }
    }
  }
  if (!Number.isInteger(amount)) {
    amount = 0;
  }
  return amount;
}

export function lamportsToSol(lamports: number): number {
  return lamports / 10 ** 9;
}

export function solToLamports(sol: number): number {
  return sol * 10 ** 9;
}
