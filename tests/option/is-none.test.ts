import { Option } from "../../src/option/index";

describe("Option.isNone", () => {
  it("should return false if option isSome", () => {
    const option = Option.of("foo");
    expect(option.isNone()).toBe(false);
  });

  it("should return true if option isNone", () => {
    const option = Option.none();
    expect(option.isNone()).toBe(true);
  });
});
