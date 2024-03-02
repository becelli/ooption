import { Option } from "./index";

describe("Option.mapOrElse", () => {
  it("should apply the function to the value of a Some", () => {
    const value = Option.some(42);
    const mockElse = jest.fn();
    const mockMap = jest.fn();
    const mockMapFn = () => {
      mockMap();
      return 42;
    };

    const result = value.mapOrElse(mockElse, mockMapFn);
    expect(result).toBe(42);
  });

  it("should apply the orElse function for a None", () => {
    const value = Option.none<number>();
    const mockElse = jest.fn();
    const mockMap = jest.fn();
    const mockMapFn = () => {
      mockMap();
      return 42;
    };

    const result = value.mapOrElse(mockElse, mockMapFn);
    expect(() => result.unwrap()).toThrow();
    expect(mockElse).toHaveBeenCalledTimes(1);
    expect(mockMap).not.toHaveBeenCalled();
  });

  it("should support async functions", async () => {
    const value = Option.some(42);
    const mockElse = jest.fn();
    const mockMap = jest.fn();
    const mockMapFn = async () => {
      mockMap();
      return 42;
    };

    const result = await value.mapOrElse(mockElse, mockMapFn);
    expect(result).toBe(42);
  });
});
