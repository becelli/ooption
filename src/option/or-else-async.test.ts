import { Option } from ".";

describe("Option.orElse", () => {
  it("should return the option if option isSome", async () => {
    const option = Option.of("foo");
    expect(await option.orElse(() => Promise.resolve(Option.of("bar")))).toBe(option);
  });

  it("should return the other option if option isNone", async () => {
    const option = Option.none();
    const other = Option.of("bar");
    expect(await option.orElse(() => Promise.resolve(other))).toBe(other);
  });

  it("should return the other option if option isNull", async () => {
    const option = Option.of<string>(null);
    const other = Option.of("bar");
    expect(await option.orElse(() => Promise.resolve(other))).toBe(other);
  });

  it("should return the other option if option isUndefined", async () => {
    const option = Option.of<string>(undefined);
    const other = Option.of("bar");
    expect(await option.orElse(() => Promise.resolve(other))).toBe(other);
  });
});
