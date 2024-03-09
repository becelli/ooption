import { Option, type None, type Some } from "../../src/option/index";

describe("Option.flatMap", () => {
  it("should return the result of the function", () => {
    const option: Some<"foo"> = Option.of("foo");
    const result: Some<string> = option.flatMap((value) => Option.of(value + "bar"));
    expect(result).toEqual(Option.of("foobar"));
  });

  it("should return None if function returns None", () => {
    const option: Some<"foo"> = Option.of("foo");
    const result: None<string> = option.flatMap(() => Option.none<string>());
    expect(result).toEqual(Option.none());
  });

  it("should return None if option is None", () => {
    const option: None<string> = Option.none<string>();
    const result = option.flatMap((value) => Option.of<string>(value + "bar"));
    expect(result).toBe(option);
  });

  it("should return None if option is null", () => {
    const option: None<string> = Option.of<string>(null);
    const result: None<string> = option.flatMap((value) => Option.of(value + "bar"));
    expect(result).toBe(option);
  });

  it("should return None if option is undefined", () => {
    const option: None<string> = Option.of<string>(undefined);
    const result: None<string> = option.flatMap((value) => Option.of(value + "bar"));
    expect(result).toBe(option);
  });
  it("should return the result of the function", async () => {
    const option = Option.of("foo");
    expect(await option.flatMap(async (value) => await Promise.resolve(Option.of(value + "bar")))).toEqual(
      Option.of("foobar"),
    );
  });

  it("should return None if function returns None", async () => {
    const option = Option.of("foo");
    expect(await option.flatMap(async () => await Promise.resolve(Option.none()))).toEqual(Option.none());
  });

  it("should return None if option is None", async () => {
    const option = Option.none<string>();
    expect(await option.flatMap(async (value) => await Promise.resolve(Option.of(value + "bar")))).toBe(option);
  });

  it("should return None if option is null", async () => {
    const option = Option.of<string>(null);
    expect(await option.flatMap(async (value) => await Promise.resolve(Option.of(value + "bar")))).toBe(option);
  });

  it("should return None if option is undefined", async () => {
    const option = Option.of<string>(undefined);
    expect(await option.flatMap(async (value) => await Promise.resolve(Option.of(value + "bar")))).toBe(option);
  });
});
