import { Option } from ".";

describe("Option.flatMap", () => {
  it("should return the result of the function", async () => {
    const option = Option.of("foo");
    expect(await option.flatMap(async (value) => Option.of(value + "bar"))).toEqual(Option.of("foobar"));
  });

  it("should return None if function returns None", async () => {
    const option = Option.of("foo");
    expect(await option.flatMap(async () => Option.none())).toEqual(Option.none());
  });

  it("should return None if option is None", async () => {
    const option = Option.none<string>();
    expect(await option.flatMap(async (value) => Option.of(value + "bar"))).toBe(option);
  });

  it("should return None if option is null", async () => {
    const option = Option.of<string>(null);
    expect(await option.flatMap(async (value) => Option.of(value + "bar"))).toBe(option);
  });

  it("should return None if option is undefined", async () => {
    const option = Option.of<string>(undefined);
    expect(await option.flatMap(async (value) => Option.of(value + "bar"))).toBe(option);
  });
});
