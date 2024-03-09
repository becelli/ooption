
import { Option } from '../../src/option/index';

describe("Option.zipWith", () => {
  it("should zip two options together", () => {
    const a = Option.some(1);
    const b = Option.some(2);
    const result = a.zipWith(b, (x, y) => x + y);
    expect(result).toEqual(Option.some(3));
  });

  it("should async zip two options together", async () => {
    const a = Option.some(1);
    const b = Option.some(2);
    const result = await a.zipWith(b, async (x, y) => Promise.resolve(x + y));
    expect(result).toEqual(Option.some(3));
  })

  it("should return None if either option is None", () => {
    const a = Option.none<number>();
    const b = Option.some(2);
    const result = a.zipWith(b, (x, y) => x + y);
    expect(result).toEqual(Option.none());
  });

  it("should async return None if either option is None", async () => {
    const a = Option.none<number>();
    const b = Option.some(2);
    const result = await a.zipWith(b, async (x, y) => Promise.resolve(x + y));
    expect(result).toEqual(Option.none());
  });

  it("should zip different types together", () => {
    const a = Option.some(1);
    const b = Option.some("2");
    const result = a.zipWith(b, (x, y) => x + y);
    expect(result).toEqual(Option.some("12"));
  });

  it("should return None if other option is None", () => {
    const a = Option.some(1);
    const b = Option.none<string>();
    const result = a.zipWith(b, (x, y) => x + y);
    expect(result).toEqual(Option.none());
  })

});
