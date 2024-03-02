import { Option } from ".";

describe("Option.unwrapOrElse", () => {
  it("should return the value if option isSome", async () => {
    const option = Option.of<string>("foo");
    expect(await option.unwrapOrElse(() => Promise.resolve("bar"))).toBe("foo");
  });

  it("should return the default value if option isNone", async () => {
    const option = Option.none();
    expect(await option.unwrapOrElse(() => Promise.resolve("bar"))).toBe("bar");
  });

  it("should return the default value if option isNull", async () => {
    const option = Option.of<string>(null);
    expect(await option.unwrapOrElse(() => Promise.resolve("bar"))).toBe("bar");
  });

  it("should return the default value if option isUndefined", async () => {
    const option = Option.of<string>(undefined);
    expect(await option.unwrapOrElse(() => Promise.resolve("bar"))).toBe("bar");
  });
});
