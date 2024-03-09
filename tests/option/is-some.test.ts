import { Option } from "../../src/option/index";

describe("Option.isSome", () => {
  it("should return true if option isSome", () => {
    const option = Option.of("foo");
    expect(option.isSome()).toBe(true);
    if (option.isSome()) {
      expect(option.unwrap()).toBe("foo");
    }
  });

  it("should return false if option isNone", () => {
    const option = Option.none();
    if (option.isSome()) {
      // @ts-expect-error option should be a never
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
      expect(() => option.unwrap()).toThrow();
    }
    expect(option.isSome()).toBe(false);
  });
});
