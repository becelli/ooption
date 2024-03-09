import { Option } from ".";

describe("Option.isSomeAnd", () => {
  it("should return true if the value isSomeAnd the predicate", () => {
    expect(Option.of(1).isSomeAnd((n) => n > 0)).toBe(true);
  });

  it("should return false if the value does not satisfy the predicate", () => {
    expect(Option.of(1).isSomeAnd((n) => n < 0)).toBe(false);
  });

  it("should return false if the value is None", () => {
    expect(Option.none<number>().isSomeAnd((n) => n > 0)).toBe(false);
  });
  it("should return true if the value satisfies the predicate", async () => {
    expect(await Option.of(1).isSomeAnd(async (n) => n > 0)).toBe(true);
  });

  it("should return false if the value does not satisfy the predicate", async () => {
    expect(await Option.of(1).isSomeAnd(async (n) => n < 0)).toBe(false);
  });

  it("should return false if the value is None", async () => {
    expect(await Option.none<number>().isSomeAnd(async (n) => n > 0)).toBe(false);
  });
});
