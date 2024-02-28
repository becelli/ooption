import { Option } from ".";

describe("Option.reduce", () => {
  it("should return the initial value if the Option is None", async () => {
    const value = await Option.none<number>().reduce(0, async (acc, v) => acc + v);
    expect(value).toBe(0);
  });

  it("should return the result of the reducer function if the Option is Some", async () => {
    const value = await Option.some(1).reduce(0, async (acc, v) => acc + v);
    expect(value).toBe(1);
  });
});
