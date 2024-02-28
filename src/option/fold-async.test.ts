import { Option } from ".";

describe("Option.foldAsync", () => {
  it("should return the result of the reducer function if the Option is Some", async () => {
    const value = await Option.some(1).fold(
      async (v) => v + 1,
      async () => 0
    );
    expect(value).toBe(2);
  });

  it("should return the result of the reducer function if the Option is None", async () => {
    const value = await Option.none<number>().fold(
      async (v) => v + 1,
      async () => 0
    );
    expect(value).toBe(0);
  });
});
