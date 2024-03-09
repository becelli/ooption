import { Option } from '../../src/option/index';

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
  it("should return the result of the reducer function if the Option is Some", async () => {
    const value = await Option.some(1).match(
      async (v) => Promise.resolve(v + 1),
      async () => Promise.resolve(0)
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
