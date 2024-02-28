import { Option } from ".";

describe("Option.filter", () => {
  it("should return the option if predicate returns true", async () => {
    const option = Option.of("foo");
    expect(await option.filter(async (value) => value === "foo")).toBe(option);
  });

  it("should return None if predicate returns false", async () => {
    const option = Option.of("foo");
    expect(await option.filter(async (value) => value === "bar")).toEqual(Option.none());
  });

  it("should return None if option is None", async () => {
    const option = Option.none<string>();
    expect(await option.filter(async (value) => value === "foo")).toBe(option);
  });

  it("should return None if option is null", async () => {
    const option = Option.of<string>(null);
    expect(await option.filter(async (value) => value === "foo")).toBe(option);
  });

  it("should return None if option is undefined", async () => {
    const option = Option.of<string>(undefined);
    expect(await option.filter(async (value) => value === "foo")).toBe(option);
  });
});
