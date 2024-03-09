import { Option, type None, type Some } from '../../src/option/index';

describe("Option.and", () => {
  it("should return None when the value is None", () => {
    const value = Option.none<number>().and(Option.some(1));
    expect(value.isNone()).toBe(true);
  });

  it("should return None when the other value is None", () => {
    const value = Option.some(1).and(Option.none<number>());
    expect(value.isNone()).toBe(true);
  });

  it("should return Some when both values are Some", () => {
    const value = Option.some(1).and(Option.some(2));
    expect(value.isSome()).toBe(true);
    expect(value.unwrap()).toBe(2);
  });

  it("should be inferred as Some if X is Some and other is Some", () => {
    const value: Some<number> = Option.some(1).and(Option.some(2));
    value;
  });

  it("should be inferred as none if X is Some and other is None", () => {
    const value: None<string> = Option.some(1).and(Option.none<string>());
    value;
  });

  it("should be inferred as none if X is None and other is Some", () => {
    const value: None<number> = Option.none<number>().and(Option.some(1));
    value;
  });

  it("should be inferred as none if X is None and other is None", () => {
    const value: None<number> = Option.none<number>().and(Option.none<number>());
    value;
  });

  it("should be inferred as Optional if X is Optional and the callback returns Optional", () => {
    // @ts-expect-error - The value failed to be inferred as None<number>
    const valueSome: Some<number> = Option.some(1).and(Option.of<number>(undefined));
    valueSome;
    // @ts-expect-error - The value failed to be inferred as Some<number>
    const valueNone: None<number> = Option.some(1).and(Option.some(2));
    valueNone;
  });
});
