/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
export type Optional<A> = None<A> | Some<A>;

export abstract class Option<A> {
  protected constructor(protected _value?: A) {}

  /**
   * Creates a `None` instance, representing the absence of a value.
   *
   * @return {None<B>} A new `None` instance.
   */
  public static none<B>(): None<B> {
    return new None();
  }

  /**
   * Creates an Optional based on the provided value:
   * - If the value is `null` or undefined, returns `None`.
   * - If the value is not `null` or undefined, returns `Some` with the value.
   *
   * @static
   * @template B The type of the value to create an Optional with.
   * @param {B | undefined | null} value The value to create an Optional with.
   * @returns {Optional<NonNullable<B>>} An Optional wrapping the provided value.
   */
  public static of<B>(value: null | undefined): None<B>;
  public static of<B>(value: NonNullable<B>): Some<NonNullable<B>>;
  public static of<B>(value: B | undefined | null): Optional<NonNullable<B>>;
  public static of<B>(value: B | undefined | null): Optional<NonNullable<B>> {
    return value == null ? Option.none() : Option.some(value);
  }

  /**
   * Creates an Optional based on the result of the throwable function:
   * - If the function returns a non-nullish value without throwing, returns `Some` with the value.
   * - If an error occurs or the result is nullish, returns `None`.
   *
   * @static
   * @template B The type of the result of the throwable function.
   * @param {() => B | Promise<B>} throwable A function that potentially throws.
   * @returns {Optional<NonNullable<B>> | Promise<Optional<NonNullable<B>>>} An Optional wrapping the result.
   */

  public static ofThrowable<B>(throwable: () => Promise<B>): Promise<Optional<NonNullable<B>>>;
  public static ofThrowable<B>(throwable: () => B): Optional<NonNullable<B>>;
  public static ofThrowable<B>(
    throwable: () => B | Promise<B>
  ): Optional<NonNullable<B>> | Promise<Optional<NonNullable<B>>> {
    try {
      const result = throwable();
      if (result instanceof Promise) {
        return result.then((value) => Option.of(value)).catch(() => Option.none());
      }

      return Option.of(result);
    } catch {
      return Option.none();
    }
  }

  /**
   * Creates a `Some` instance containing the non-nullable value.
   *
   * @param {NonNullable<B>} value The non-nullable value to wrap.
   * @return {Some<NonNullable<B>>} A `Some` instance containing the value.
   */
  public static some<B>(value: NonNullable<B>): Some<NonNullable<B>> {
    return new Some(value);
  }

  /**
   * Converts the Optional value to JSON.
   *
   * @protected
   * @returns {A | undefined} The value contained within the Optional, or undefined if empty.
   */
  protected toJSON(): A | undefined {
    return this._value;
  }

  /**
   * Converts the Optional to a string representation.
   *
   * @protected
   * @returns {string} A string representation of the Optional.
   */
  protected toString(): string {
    return this._value == null ? "None" : `Some(${String(this._value)})`;
  }

  /**
   * Chains a mapper function to the current Optional, transforming the value if present.
   * If the mapper returns a non-nullish value, it wraps it in an Optional.
   *
   * @abstract
   * @template B The type of the resulting value after transformation.
   * @param {(value: A) => B | Promise<Optional<B>>} mapper A function that transforms the value.
   * @return {Promise<Optional<B>> | Optional<B>} An Optional wrapping the transformed value if present.
   */
  public abstract andThen<B>(mapper: (value: A) => Promise<Optional<B>>): Promise<Optional<B>>;
  public abstract andThen<B>(mapper: (value: A) => Optional<B>): Optional<B>;
  /**
   * Returns this Optional if it has a value, otherwise returns the provided Optional.
   *
   * @abstract
   * @template B The type of the value in the provided Optional.
   * @param {Optional<B>} other The Optional to be returned if this Optional is empty.
   * @return {Optional<B>} This Optional if it has a value, otherwise the provided Optional.
   */
  public abstract and<B>(other: Optional<B>): Optional<B>;

  /**
   * Compares this Optional with another Optional for equality, optionally using a custom comparator function.
   *
   * @abstract
   * @param {Optional<A>} other The Optional to compare with.
   * @param {(a: A, b: A) => Promise<boolean> | boolean} [comparator] A function to determine equality between values.
   * @return {Promise<boolean> | boolean} A Promise resolving to true if both Optionals are equal, false otherwise.
   */
  public abstract equals(other: Optional<A>, comparator?: (a: A, b: A) => Promise<boolean>): Promise<boolean>;
  public abstract equals(other: Optional<A>, comparator?: (a: A, b: A) => boolean): boolean;
  /**
   * Retrieves the value contained within the Optional, or throws an error if the Optional is empty.
   *
   * @abstract
   * @param {string | Error} error The error message or Error object to throw if the Optional is empty.
   * @returns {A} The value contained within the Optional.
   * @throws {string | Error} Throws the specified error message or Error object if the Optional is empty.
   */

  public abstract expect(error: string | Error): A;
  /**
   * Filters the value of the Optional based on the provided predicate function.
   *
   * @abstract
   * @param {(value: A) => Promise<boolean> | boolean} predicate A function determining whether to keep the value.
   * @returns {Promise<Optional<A>> | Optional<A>} A new Optional with the filtered value if the predicate is satisfied.
   */
  public abstract filter(predicate: (value: A) => Promise<boolean>): Promise<Optional<A>>;
  public abstract filter(predicate: (value: A) => boolean): Optional<A>;
  /**
   * Applies a function to the value contained within the Optional, returning a new Optional.
   * The provided function must return an Optional.
   *
   * @abstract
   * @template C The type of the value contained within the resulting Optional.
   * @template B An Optional containing a value of type C.
   * @param {(value: A) => Promise<B> | B} mapper A function that transforms the value into another Optional.
   * @returns {Promise<B> | B} A new Optional resulting from applying the function to the value.
   */
  public abstract flatMap<C, B extends Optional<C>>(mapper: (value: A) => Promise<B>): Promise<B>;
  public abstract flatMap<C, B extends Optional<C>>(mapper: (value: A) => B): B;
  /**
   * Flattens a nested Optional structure, returning an Optional with the innermost value.
   *
   * @abstract
   * @template B The type of the value contained within the nested Optional.
   * @param {Optional<Optional<B>>} this The nested Optional structure.
   * @returns {Optional<B>} An Optional containing the innermost value.
   */

  public abstract flatten<B>(this: Optional<Optional<B>>): Optional<B>;
  /**
   * Performs a side effect with the value contained within the Optional, returning the Optional itself.
   *
   * @abstract
   * @param {(value: A) => Promise<void> | void} fn A function to perform side effects with the value.
   * @returns {Promise<this> | this} The Optional itself after performing the side effect.
   */
  public abstract inspect(fn: (value: A) => Promise<void>): Promise<this>;
  public abstract inspect(fn: (value: A) => void): this;
  /**
   * Checks if the Optional is empty (None).
   *
   * @abstract
   * @returns {this is None<A>} True if the Optional is empty (None), false otherwise.
   */

  public abstract isNone(): this is None<A>;
  /**
   * Checks if the Optional contains a value and the value satisfies the provided predicate function.
   *
   * @abstract
   * @param {(value: A) => Promise<boolean> | boolean} predicate A function determining whether the value satisfies a condition.
   * @returns {Promise<boolean> | boolean} True if the Optional contains a value and it satisfies the predicate, false otherwise.
   */

  public abstract isSomeAnd(predicate: (value: A) => Promise<boolean>): Promise<boolean>;
  public abstract isSomeAnd(predicate: (value: A) => boolean): boolean;
  /**
   * Checks if the Optional contains a value (Some).
   *
   * @abstract
   * @returns {this is Some<NonNullable<A>>} True if the Optional contains a value (Some), false otherwise.
   */

  public abstract isSome(): this is Some<NonNullable<A>>;

  /**
   * Maps the value contained within the Optional using the provided mapper function,
   * or applies the orElse function if the Optional is empty.
   *
   * @abstract
   * @template B The type of the resulting value after transformation.
   * @param {() => Promise<B> | B} orElse A function returning a default value if the Optional is empty.
   * @param {(value: A) => Promise<B> | B} mapper A function that transforms the value.
   * @returns {Promise<B> | B} The transformed value or the result of the orElse function.
   */
  public abstract mapOrElse<B>(orElse: () => Promise<B>, mapper: (value: A) => Promise<B>): Promise<B>;
  public abstract mapOrElse<B>(orElse: () => B, mapper: (value: A) => B): B;

  /**
   * Maps the value contained within the Optional using the provided mapper function,
   * or returns a default value if the Optional is empty.
   *
   * @abstract
   * @template B The type of the resulting value after transformation.
   * @param {B} value The default value to return if the Optional is empty.
   * @param {(value: A) => Promise<B> | B} mapper A function that transforms the value.
   * @returns {Promise<B> | B} The transformed value or the default value.
   */

  public abstract mapOr<B>(value: B, mapper: (value: A) => Promise<B>): Promise<B>;
  public abstract mapOr<B>(value: B, mapper: (value: A) => B): B;

  /**
   * Maps the value contained within the Optional using the provided mapper function.
   *
   * @abstract
   * @template B The type of the resulting value after transformation.
   * @param {(value: A) => Promise<B> | B} mapper A function that transforms the value.
   * @returns {Promise<Optional<B>> | Optional<B>} An Optional containing the transformed value.
   */
  public abstract map<B>(mapper: (value: A) => Promise<B>): Promise<Optional<B>>;
  public abstract map<B>(mapper: (value: A) => B): Optional<B>;

  /**
   * Matches the contents of the Optional with the provided functions, executing one depending on whether the Optional is `Some` or `None`.
   *
   * @abstract
   * @template B The type of the resulting value after transformation.
   * @param {(value: A) => Promise<B> | B} ifSome A function to execute if the Optional is Some.
   * @param {() => Promise<B> | B} ifNone A function to execute if the Optional is `None`.
   * @returns {Promise<B> | B} The result of executing the matched function.
   */
  public abstract match<B>(ifSome: (value: A) => Promise<B>, ifNone: () => Promise<B>): Promise<B>;
  public abstract match<B>(ifSome: (value: A) => B, ifNone: () => B): B;

  /**
   * Returns this Optional if it has a value, otherwise returns the provided Optional.
   *
   * @abstract
   * @template B The type of the value in the provided Optional.
   * @param {Optional<B>} other The Optional to be returned if this Optional is empty.
   * @returns {Optional<A | B>} This Optional if it has a value, otherwise the provided Optional.
   */
  public abstract or<B>(other: Optional<B>): Optional<A | B>;

  /**
   * Returns this Optional if it has a value, otherwise executes the provided function to generate an Optional.
   *
   * @abstract
   * @param {() => Promise<Optional<A>> | Optional<A>} mapper A function to generate an Optional if this Optional is empty.
   * @returns {Promise<Optional<A>> | Optional<A>} This Optional if it has a value, otherwise the Optional generated by the provided function.
   */
  public abstract orElse(mapper: () => Promise<Optional<A>>): Promise<Optional<A>>;
  public abstract orElse(mapper: () => Optional<A>): Optional<A>;

  /**
   * Unwraps the value contained within the Optional, or returns a default value if the Optional is empty.
   *
   * @abstract
   * @param {() => Promise<A> | A} other A function returning a default value if the Optional is empty.
   * @returns {Promise<A> | A} The unwrapped value or the result of the provided function.
   */

  public abstract unwrapOrElse(other: () => Promise<A>): Promise<A>;
  public abstract unwrapOrElse(other: () => A): A;

  /**
   * Unwraps the value contained within the Optional, returning it or `null` if the Optional is empty.
   *
   * @abstract
   * @returns {A | null} The unwrapped value or `null` if the Optional is empty.
   */
  public abstract unwrapOrNull(): A | null;

  /**
   * Unwraps the value contained within the Optional, returning it or undefined if the Optional is empty.
   *
   * @abstract
   * @returns {A | undefined} The unwrapped value or undefined if the Optional is empty.
   */
  public abstract unwrapOrUndefined(): A | undefined;
  /**
   * Unwraps the value contained within the Optional, returning it or a default value if the Optional is empty.
   *
   * @abstract
   * @param {A} other The default value to return if the Optional is empty.
   * @returns {A} The unwrapped value or the default value.
   */
  public abstract unwrapOr(other: A): A;
  /**
   * Unwraps the value contained within the Optional, throwing an error if the Optional is empty.
   *
   * @abstract
   * @returns {A} The unwrapped value.
   * @throws {Error} Throws an error if the Optional is empty.
   */
  public abstract unwrap(): A;

  /**
   * Unzips a tuple contained within the Optional, returning Optionals for each element of the tuple.
   *
   * @abstract
   * @template B The type of the first element of the tuple.
   * @template C The type of the second element of the tuple.
   * @param {Optional<[B, C]>} this The Optional containing the tuple to unzip.
   * @returns {[Optional<B>, Optional<C>]} Optionals for each element of the tuple.
   */
  public abstract unzip<B, C>(this: Optional<[B, C]>): [Optional<B>, Optional<C>];

  /**
   * Returns this Optional if it has a value and the other Optional is empty, or returns the other Optional if it has a value and this Optional is empty.
   *
   * @abstract
   * @template B The type of the value in the provided Optional.
   * @param {Optional<B>} other The Optional to be XORed with this Optional.
   * @returns {Optional<A | B>} This Optional if it has a value and the other is empty, or the other Optional if it has a value and this is empty.
   */
  public abstract xor<B>(other: Optional<B>): Optional<A | B>;

  /**
   * Combines the value of this Optional with the value of another Optional using a zipper function.
   *
   * @abstract
   * @template B The type of the value in the other Optional.
   * @template V The type of the resulting value after combination.
   * @param {Optional<B>} other The other Optional to combine with.
   * @param {(a: A, b: B) => Promise<V> | V} zipper A function to combine the values of the Optionals.
   * @returns {Promise<Optional<V>> | Optional<V>} An Optional containing the result of the combination.
   */
  public abstract zipWith<B, V>(other: Optional<B>, zipper: (a: A, b: B) => Promise<V>): Promise<Optional<V>>;
  public abstract zipWith<B, V>(other: Optional<B>, zipper: (a: A, b: B) => V): Optional<V>;

  /**
   * Combines the value of this Optional with the value of another Optional into a tuple.
   *
   * @abstract
   * @template B The type of the value in the other Optional.
   * @param {Optional<B>} other The other Optional to combine with.
   * @returns {Optional<[A, B]>} An Optional containing a tuple of the values if both Optionals have values, otherwise `None`.
   */
  public abstract zip<B>(other: Optional<B>): Optional<[A, B]>;
}

export class None<A> extends Option<A> {
  public and<B>(_other: Optional<B>): None<B> {
    return this as unknown as None<B>;
  }

  public andThen<B>(mapper: (value: A) => Promise<Optional<B>>): Promise<None<B>>;
  public andThen<B>(mapper: (value: A) => Optional<B>): None<B>;
  public andThen<B>(_mapper: (value: A) => Optional<B> | Promise<Optional<B>>): Optional<B> | Promise<Optional<B>> {
    return this as unknown as None<B>;
  }

  public equals(other: Optional<A>, comparator?: (a: A, b: A) => Promise<boolean>): Promise<boolean>;
  public equals(other: Optional<A>, comparator?: (a: A, b: A) => boolean): boolean;
  public equals(
    other: Optional<A>,
    _comparator?: ((a: A, b: A) => boolean) | ((a: A, b: A) => Promise<boolean>)
  ): boolean | Promise<boolean> {
    return other.isNone();
  }

  public expect(error: string | Error): A {
    if (typeof error === "string") {
      throw new Error(error);
    }

    throw error;
  }

  public filter(predicate: (value: A) => Promise<boolean>): Promise<None<A>>;
  public filter(predicate: (value: A) => boolean): None<A>;
  public filter(_predicate: (value: A) => boolean | Promise<boolean>): Optional<A> | Promise<Optional<A>> {
    return this as unknown as None<A>;
  }

  public flatMap<B, C extends Optional<B>, D extends None<B>>(mapper: (value: A) => Promise<C>): Promise<D>;
  public flatMap<B, C extends Optional<B>, D extends None<B>>(_mapper: (value: A) => C): D;
  public flatMap<B, C extends Optional<B>>(_mapper: (value: A) => C | Promise<C>): C | Promise<C> {
    return this as unknown as C;
  }

  public flatten<B>(this: None<Optional<B>>): None<B>;
  public flatten<B>(this: Optional<Optional<B>>): Optional<B>;
  public flatten<B>(this: None<Optional<B>>): None<B> {
    return this as unknown as None<B>;
  }

  public match<B>(ifSome: (value: A) => Promise<B>, ifNone: () => Promise<B>): Promise<B>;
  public match<B>(ifSome: (value: A) => B, ifNone: () => B): B;
  public match<B>(_ifSome: (value: A) => B, ifNone: () => B): B {
    return ifNone();
  }

  public isNone(): this is None<A> {
    return true;
  }

  public isSome(): this is never {
    return false;
  }

  public isSomeAnd(predicate: (value: A) => Promise<boolean>): Promise<boolean>;
  public isSomeAnd(predicate: (value: A) => boolean): boolean;
  public isSomeAnd(_predicate: (value: A) => boolean | Promise<boolean>): boolean | Promise<boolean> {
    return false;
  }

  public inspect(fn: (value: A) => Promise<void>): Promise<this>;
  public inspect(fn: (value: A) => void): this;
  public inspect(_fn: (value: A) => void | Promise<void>): this | Promise<this> {
    return this;
  }

  public map<B>(mapper: (value: A) => Promise<B>): Promise<None<B>>;
  public map<B>(mapper: (value: A) => Promise<B>): Promise<Optional<B>>;
  public map<B>(mapper: (value: A) => B): None<B>;
  public map<B>(mapper: (value: A) => B): Optional<B>;
  public map<B>(_mapper: (value: A) => B | Promise<B>): Optional<B> | Promise<Optional<B>> {
    return this as unknown as None<B>;
  }

  public mapOr<B>(value: B, mapper: (value: A) => Promise<B>): Promise<B>;
  public mapOr<B>(value: B, mapper: (value: A) => B): B;
  public mapOr<B>(value: B, _mapper: (value: A) => B | Promise<B>): B | Promise<B> {
    return value;
  }

  public mapOrElse<B>(orElse: () => Promise<B>, mapper: (value: A) => Promise<B>): Promise<B>;
  public mapOrElse<B>(orElse: () => B, mapper: (value: A) => B): B;
  public mapOrElse<B>(orElse: () => B | Promise<B>, _mapper: (value: A) => B | Promise<B>): B | Promise<B> {
    return orElse();
  }

  public or<B>(other: Optional<B>): Optional<A | B> {
    return other;
  }

  public orElse(mapper: () => Promise<Optional<A>>): Promise<Optional<A>>;
  public orElse(mapper: () => Optional<A>): Optional<A>;
  public orElse(mapper: () => Optional<A> | Promise<Optional<A>>): Optional<A> | Promise<Optional<A>> {
    return mapper();
  }

  public unwrap(error: string | Error = "No value in Option"): never {
    if (typeof error === "string") {
      throw new Error(error);
    }

    throw error;
  }

  public unwrapOr(other: A): A {
    return other;
  }

  public unwrapOrUndefined(): A | undefined {
    return undefined;
  }

  public unwrapOrNull(): A | null {
    return null;
  }

  public unzip<B, C>(this: None<[B, C]>): [None<B>, None<C>];
  public unzip<B, C>(this: Optional<[B, C]>): [Optional<B>, Optional<C>];
  public unzip<B, C>(this: Optional<[B, C]>): [Optional<B>, Optional<C>] {
    return [Option.none(), Option.none()];
  }

  public unwrapOrElse(other: () => Promise<A>): Promise<A>;
  public unwrapOrElse(other: () => A): A;
  public unwrapOrElse(other: () => A | Promise<A>): A | Promise<A> {
    return other();
  }

  public xor<B>(other: Optional<B>): Optional<A | B> {
    if (other.isSome()) {
      return other;
    }

    return this;
  }

  public zip<B>(_other: Optional<B>): None<[A, B]>;
  public zip<B>(_other: Optional<B>): Optional<[A, B]> {
    return this as unknown as None<[A, B]>;
  }

  public zipWith<B, V>(other: Optional<B>, zipper: (a: A, b: B) => Promise<V>): Promise<Optional<V>>;
  public zipWith<B, V>(other: Optional<B>, zipper: (a: A, b: B) => V): Optional<V>;
  public zipWith<B, V>(
    _other: Optional<B>,
    _zipper: (a: A, b: B) => V | Promise<V>
  ): Optional<V> | Promise<Optional<V>> {
    return this as unknown as None<V>;
  }
}

export class Some<A> extends Option<A> {
  public and<B>(other: None<B>): None<B>;
  public and<B>(other: Some<B>): Some<B>;
  public and<B>(other: Optional<B>): Optional<B> {
    return other;
  }

  public andThen<B>(mapper: (value: A) => Promise<Some<B>>): Promise<Some<B>>;
  public andThen<B>(mapper: (value: A) => Promise<None<B>>): Promise<None<B>>;
  public andThen<B>(mapper: (value: A) => Promise<Optional<B>>): Promise<Optional<B>>;
  public andThen<B>(mapper: (value: A) => Some<B>): Some<B>;
  public andThen<B>(mapper: (value: A) => None<B>): None<B>;
  public andThen<B>(mapper: (value: A) => Optional<B>): Optional<B>;
  public andThen<B>(mapper: (value: A) => Optional<B> | Promise<Optional<B>>): Optional<B> | Promise<Optional<B>> {
    return mapper(this.unwrap());
  }

  public equals(other: Optional<A>, comparator?: ((a: A, b: A) => Promise<boolean>) | undefined): Promise<boolean>;
  public equals(other: Optional<A>, comparator?: ((a: A, b: A) => boolean) | undefined): boolean;
  public equals(
    other: Optional<A>,
    comparator: ((a: A, b: A) => boolean) | ((a: A, b: A) => Promise<boolean>) = (a, b) => a === b
  ): boolean | Promise<boolean> {
    if (other.isSome()) {
      return comparator(this.unwrap(), other.unwrap());
    }

    return false;
  }

  public expect(_error: string | Error): A {
    return this.unwrap();
  }

  public filter(predicate: (value: A) => Promise<true>): Promise<Some<A>>;
  public filter(predicate: (value: A) => Promise<false>): Promise<None<A>>;
  public filter(predicate: (value: A) => Promise<boolean>): Promise<Optional<A>>;
  public filter(predicate: (value: A) => false): None<A>;
  public filter(predicate: (value: A) => true): Some<A>;
  public filter(predicate: (value: A) => boolean): Optional<A>;
  public filter(predicate: (value: A) => boolean | Promise<boolean>): Optional<A> | Promise<Optional<A>> {
    const result = predicate(this.unwrap());
    if (result instanceof Promise) {
      return result.then((value) => (value ? this : Option.none()));
    }

    return result ? this : Option.none();
  }

  public flatMap<B, C extends None<B>>(mapper: (value: A) => Promise<C>): Promise<C>;
  public flatMap<B, C extends Some<B>>(mapper: (value: A) => Promise<C>): Promise<C>;
  public flatMap<B, C extends Some<B>>(mapper: (value: A) => C): C;
  public flatMap<B, C extends None<B>>(mapper: (value: A) => C): C;
  public flatMap<B, C extends Optional<B>>(mapper: (value: A) => C | Promise<C>): C | Promise<C> {
    return mapper(this.unwrap());
  }

  public flatten<B>(this: Some<Some<B>>): Some<B>;
  public flatten<B>(this: Some<None<B>>): None<B>;
  public flatten<B>(this: Optional<Optional<B>>): Optional<B>;
  public flatten<B>(this: Some<Optional<B>>): Optional<B> {
    return this.unwrap();
  }

  public match<B>(ifSome: (value: A) => Promise<B>, ifNone: () => Promise<B>): Promise<B>;
  public match<B>(ifSome: (value: A) => B, ifNone: () => B): B;
  public match<B>(ifSome: (value: A) => B | Promise<B>, _ifNone: () => B | Promise<B>): B | Promise<B> {
    return ifSome(this.unwrap());
  }

  public isNone(): this is never {
    return false;
  }

  public isSome(): this is Some<NonNullable<A>> {
    return true;
  }

  public isSomeAnd(predicate: (value: A) => Promise<boolean>): Promise<boolean>;
  public isSomeAnd(predicate: (value: A) => boolean): boolean;
  public isSomeAnd(predicate: (value: A) => boolean | Promise<boolean>): boolean | Promise<boolean> {
    return predicate(this.unwrap());
  }

  public inspect(fn: (value: A) => Promise<void>): Promise<this>;
  public inspect(fn: (value: A) => void): this;
  public inspect(fn: (value: A) => void | Promise<void>): this | Promise<this> {
    const result = fn(this.unwrap());
    if (result instanceof Promise) {
      return result.then(() => this);
    }

    return this;
  }

  public map<B>(mapper: (value: A) => Promise<NonNullable<B>>): Promise<Some<NonNullable<B>>>;
  public map<B>(mapper: (value: A) => Promise<B>): Promise<Optional<B>>;
  public map<B>(mapper: (value: A) => NonNullable<B>): Some<NonNullable<B>>;
  public map<B>(mapper: (value: A) => B): Optional<B>;
  public map<B>(mapper: (value: A) => B | Promise<B>): Optional<B> | Promise<Optional<B>> {
    const result = mapper(this.unwrap());
    if (result instanceof Promise) {
      return result.then((value) => Option.of(value));
    }

    return Option.of(result);
  }

  public mapOr<B>(value: B, mapper: (value: A) => Promise<B>): Promise<B>;
  public mapOr<B>(value: B, mapper: (value: A) => B): B;
  public mapOr<B>(_value: B, mapper: (value: A) => B | Promise<B>): B | Promise<B> {
    return mapper(this.unwrap());
  }

  public mapOrElse<B>(orElse: () => Promise<B>, mapper: (value: A) => Promise<B>): Promise<B>;
  public mapOrElse<B>(orElse: () => B, mapper: (value: A) => B): B;
  public mapOrElse<B>(_orElse: () => B | Promise<B>, mapper: (value: A) => B | Promise<B>): B | Promise<B> {
    return mapper(this.unwrap());
  }

  public or<B>(_other: Optional<B>): Optional<A | B> {
    return this;
  }

  public orElse(mapper: () => Promise<Optional<A>>): Promise<Optional<A>>;
  public orElse(mapper: () => Optional<A>): Optional<A>;
  public orElse(_mapper: () => Optional<A> | Promise<Optional<A>>): Optional<A> | Promise<Optional<A>> {
    return this;
  }

  public unwrap(): A {
    return this._value as A;
  }

  public unwrapOr(_other: A): A {
    return this.unwrap();
  }

  public unwrapOrElse(other: () => Promise<A>): Promise<A>;
  public unwrapOrElse(other: () => A): A;
  public unwrapOrElse(_other: () => A | Promise<A>): A | Promise<A> {
    return this.unwrap();
  }

  public unwrapOrNull(): A | null {
    return this.unwrap();
  }

  public unwrapOrUndefined(): A | undefined {
    return this.unwrap();
  }

  public unzip<B, C>(this: Some<[B, C]>): [Some<B>, Some<C>];
  public unzip<B, C>(this: Optional<[B, C]>): [Optional<B>, Optional<C>];
  public unzip<B, C>(this: Optional<[B, C]>): [Optional<B>, Optional<C>] {
    const value = this.unwrap();
    return [Option.of(value[0]), Option.of(value[1])];
  }

  public xor<B>(other: Optional<B>): Optional<A | B> {
    if (other.isSome()) {
      return Option.none();
    }

    return this;
  }

  public zip<B>(other: None<B>): None<[A, B]>;
  public zip<B>(other: Some<B>): Some<[A, B]>;
  public zip<B>(other: Optional<B>): Optional<[A, B]> {
    if (other.isSome()) {
      return Option.some([this.unwrap(), other.unwrap()]);
    }

    return Option.none();
  }

  public zipWith<B, V>(other: Optional<B>, zipper: (a: A, b: B) => Promise<V>): Promise<Optional<V>>;
  public zipWith<B, V>(other: Optional<B>, zipper: (a: A, b: B) => V): Optional<V>;
  public zipWith<B, V>(other: Optional<B>, zipper: (a: A, b: B) => V | Promise<V>): Optional<V> | Promise<Optional<V>> {
    if (other.isSome()) {
      const result = zipper(this.unwrap(), other.unwrap());
      if (result instanceof Promise) {
        return result.then((value) => Option.of(value));
      }

      return Option.of(result);
    }

    return Option.none();
  }
}
