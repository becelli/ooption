import { Option } from ".";

describe("Option.isSome", () => {
  it("should return true if option isSome", () => {
    const option = Option.of("foo");
    expect(option.isSome()).toBe(true);
    if (option.isSome()) {
      expect(option.get()).toBe("foo");
    }
  });

  it("should return false if option isNone", () => {
    const option = Option.none();
    if (option.isSome()) {
      expect(option.unwrap()).toBe("foo");
    }
    expect(option.isSome()).toBe(false);
  });
});
