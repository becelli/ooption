import { Option } from ".";

describe("Option.equals", () => {
  it("should return true if both Options are None", async () => {
    const value = Option.none<number>();
    const equal = await value.equals(Option.none<number>(), async (a, b) => a === b);
    expect(equal).toBe(true);
  });

  it("should return false if one Option is None", async () => {
    const value = Option.none<number>();
    const equal = await value.equals(Option.some(1), async (a, b) => a === b);
    expect(equal).toBe(false);
  });

  it("should return true if both Options are Some and the values are equal", async () => {
    const value = await Option.some(1).equals(Option.some(1), async (a, b) => a === b);
    expect(value).toBe(true);
  });

  it("should return false if both Options are Some and the values are not equal", async () => {
    const value = await Option.some<number>(1).equals(Option.some<number>(2), async (a, b) => a === b);
    expect(value).toBe(false);
  });

  it("should use the provided equality function", async () => {
    await Option.some({ foo: "bar" }).equals(Option.some({ foo: "bar" }), async (a, b) => a.foo === b.foo);
  });

  it("should use the default equality function if none is provided", async () => {
    const value = await Option.some({ foo: "bar" }).equals(Option.some({ foo: "bar" }));
    expect(value).toBe(false);
  });

  it("should return false if the option is Some and the other is None", async () => {
    const value = await Option.some<number>(1).equals(Option.none(), async (a, b) => a === b);
    expect(value).toBe(false);
  });
});
