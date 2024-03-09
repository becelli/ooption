import { Option } from '../../src/option/index';

describe("Option.expect", () => {
  it("should return the value if option isSome", () => {
    const option = Option.of<string>("foo");
    expect(option.expect("bar")).toBe("foo");
  });
  it("should throw the error message if option isNone", () => {
    const option = Option.none();
    expect(() => option.expect("bar")).toThrow("bar");
  });
  it("should throw the error message if option isNull", () => {
    const option = Option.of<string>(null);
    expect(() => option.expect("bar")).toThrow("bar");
  });
  it("should throw the error message if option isUndefined", () => {
    const option = Option.of<string>(undefined);
    expect(() => option.expect("bar")).toThrow("bar");
  });
  it("should throw custom error if option isNone", () => {
    const option = Option.none();
    expect(() => option.expect(new Error("bar"))).toThrow("bar");
  })
})
