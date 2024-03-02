[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/ooptional.svg)](https://badge.fury.io/js/ooptional)
[![Maintainability](https://api.codeclimate.com/v1/badges/867e75f5a4f07a7d9109/maintainability)](https://codeclimate.com/github/becelli/ooptional/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/867e75f5a4f07a7d9109/test_coverage)](https://codeclimate.com/github/becelli/ooptional/test_coverage)

# OOptional - TypeScript Library

**OOptional** is a TypeScript library designed to provide an optional type that seamlessly integrates with Object-Oriented Programming (OOP) principles. It offers a powerful way to handle optional values, eliminating the need for dealing with null or undefined in your code.

## Installation

To install the library, you can use npm:

```sh
npm install ooptional
```

## Usage

### Importing

```ts
import { Optional, Option } from "ooptional";
```

## Practical Example: Validating a User

Consider a scenario where you need to validate a user object. OOptional simplifies this process by allowing you to chain checks for optional properties in a clean and expressive manner.

#### Without Optional Type (😥)

```ts
import { User } from "../repositories/models/user";

export class UserService {
  public verifyCanCreateAccount(user: User): boolean {
    if (user.age < 18) {
      return false;
    }

    if (!user.email) {
      return false;
    }

    if (!user.password) {
      return false;
    }

    return true;
  }
}
```

#### With Optional Type (😋)

```ts
import { Option } from "ooptional";
import { User } from "../repositories/models/user";

export class UserService {
  public verifyCanCreateAccount(user: User): boolean {
    return Option.of(user)
      .filter((user) => user.age >= 18)
      .filter((user) => user.email)
      .filter((user) => user.password)
      .isSome();
  }
}
```

### Creating an Optional

Creating an `Optional` instance is straightforward. You can do it using the `Option` class or directly with `Some` and `None` variants.

```ts
// Using Option.of() to create an Optional
const optional: Optional<string> = Option.of("Hello, world!");

// Using Option.some() to create a Some variant
const some: Some<string> = Option.some("Hello, world!");
const someAsOptional: Optional<string> = Option.some("Hello, world!");

// Using Option.none() to create a None variant
const none: None<string> = Option.none();
const noneAsOptional: Optional<string> = Option.none();
```

### Checking if an Optional Has a Value

You can easily check if an `Optional` has a value using the `isSome()` method. If it has a value, you can access it with the `get()` method.

```ts
const optional: Optional<string> = Option.of("Hello, world!");

if (optional.isSome()) {
  console.log(`The type is inferred as Some<string>, and you can access the value using the get() method: ${optional.value}`);
} else {
  console.log("It is None");
}
```

With OOptional, your code becomes more concise, readable, and free from null and undefined checks, making it a powerful tool for working with optional values in TypeScript.

---

The `Option` class represents a container that can either hold a value (`Some` variant) or be empty (`None` variant). It provides various methods for working with these values in both synchronous and asynchronous contexts.

#### Common Methods

- `isNone()`: Returns `false` if this is the `Some` variant of `Option`.
- `isSome()`: Returns `true` if this is the `Some` variant of `Option`.
- `unwrap(error?: string | Error)`: Returns the value if it exists, otherwise throws the provided error.
- `getOrElse(other: () => T)`: Returns the option value if it is `Some`, otherwise returns the provided value.
- `orElse(other: () => Optional<T>)`: Returns the current `Optional` instance if it is `Some`, otherwise returns the provided value.
- `map<U>(mapper: (value: T) => U)`: Applies a function to the contained value and returns a new `Optional` instance with the result.
- `filter(predicate: (value: T) => boolean)`: Applies a predicate to the contained value and returns an `Optional` instance depending on the predicate result.
- `equals(other: Optional<T>, comparator?: (a: T, b: T) => boolean)`: Checks if the current `Optional` instance is equal to another one.
- `flatMap<U>(mapper: (value: T) => Optional<U>)`: Applies a function to the contained value and returns a new `Optional` instance with the result.
- `fold<U>(ifNone: () => U, ifSome: (value: T) => U)`: Applies a function to the contained value depending on whether it is `Some` or `None`.
- `reduce<U>(reducer: (accumulator: U, value: T) => U, initialValue: U): U`: Applies a reducer function to the contained value and returns the result.
- `match<U>(ifNone: () => U, ifSome: (value: T) => U): U`: Applies a function to the contained value depending on whether it is `Some` or `None`.
- `toNullable(): T | null`: Returns the value if it exists, otherwise returns `null`.
- `toUndefined(): T | undefined`: Returns the value if it exists, otherwise returns `undefined`.

#### Asynchronous Methods (Async Versions)

For each of the common methods listed above, there is an asynchronous version available with `Async` suffix. These methods perform the same operations but can handle promises and asynchronous functions. They are useful for scenarios where operations may involve asynchronous tasks.

- `getOrElseAsync(other: () => Promise<T>)`: Returns the option value if it is `Some`, otherwise returns the provided promise-based value.
- `orElseAsync(other: () => Promise<Optional<T>>)`: Returns the current `Optional` instance if it is `Some`, otherwise returns the provided promise-based value.
- `mapAsync<U>(mapper: (value: T) => Promise<U>)`: Applies an asynchronous function to the contained value and returns a new `Optional` instance with the result.
- `filterAsync(predicate: (value: T) => Promise<boolean>)`: Applies an asynchronous predicate to the contained value and returns an `Optional` instance depending on the predicate result.
- `equalsAsync(other: Optional<T>, comparator?: (a: T, b: T) => Promise<boolean>)`: Checks if the current `Optional` instance is equal to another one in an asynchronous context.
- `flatMapAsync<U>(mapper: (value: T) => Promise<Optional<U>>)`: Applies an asynchronous function to the contained value and returns a new `Optional` instance with the result.
- `foldAsync<U>(ifNone: () => Promise<U>, ifSome: (value: T) => Promise<U>)`: Applies an asynchronous function to the contained value depending on whether it is `Some` or `None`.
- `reduceAsync<U>(reducer: (accumulator: U, value: T) => Promise<U>, initialValue: U): Promise<U>`: Applies an asynchronous reducer function to the contained value and returns the result.
- `matchAsync<U>(ifNone: () => Promise<U>, ifSome: (value: T) => Promise<U>): Promise<U>`: Applies an asynchronous function to the contained value depending on whether it is `Some` or `None`.
  Certainly! Here's an enhanced documentation section for the `Some` and `None` classes:

---

### Some class

The `Some` class is one of the variants of the `Option` type. It represents a scenario where a value exists. This class provides methods to work with the contained value, allowing you to perform various operations on it.

#### Methods

- `get()`: Returns the value contained in this `Some` instance.
- All the methods inherited from the parent `Option` class.

**Usage Example:**

```javascript
const someValue = Option.some(42); // Creating a Some variant
const value = someValue.value; // Accessing the value
console.log(value); // Output: 42
```

### None class

The `None` class is the other variant of the `Option` type. It represents a situation where there is an absence of value. Despite not having a value to work with, this class provides methods inherited from the parent `Option` class. These methods handle the absence of value gracefully, allowing you to perform operations safely.

#### Methods

- All the methods inherited from the parent `Option` class.

**Usage Example:**

```javascript
const noneValue = Option.none<string>(); // Creating a None variant
const result = noneValue.getOrElse(() => "Fallback Value"); // Using the getOrElse method
console.log(result); // Output: "Fallback Value" (since there is no value)
```

# Contributing

## Building

To build the project, run the following command:

```sh
pnpm run build
```

## Testing

To run the tests, use the following command:

```sh
pnpm run test
```

## Linting

To lint the code, run the following command:

```sh
pnpm run lint
```

## License

This project is licensed under the MIT License.
