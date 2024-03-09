import { Option, type None, type Some } from ".";

describe("Option.filter", () => {
  it("should return the option if predicate returns true", () => {
    const option = Option.of("foo");
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should return None if predicate returns false", () => {
    const option = Option.of<string>("foo");
    expect(option.filter((value) => value === "bar")).toEqual(Option.none());
  });

  it("should return None if option is None", () => {
    const option = Option.none<string>();
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should return None if option is null", () => {
    const option = Option.of<string>(null);
    expect(option.filter((value) => value === "foo")).toBe(option);
  });

  it("should infer as None if the predicate returns false", async () => {
    const option: None<string> = Option.some<string>("foo").filter(() => false as const);
    option;
  });

  it("should infer as Some if the predicate returns true", async () => {
    const option: Some<string> = Option.some<string>("foo").filter(() => true as const);
    option;
  });
  it("should return the option if predicate returns true", async () => {
    const option = Option.of("foo");
    expect(await option.filter(async (value) => value === "foo")).toBe(option);
  });

  it("should return None if predicate returns false", async () => {
    const option = Option.of<string>("foo");
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

  it("should infer as None if the predicate returns false", async () => {
    const option: None<string> = await Option.some<string>("foo").filter(async () => false);
    option;
  });

  it("should infer as Some if the predicate returns true", async () => {
    const option: Some<string> = await Option.some<string>("foo").filter(async () => true);
    option;
  });
});
