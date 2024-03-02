import { Option } from ".";

describe("Option.match", () => {
  it("should return the result of the reducer function if the Option is Some", () => {
    const value = Option.some(1).match(
      (v) => v + 1,
      () => 0
    );
    expect(value).toBe(2);
  });

  it("should return the result of the reducer function if the Option is None", () => {
    const value = Option.none<number>().match(
      (v) => v + 1,
      () => 0
    );
    expect(value).toBe(0);
  });
});
