import { Option, type None, type Optional, type Some } from "./index";
describe("Option.flatten", () => {
  it("should flatten a nested Option", () => {
    const nested: Optional<Optional<number>> = Option.some(Option.some(42));
    const flattened = nested.flatten();
    expect(flattened.unwrap()).toBe(42);
  });

  it("should flatten a nested None", () => {
    const nested: Optional<Optional<number>> = Option.some(Option.none());
    const flattened = nested.flatten();
    expect(flattened.isNone()).toBe(true);
  });

  it("should flatten a None", () => {
    const nested: None<None<number>> = Option.none();
    const flattened = nested.flatten();
    expect(flattened.isNone()).toBe(true);
  });

  it("should flatten a nested Some", () => {
    const nested: Some<Some<number>> = Option.of(Option.of(42));
    const flattened = nested.flatten();
    expect(flattened.unwrap()).toBe(42);
  });

  it("should flatten a nested Some and None", () => {
    const nested: Some<None<number>> = Option.of(Option.none<number>());
    const flattened = nested.flatten();
    expect(flattened.isNone()).toBe(true);
  });

  it("should flatten a nested None and Some", () => {
    const nested: None<Some<number>> = Option.none();
    const flattened = nested.flatten();
    expect(flattened.isNone()).toBe(true);
  });

  it("should fail when no nesting", () => {
    const nested: Some<number> = Option.of(42);
    // @ts-expect-error
    const flattened = nested.flatten();
    expect(flattened).toBe(42);
  });

  it("Should support chaining", () => {
    const nested = Option.some(Option.some(Option.some(42)));
    const firstLevel = nested.flatten();
    const secondLevel = firstLevel.flatten();
    expect(secondLevel.unwrap()).toBe(42);
  });
});
