import { Option } from "../../src/option/index";
describe("Option.none", () => {
  it("should return a None", () => {
    const value = Option.none();
    expect(value.isNone()).toBe(true);
  });
});
