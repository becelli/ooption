import { Option } from "./index";

describe("Option.inspect", () => {
  it("should apply the function to the value of a Some", async () => {
    const value = Option.some(42);
    const mock = jest.fn();
    const mockFn = async () => {
      await Promise.resolve();
      await mock();
    };

    expect(await value.inspect(mockFn)).toBe(value);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should not apply the async function to a None", async () => {
    const value = Option.none<number>();
    const mock = jest.fn();
    const mockFn = async () => {
      await Promise.resolve();
      await mock();
    };

    expect(await value.inspect(mockFn)).toBe(value);
    expect(mock).toHaveBeenCalledTimes(0);
  });
});
