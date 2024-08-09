import { parseSolAmount } from "../src";

describe("Utils", () => {
  it("should get correct sol amount", () => {
    expect(parseSolAmount("1 sol")).toBe(1 * 10 ** 9);
    expect(parseSolAmount("1.5 sol")).toBe(1.5 * 10 ** 9);
    expect(parseSolAmount("1.5")).toBe(1.5 * 10 ** 9);
    expect(parseSolAmount(1.5)).toBe(1.5 * 10 ** 9);
    expect(parseSolAmount(1)).toBe(1);
    expect(parseSolAmount(1000000000)).toBe(1000000000);
    expect(parseSolAmount("abc")).toBe(0);
  });
});
