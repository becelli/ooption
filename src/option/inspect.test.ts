import { Option } from "./index";

describe("Option.inspect", () => {
  it("should apply the function to the value of a Some", () => {
    const value = Option.some(42);
    const mock = jest.fn();
    expect(value.inspect(mock)).toBe(value);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should not apply the function to a None", () => {
    const value = Option.none<number>();
    const mock = jest.fn();
    expect(value.inspect(mock)).toBe(value);
    expect(mock).not.toHaveBeenCalled();
  });
});
