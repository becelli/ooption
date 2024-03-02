import { Option } from ".";

describe("Option.orElse", () => {
  it("should return the option if option isSome", () => {
    const option = Option.of<string>("foo");
    expect(option.orElse(() => Option.of("bar"))).toBe(option);
  });

  it("should return the other option if option isNone", () => {
    const option = Option.none();
    const other = Option.of("bar");
    expect(option.orElse(() => other)).toBe(other);
  });

  it("should return the other option if option isNull", () => {
    const option = Option.of<string>(null);
    const other = Option.of("bar");
    expect(option.orElse(() => other)).toBe(other);
  });

  it("should return the other option if option isUndefined", () => {
    const option = Option.of<string>(undefined);
    const other = Option.of("bar");
    expect(option.orElse(() => other)).toBe(other);
  });
});
