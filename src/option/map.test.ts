import { Option } from ".";

describe("Option.map", () => {
  it("should return the mapped value if option isSome", () => {
    const option = Option.of("foo");
    expect(option.map((value) => value.toUpperCase())).toEqual(Option.of("FOO"));
  });

  it("should return the option if option isNone", () => {
    const option = Option.none<string>();
    expect(option.map((value) => value.toUpperCase())).toBe(option);
  });

  it("should return the option if option isNull", () => {
    const option = Option.of<string>(null);
    expect(option.map((value) => value.toUpperCase())).toBe(option);
  });

  it("should return the option if option isUndefined", () => {
    const option = Option.of<string>(undefined);
    expect(option.map((value) => value.toUpperCase())).toBe(option);
  });

  it("should throw if option isSome and function throws", () => {
    const option = Option.of("foo");
    expect(() =>
      option.map(() => {
        throw new Error("foo");
      }),
    ).toThrow();
  });

  it("should throw if option isSome and function throws a string", () => {
    const option = Option.of("foo");
    expect(() =>
      option.map(() => {
        throw "foo";
      }),
    ).toThrow();
  });

  it("should infer the value is some if the function returns a non-nullable value", () => {
    const option = Option.some("foo");
    const result = option.map((value) => value.toUpperCase());
    expect(result.get()).toBe("FOO");
  });

  it("should infer the value is none if the function returns a nullable value", () => {
    const option = Option.some("foo");
    const result = option.map((value) => (value === "foo" ? null : value));
    expect(result.isNone()).toBe(true);
  });
});
