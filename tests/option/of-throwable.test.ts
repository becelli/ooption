import { Option } from "../../src/option/index";

describe("Option.ofThrowable", () => {
  it("should return Some if function does not throw", () => {
    const option = Option.ofThrowable(() => "foo");
    expect(option).toEqual(Option.of("foo"));
  });

  it("should return None if function throws", () => {
    const option = Option.ofThrowable(() => {
      throw new Error("foo");
    });
    expect(option).toEqual(Option.none());
  });

  it("should return None if function throws a string", () => {
    const option = Option.ofThrowable(() => {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw "foo";
    });
    expect(option).toEqual(Option.none());
  });
  it("should return Some if function does not throw", async () => {
    const option = await Option.ofThrowable(async () => await Promise.resolve("foo"));
    expect(option).toEqual(Option.of("foo"));
  });

  it("should return None if function throws", async () => {
    const option = await Option.ofThrowable(async () => {
      throw await Promise.resolve(new Error("foo"));
    });
    expect(option).toEqual(Option.none());
  });

  it("should return None if function throws a string", async () => {
    const option = await Option.ofThrowable(async () => {
      throw await Promise.resolve("foo");
    });
    expect(option).toEqual(Option.none());
  });
});
