import { Option } from ".";

describe("Option.match", () => {
  it("should return the result of the reducer function if the Option is Some", async () => {
    const value = await Option.some(1).match(
      async (v) => Promise.resolve(v + 1),
      async () => 0
    );
    expect(value).toBe(2);
  });

  it("should return the result of the reducer function if the Option is None", async () => {
    const value = await Option.none<number>().match(
      async (v) => Promise.resolve(v + 1),
      async () => Promise.resolve(0)
    );
    expect(value).toBe(0);
  });
});
