import { Option } from '../../src/option/index';

describe("Option.mapOr", () => {
  it("should apply the function to the value of a Some", () => {
    const value = Option.some(42);
    const mock = jest.fn();
    const mockFn = () => {
      mock();
      return 42;
    };
    const result = value.mapOr(0, mockFn);
    expect(result).toBe(42);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should return the default value for a None", () => {
    const value = Option.none<number>();
    const mock = jest.fn();
    expect(value.mapOr(0, mock)).toBe(0);
    expect(mock).not.toHaveBeenCalled();
  });
});
