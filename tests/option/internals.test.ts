import { Option } from "../../src";

describe("Option", () => {
  describe("JSON.stringify", () => {
    it("should return value when Some is JSON.stringify'ed", () => {
      const option = Option.some(1);
      expect(JSON.stringify(option)).toBe("1");
    });

    it("should return undefined when None is JSON.stringify'ed", () => {
      const option = Option.none();
      expect(JSON.stringify(option)).toBe(undefined);
    });
  });
  describe("toString", () => {
    it("should return 'Some(value)' when Some is toString'ed", () => {
      const option = Option.some(1);
      expect(String(option)).toBe(`Some(1)`);
    });
    it("should return 'None' when None is toString'ed", () => {
      const option = Option.none();
      expect(String(option)).toBe("None");
    });
  });

});
