import { Option } from "../../src/option/index";

describe("Option.unwrapOrNull", () => {
  it("should return the value if option isSome", () => {
    const option = Option.of<string>("foo");
    expect(option.unwrapOrNull()).toBe("foo");
  });
  it("should return undefined if option isNone", () => {
    const option = Option.none();
    expect(option.unwrapOrNull()).toBeNull();
  });
  it("should return undefined if option isNull", () => {
    const option = Option.of<string>(null);
    expect(option.unwrapOrNull()).toBeNull();
  });
  it("should return undefined if option isUndefined", () => {
    const option = Option.of<string>(undefined);
    expect(option.unwrapOrNull()).toBeNull();
  });
});
