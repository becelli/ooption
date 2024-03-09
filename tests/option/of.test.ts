import { Option } from '../../src/option/index';

describe("Option.of", () => {
  it("should return a Some when the value is not null or undefined", () => {
    const value = Option.of(1);
    expect(value.isSome()).toBe(true);
    expect(value.isNone()).toBe(false);
  });

  it("should return a None when the value is null", () => {
    const value = Option.of(null);
    expect(value.isNone()).toBe(true);
  });

  it("should return a None when the value is undefined", () => {
    const value = Option.of(undefined);
    expect(value.isNone()).toBe(true);
  });
});
