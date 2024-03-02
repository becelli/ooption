import { Option } from ".";

describe("Option.unwrapOrElse", () => {
  it("should return the value if option isSome", () => {
    const option = Option.of<string>("foo");
    expect(option.unwrapOrElse(() => "bar")).toBe("foo");
  });

  it("should return the default value if option isNone", () => {
    const option = Option.none();
    expect(option.unwrapOrElse(() => "bar")).toBe("bar");
  });

  it("should return the default value if option isNull", () => {
    const option = Option.of<string>(null);
    expect(option.unwrapOrElse(() => "bar")).toBe("bar");
  });

  it("should return the default value if option isUndefined", () => {
    const option = Option.of<string>(undefined);
    expect(option.unwrapOrElse(() => "bar")).toBe("bar");
  });
});
