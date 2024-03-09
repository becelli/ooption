import { Option } from "../../src/option/index";

describe("Option.mapOrElse", () => {
  it("should apply the function to the value of a Some", () => {
    const myNumber = 42;
    const value = Option.some(myNumber);
    const mockElse: () => number = jest.fn();
    const mockMap: (n: number) => number = jest.fn<number, [number]>((n) => n ** 2);
    const result = value.mapOrElse(mockElse, mockMap);
    expect(result).toBe(myNumber ** 2);
    expect(mockElse).not.toHaveBeenCalled();
    expect(mockMap).toHaveBeenCalledTimes(1);
  });

  it("should apply the orElse function for a None", () => {
    const value = Option.none<number>();
    const mockElse: () => number = jest.fn();
    const mockMap: (n: number) => number = jest.fn<number, [number]>((n) => n ** 2);

    value.mapOrElse(mockElse, mockMap);
    expect(mockElse).toHaveBeenCalledTimes(1);
    expect(mockMap).not.toHaveBeenCalled();
  });

  it("should support async functions", async () => {
    const myNumber = 42;
    const value = Option.some(myNumber);
    const mockElse = async () => await Promise.resolve(0);
    const mockMapFn = async (n: number) => await Promise.resolve(n ** 2);

    const result = await value.mapOrElse(mockElse, mockMapFn);
    expect(result).toBe(myNumber ** 2);
  });
});
