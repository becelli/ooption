import assert = require("assert");

/* eslint-disable @typescript-eslint/no-unused-vars */
export type Optional<A> = None<A> | Some<A>;

/**
 * An Option is a container that may or may not contain a value.
 * It is designed to fit nicely with Object Oriented Programming.
 */
export abstract class Option<A> {
  protected constructor(protected _value?: A) {}

  public static none<B>(): None<B> {
    return new None();
  }

  public static of<B>(value: null | undefined): None<B>;
  public static of<B>(value: NonNullable<B>): Some<NonNullable<B>>;
  public static of<B>(value: B | undefined | null): Optional<NonNullable<B>>;
  public static of<B>(value: B | undefined | null): Optional<NonNullable<B>> {
    return value == null ? Option.none() : Option.some(value);
  }

  public static ofThrowable<B>(throwable: () => Promise<B>): Promise<Optional<NonNullable<B>>>;
  public static ofThrowable<B>(throwable: () => B): Optional<NonNullable<B>>;
  public static ofThrowable<B>(
    throwable: () => B | Promise<B>,
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

  public static some<B>(value: NonNullable<B>): Some<NonNullable<B>> {
    return new Some(value);
  }

  protected toJSON(): A | undefined {
    return this._value;
  }

  protected toString(): string {
    return this._value == null ? "None" : `Some(${String(this._value)})`;
  }

  protected valueOf(): A | undefined {
    return this._value;
  }

  public abstract andThen<B>(mapper: (value: A) => Promise<Optional<B>>): Promise<Optional<B>>;
  public abstract andThen<B>(mapper: (value: A) => Optional<B>): Optional<B>;
  public abstract and<B>(other: Optional<B>): Optional<B>;
  public abstract equals(other: Optional<A>, comparator?: (a: A, b: A) => Promise<boolean>): Promise<boolean>;
  public abstract equals(other: Optional<A>, comparator?: (a: A, b: A) => boolean): boolean;
  public abstract expect(error: string | Error): A;
  public abstract filter(predicate: (value: A) => Promise<boolean>): Promise<Optional<A>>;
  public abstract filter(predicate: (value: A) => boolean): Optional<A>;
  public abstract flatMap<C, B extends Optional<C>>(mapper: (value: A) => Promise<B>): Promise<B>;
  public abstract flatMap<C, B extends Optional<C>>(mapper: (value: A) => B): B;
  public abstract flatten<B>(this: Optional<Optional<B>>): Optional<B>;
  public abstract inspect(fn: (value: A) => Promise<void>): Promise<this>;
  public abstract inspect(fn: (value: A) => void): this;
  public abstract isNone(): this is None<A>;
  public abstract isSomeAnd(predicate: (value: A) => Promise<boolean>): Promise<boolean>;
  public abstract isSomeAnd(predicate: (value: A) => boolean): boolean;
  public abstract isSome(): this is Some<NonNullable<A>>;
  public abstract mapOrElse<B>(orElse: () => Promise<B>, mapper: (value: A) => Promise<B>): Promise<B>;
  public abstract mapOrElse<B>(orElse: () => B, mapper: (value: A) => B): B;
  public abstract mapOr<B>(value: B, mapper: (value: A) => Promise<B>): Promise<B>;
  public abstract mapOr<B>(value: B, mapper: (value: A) => B): B;
  public abstract map<B>(mapper: (value: A) => Promise<B>): Promise<Optional<B>>;
  public abstract map<B>(mapper: (value: A) => B): Optional<B>;
  public abstract match<B>(ifSome: (value: A) => Promise<B>, ifNone: () => Promise<B>): Promise<B>;
  public abstract match<B>(ifSome: (value: A) => B, ifNone: () => B): B;
  public abstract or<B>(other: Optional<B>): Optional<A | B>;
  public abstract orElse(mapper: () => Promise<Optional<A>>): Promise<Optional<A>>;
  public abstract orElse(mapper: () => Optional<A>): Optional<A>;
  public abstract unwrapOrElse(other: () => Promise<A>): Promise<A>;
  public abstract unwrapOrElse(other: () => A): A;
  public abstract unwrapOrNull(): A | null;
  public abstract unwrapOrUndefined(): A | undefined;
  public abstract unwrapOr(other: A): A;
  public abstract unwrap(): A;
  public abstract unzip<B, C>(this: Optional<[B, C]>): [Optional<B>, Optional<C>];
  public abstract xor<B>(other: Optional<B>): Optional<A | B>;
  public abstract zipWith<B, V>(other: Optional<B>, zipper: (a: A, b: B) => Promise<V>): Promise<Optional<V>>;
  public abstract zipWith<B, V>(other: Optional<B>, zipper: (a: A, b: B) => V): Optional<V>;
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
    _comparator?: ((a: A, b: A) => boolean) | ((a: A, b: A) => Promise<boolean>),
  ): boolean | Promise<boolean> {
    if (other.isNone()) {
      return true;
    }

    return false;
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

  public isSome(): this is Some<NonNullable<A>> {
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
    _zipper: (a: A, b: B) => V | Promise<V>,
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
    comparator: ((a: A, b: A) => boolean) | ((a: A, b: A) => Promise<boolean>) = (a, b) => a === b,
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
    assert(this._value != null, "Value is null or undefined");
    return this._value;
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
