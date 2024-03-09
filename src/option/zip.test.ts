import { Option } from "./index";

describe("Option.zip", () => {
  it("should zip two options together", () => {
    const a = Option.some(1);
    const b = Option.some(2);
    const result = a.zip(b);
    expect(result).toEqual(Option.some([1, 2]));
  });

  it("should return None if either option is None", () => {
    const a = Option.none<number>();
    const b = Option.some(2);
    const result = a.zip(b);
    expect(result).toEqual(Option.none());
  });
  it("should return None if either option is None", () => {
    const a = Option.some(1);
    const b = Option.none<number>();
    const result = a.zip(b);
    expect(result).toEqual(Option.none());
  })
});
