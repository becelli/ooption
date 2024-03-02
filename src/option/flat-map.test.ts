import { Option, type None, type Some } from "./index";

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
});
