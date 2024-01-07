import { Option } from "@/option";

describe("Option.mapAsync", () => {
  it("should return the mapped value if option isSome", async () => {
    const option = Option.of("foo");
    expect(await option.mapAsync(async (value) => value.toUpperCase())).toEqual(Option.of("FOO"));
  });

  it("should return the option if option isNone", async () => {
    const option = Option.none<string>();
    expect(await option.mapAsync(async (value) => value.toUpperCase())).toBe(option);
  });

  it("should return the option if option isNull", async () => {
    const option = Option.of<string>(null);
    expect(await option.mapAsync(async (value) => value.toUpperCase())).toBe(option);
  });

  it("should return the option if option isUndefined", async () => {
    const option = Option.of<string>(undefined);
    expect(await option.mapAsync(async (value) => value.toUpperCase())).toBe(option);
  });

  it("should infer the value is some if the function returns a non-nullable value", async () => {
    const option = Option.some("foo");
    const result = await option.mapAsync(async (value) => value.toUpperCase());
    expect(result.get()).toBe("FOO");
  });

  it("should infer the value is none if the function returns a nullable value", async () => {
    const option = Option.some("foo");
    const result = await option.mapAsync(async (value) => (value === "foo" ? null : value));
    expect(result.isNone()).toBe(true);
  });
});
