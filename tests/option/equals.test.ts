import { Option } from '../../src/option/index';

describe("Option.equals", () => {
  it("should return true if both options are None", () => {
    const option1 = Option.none();
    const option2 = Option.none();
    expect(option1.equals(option2)).toBe(true);
  });

  it("should return false if one option is None and the other is Some", () => {
    const option1 = Option.none();
    const option2 = Option.of<string>("foo");
    expect(option1.equals(option2)).toBe(false);
  });

  it("should return false if one option is Some and the other is None", () => {
    const option1 = Option.of<string>("foo");
    const option2 = Option.none<string>();
    expect(option1.equals(option2)).toBe(false);
  });

  it("should return true if both options are Some and have the same value", () => {
    const option1 = Option.of<string>("foo");
    const option2 = Option.of<string>("foo");
    expect(option1.equals(option2)).toBe(true);
  });

  it("should return false if both options are Some and have different values", () => {
    const option1 = Option.of<string>("foo");
    const option2 = Option.of<string>("bar");
    expect(option1.equals(option2)).toBe(false);
  });

  it("should return false if both options are Some and have different objects", () => {
    const option1 = Option.of({});
    const option2 = Option.of({});
    expect(option1.equals(option2)).toBe(false);
  });

  it("should compare using the provided comparator", () => {
    const option1 = Option.of<string>("foo");
    const option2 = Option.of<string>("bar");
    expect(option1.equals(option2, (a, b) => a.length === b.length)).toBe(true);
  });

  it("should return false if the comparator returns false", () => {
    const option1 = Option.of<string>("foo");
    const option2 = Option.of<string>("bar");
    expect(option1.equals(option2, () => false)).toBe(false);
  });

  it("should return true if the comparator returns true", () => {
    const option1 = Option.of<string>("foo");
    const option2 = Option.of<string>("bar");
    expect(option1.equals(option2, () => true)).toBe(true);
  });

  it("should return false if the comparator returns true for None and false for Some", () => {
    const option1 = Option.of<string>("foo");
    const option2 = Option.none<string>();
    expect(option1.equals(option2, () => true)).toBe(false);
  });
  it("should return true if both Options are None", async () => {
    const value = Option.none<number>();
    const equal = await value.equals(Option.none<number>(), async (a, b) => await Promise.resolve(a === b));
    expect(equal).toBe(true);
  });

  it("should return false if one Option is None", async () => {
    const value = Option.none<number>();
    const equal = await value.equals(Option.some(1), async (a, b) => await Promise.resolve(a === b));
    expect(equal).toBe(false);
  });

  it("should return true if both Options are Some and the values are equal", async () => {
    const value = await Option.some<number>(1).equals(Option.some(1), async (a, b) => await Promise.resolve(a === b));
    expect(value).toBe(true);
  });

  it("should return false if both Options are Some and the values are not equal", async () => {
    const value = await Option.some<number>(1).equals(Option.some<number>(2), async (a, b) => await Promise.resolve(a === b));
    expect(value).toBe(false);
  });

  it("should use the provided equality function", async () => {
    await Option.some({ foo: "bar" }).equals(Option.some({ foo: "bar" }), async (a, b) => await Promise.resolve(a.foo === b.foo))
  });

  it("should use the default equality function if none is provided", async () => {
    const value = await Option.some({ foo: "bar" }).equals(Option.some({ foo: "bar" }));
    expect(value).toBe(false);
  });

  it("should return false if the option is Some and the other is None", async () => {
    const value = await Option.some<number>(1).equals(Option.none());
    expect(value).toBe(false);
  });
});
