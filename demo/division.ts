import { Option, Optional } from "../src";

function divide(numerator: number, denominator: number): Optional<number> {
  if (denominator === 0) {
    return Option.none();
  }
  return Option.of(numerator / denominator);
}

const result = divide(10, 2)
  .map((value) => value * 2) // Only executes if result has a value
  .unwrapOr(0); // Provides a default value of 0 if result is empty

console.log(result); // 10

const result2 = divide(10, 0)
  .map((value) => value * 2) // Only executes if result has a value
  .unwrapOr(0); // Provides a default value of 0 if result is empty

console.log(result2); // 0