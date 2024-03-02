import { Option, type None, type Some } from "./index";
describe("Option.andThen", () => {
  it("should return None when the value is None", async () => {
    const value = Option.none<number>().andThen((param) => Option.some(param));
    expect(value.isNone()).toBe(true);
  });

  it("should be inferred as Some if X is Some and the callback returns Some", () => {
    const value: Some<number> = Option.some(1).andThen(() => Option.some(2));
    expect(value.isSome()).toBe(true);
    expect(value.unwrap()).toBe(2);
  });

  it("should be inferred as none if X is Some and the callback returns None", () => {
    const value: None<string> = Option.some(1).andThen(() => Option.none<string>());
    expect(value.isNone()).toBe(true);
  });

  it("should be inferred as Optional if X is Optional and the callback returns Optional", () => {
    // @ts-expect-error
    const valueSome: Some<number> = Option.some(1).andThen(() => Option.of<number>(undefined));
    expect(valueSome.isNone()).toBe(true);
    // @ts-expect-error
    const valueNone: None<number> = Option.some(1).andThen((value) => Option.some(value + 1));
    expect(valueNone.isSome()).toBe(true);

  });
});
