import { valueCompare } from "./util";

describe("valueCompare", () => {
  const a = { a: { b: 1 } };
  const b = { a: { b: 2 } };
  it("compares false", () => {
    expect(valueCompare(a, b)).toBe(false);
  });
  it("compares true", () => {
    const b = { a: { b: 1 } };
    expect(valueCompare(a, b)).toBe(true);
  });
  it("mutates next", () => {
    const _b = { a: { b: 1 } };
    expect(valueCompare(a, _b)).toBe(true);
    expect(_b.a).toBe(a.a);
  });
});
