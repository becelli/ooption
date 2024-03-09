import { Option } from '../../src/option/index';

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
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw "foo";
      }),
    ).toThrow();
  });

  it("should infer the value is some if the function returns a non-nullable value", () => {
    const option = Option.some("foo");
    const result = option.map((value) => value.toUpperCase());
    expect(result.unwrap()).toBe("FOO");
  });

  it("should infer the value is none if the function returns a nullable value", () => {
    const option = Option.some<string>("foo");
    const result = option.map((value) => (value === "foo" ? null : value));
    expect(result.isNone()).toBe(true);
  });

  it("should return the mapped value if option isSome", async () => {
    const option = Option.of("foo");
    expect(await option.map(async (value) => await Promise.resolve(value.toUpperCase()))).toEqual(Option.of("FOO"));
  });

  it("should return the option if option isNone", async () => {
    const option = Option.none<string>();
    const mapped = await option.map(async (value) => await Promise.resolve(value.toUpperCase()));
    expect(mapped).toBe(option);
  });

  it("should return the option if option isNull", async () => {
    const option = Option.of<string>(null);
    const mapped = await option.map(async (value) => await Promise.resolve(value.toUpperCase()));
    expect(mapped).toBe(option);
  });

  it("should return the option if option isUndefined", async () => {
    const option = Option.of<string>(undefined);
    expect(await option.map(async (value) => await Promise.resolve(value.toUpperCase()))).toBe(option);
  });

  it("should infer the value is some if the function returns a non-nullable value", async () => {
    const option = Option.some("foo");
    const result = await option.map(async (value) => await Promise.resolve(value.toUpperCase()));
    expect(result.unwrap()).toBe("FOO");
  });

  it("should infer the value is none if the function returns a nullable value", async () => {
    const option = Option.some<string>("foo");
    const result = await option.map(async (value) => await Promise.resolve((value === "foo" ? null : value)));
    expect(result.isNone()).toBe(true);
  });
});
