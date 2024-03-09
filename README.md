[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/ooptional.svg)](https://badge.fury.io/js/ooptional)
## OOptional - TypeScript optional types with seamless async support and 🪄 magical 🪄 type inference

**OOPtional** empowers you to write robust and expressive TypeScript code by elegantly handling optional values within functional or object-oriented design patterns.  This library eliminates the need for cumbersome null and undefined checks, leading to cleaner, more maintainable code. Experience the magic of its seamless type inference!

**Key Features:**

*   **Optional Type:** Introduces a powerful `Optional` type, which encapsulates the presence or absence of a value.
*   **Object-Oriented Integration:** Designed to work effortlessly within your object-oriented code.
*   **Null/Undefined Elimination:** Eradicates the need to perform constant null and undefined checks.
*   **Chaining and Composition:** Supports elegant method chaining for seamless manipulation of optional values.
*   **Sync/Async Support:** Works seamlessly with synchronous and asynchronous operations through Promise-based methods.
*   **JSON.stringify Safe:** Designed to handle serialization via JSON.stringify without causing errors.
*   **Magical Type Inference:** OOptional infers types intelligently, minimizing the need for explicit type annotations.


**Installation**

```sh
npm install ooptional
```

**Basic Usage**

```typescript
import { Optional, Option } from "ooptional";

function divide(numerator: number, denominator: number): Optional<number> {
    if (denominator === 0) {
        return Option.none();
    } else {
        return Option.of(numerator / denominator);
    }
}

const result = divide(10, 2)
    .map(value => value * 2) // Only executes if result has a value
    .unwrapOr(0); // Provides a default value of 0 if result is empty

console.log(result); // Output: 10
```

**Advanced Functionality**

OOptional offers a rich set of methods for working with optional values:

*   **`and(other: Optional<B>)`:** Combines two optionals.
*   **`andThen(mapper: (value: A) => Optional<B>)`:** Applies a function to the value if it exists.
*   **`filter(predicate: (value: A) => boolean)`:** Filters the optional based on a condition.
*   **`flatMap(mapper: (value: A) => Optional<B>)`:** Similar to `map`, but allows mapping to another optional.
*   **`map(mapper: (value: A) => B)`:** Transforms the value if it exists.
*   **`or(other: Optional<B>)`:** Provides a fallback optional if the current one is empty.
*   **`unwrapOr(other: A)`:** Returns the contained value or a default value.
*   **...and many more!** 

**Why OOptional?**

*   **Improved Code Readability:** Makes your code more explicit and easier to understand.
*   **Reduced Errors:** Prevents potential runtime errors caused by `null` or `undefined`.
*   **Elegant Expressiveness:** Provides a fluent API for handling optional values in a functional style.

**Contributions**

OOPtional welcomes contributions! Feel free to open issues, submit pull requests, or provide feedback to help shape the development of this library. 

**License**

This project is licensed under the [MIT License](LICENSE)