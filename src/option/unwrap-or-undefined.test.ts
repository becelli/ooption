import { Option } from ".";

describe("Option.unwrapOrUndefined", () => {
  it("should return the value if option isSome", () => {
    const option = Option.of<string>("foo");
    expect(option.unwrapOrUndefined()).toBe("foo");
  });
  it("should return undefined if option isNone", () => {
    const option = Option.none();
    expect(option.unwrapOrUndefined()).toBeUndefined();
  });
  it("should return undefined if option isNull", () => {
    const option = Option.of<string>(null);
    expect(option.unwrapOrUndefined()).toBeUndefined();
  });
  it("should return undefined if option isUndefined", () => {
    const option = Option.of<string>(undefined);
    expect(option.unwrapOrUndefined()).toBeUndefined();
  });
})
