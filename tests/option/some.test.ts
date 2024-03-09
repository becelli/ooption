import { Option } from "../../src/option/index";

describe("Option.some", () => {
  it("should return a Some when the value is not null or undefined", () => {
    const value = Option.some(1);
    expect(value.isSome()).toBe(true);
    expect(value.isNone()).toBe(false);
  });

  it("should be impossible to construct a Some with a null value", () => {
    // @ts-expect-error Should not be possible to construct a Some with a null value
    Option.some(null);
  });

  it("should be impossible to construct a Some with an undefined value", () => {
    // @ts-expect-error Should not be possible to construct a Some with an undefined value
    Option.some(undefined);
  });
});
