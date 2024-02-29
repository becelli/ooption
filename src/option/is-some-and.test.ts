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
});
