import { Option } from ".";

describe("Option.or", () => {
  it("should return the option if it is Some", () => {
    const option = Option.of<string>("foo");
    expect(option.or(Option.of<string>("bar"))).toBe(option);
  });
  it("should return the other option if it is Some", () => {
    const option = Option.none<string>();
    const other = Option.of<string>("bar");
    expect(option.or(other)).toBe(other);
  });
  it("should return the other option if it is None", () => {
    const option = Option.none<string>();
    const other = Option.none<string>();
    expect(option.or(other)).toBe(other);
  });
})
