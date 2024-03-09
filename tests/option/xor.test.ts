import { Option } from '../../src/option/index';

describe("Option.xor", () => {
  it("should return None if both options are None", () => {
    const a = Option.none<number>();
    const b = Option.none<number>();
    const result = a.xor(b);
    expect(result).toEqual(Option.none());
    const result2 = b.xor(a);
    expect(result2).toEqual(Option.none());
  });

  it("should return Some if one option is Some", () => {
    const a = Option.none<number>();
    const b = Option.some(2);
    const result = a.xor(b);
    expect(result).toEqual(Option.some(2));

    const result2 = b.xor(a);
    expect(result2).toEqual(Option.some(2));
  });

  it("should return None if both options are Some", () => {
    const a = Option.some(1);
    const b = Option.some(2);
    const result = a.xor(b);
    expect(result).toEqual(Option.none());
    const result2 = b.xor(a);
    expect(result2).toEqual(Option.none());
  });
})