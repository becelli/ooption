export type Optional<T> = Some<T> | None<T>;

/**
 * An Option is a container that may or may not contain a value.
 * It is designed to fit nicely with Object Oriented Programming.
 */
export abstract class Option<T> {
  protected constructor(protected value?: T) {}

  public static none<U>(): None<U> {
    return new None();
  }

  public static of<U>(value: U | undefined | null): Optional<NonNullable<U>> {
    return value == null ? Option.none() : Option.some(value);
  }

  public static ofThrowable<U>(throwable: () => Promise<U>): Promise<Optional<NonNullable<U>>>;
  public static ofThrowable<U>(throwable: () => U): Optional<NonNullable<U>>;
  public static ofThrowable<U>(
    throwable: () => U | Promise<U>
  ): Optional<NonNullable<U>> | Promise<Optional<NonNullable<U>>> {
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

  public static some<U>(value: NonNullable<U>): Some<NonNullable<U>> {
    return new Some(value);
  }

  public abstract and<U>(other: Optional<U>): Optional<U>;
  public abstract andThen<U>(mapper: (value: T) => Promise<Optional<U>>): Promise<Optional<U>>;
  public abstract andThen<U>(mapper: (value: T) => Optional<U>): Optional<U>;
  public abstract equals(other: Optional<T>, comparator?: (a: T, b: T) => Promise<boolean>): Promise<boolean>;
  public abstract equals(other: Optional<T>, comparator?: (a: T, b: T) => boolean): boolean;
  public abstract expect(error: string | Error): T;
  public abstract filter(predicate: (value: T) => Promise<boolean>): Promise<Optional<T>>;
  public abstract filter(predicate: (value: T) => boolean): Optional<T>;
  public abstract flatMap<P, U extends Optional<P>>(mapper: (value: T) => Promise<U>): Promise<U>;
  public abstract flatMap<P, U extends Optional<P>>(mapper: (value: T) => U): U;
  public abstract flatten<U>(this: Optional<Optional<U>>): Optional<U>;
  public abstract fold<U>(ifSome: (value: T) => Promise<U>, ifNone: () => Promise<U>): Promise<U>;
  public abstract fold<U>(ifSome: (value: T) => U, ifNone: () => U): U;
  public abstract isNone(): this is None<T>;
  public abstract isSome(): this is Some<NonNullable<T>>;
  public abstract isSomeAnd(predicate: (value: T) => Promise<boolean>): Promise<boolean>;
  public abstract isSomeAnd(predicate: (value: T) => boolean): boolean;
  public abstract inspect(fn: (value: T) => Promise<void>): Promise<this>;
  public abstract inspect(fn: (value: T) => void): this;
  public abstract map<U>(mapper: (value: T) => Promise<U>): Promise<Optional<U>>;
  public abstract map<U>(mapper: (value: T) => U): Optional<U>;
  public abstract mapOr<U>(value: U, mapper: (value: T) => Promise<U>): Promise<U>;
  public abstract mapOr<U>(value: U, mapper: (value: T) => U): U;
  public abstract mapOrElse<U>(orElse: () => Promise<U>, mapper: (value: T) => Promise<U>): Promise<U>;
  public abstract mapOrElse<U>(orElse: () => U, mapper: (value: T) => U): U;
  public abstract or<U>(other: Optional<U>): Optional<T | U>;
  public abstract orElse(mapper: () => Promise<Optional<T>>): Promise<Optional<T>>;
  public abstract orElse(mapper: () => Optional<T>): Optional<T>;
  public abstract reduce<U>(initialValue: U, reducer: (acc: U, value: T) => Promise<U>): Promise<U>;
  public abstract reduce<U>(initialValue: U, reducer: (acc: U, value: T) => U): U;
  public abstract unwrap(): T;
  public abstract unwrapOr(other: T): T;
  public abstract unwrapOrElse(other: () => Promise<T>): Promise<T>;
  public abstract unwrapOrElse(other: () => T): T;
  public abstract unwrapOrUndefined(): T | undefined;
  public abstract unwrapOrNull(): T | null;
  public abstract unzip<A, B>(this: Optional<[A, B]>): [Optional<A>, Optional<B>];
  public abstract xor<U>(other: Optional<U>): Optional<T | U>;
  public abstract zip<U>(other: Optional<U>): Optional<[T, U]>;
  public abstract zipWith<U, V>(other: Optional<U>, zipper: (a: T, b: U) => Promise<V>): Promise<Optional<V>>;
  public abstract zipWith<U, V>(other: Optional<U>, zipper: (a: T, b: U) => V): Optional<V>;

  protected toJSON(): T | undefined {
    return this.value;
  }

  protected toString(): string {
    return this.value == null ? "None" : `Some(${this.value})`;
  }

  protected valueOf(): T | undefined {
    return this.value;
  }

  protected [Symbol.hasInstance](instance: any): boolean {
    return instance instanceof Option;
  }

  protected [Symbol.iterator](): IterableIterator<T> {
    return (function* (value: T) {
      yield value;
    })(this.value!);
  }
}

export class None<T> extends Option<T> {
  public and<U>(_other: Optional<U>): Optional<U> {
    return this as unknown as None<U>;
  }

  public andThen<U>(mapper: (value: T) => Promise<None<U>>): Promise<None<U>>;
  public andThen<U>(mapper: (value: T) => None<U>): None<U>;
  public andThen<U>(_mapper: (value: T) => Optional<U> | Promise<Optional<U>>): Optional<U> | Promise<Optional<U>> {
    return this as unknown as None<U>;
  }

  public equals(other: Optional<T>, comparator?: (a: T, b: T) => Promise<boolean>): Promise<boolean>;
  public equals(other: Optional<T>, comparator?: (a: T, b: T) => boolean): boolean;
  public equals(
    other: Optional<T>,
    _comparator: ((a: T, b: T) => boolean) | ((a: T, b: T) => Promise<boolean>) = (a, b) => a === b
  ): boolean | Promise<boolean> {
    if (other.isNone()) {
      return true;
    }

    return false;
  }

  public expect(error: string | Error): T {
    if (typeof error === "string") {
      throw new Error(error);
    }

    throw error;
  }

  public filter(predicate: (value: T) => Promise<boolean>): Promise<None<T>>;
  public filter(predicate: (value: T) => boolean): None<T>;
  public filter(_predicate: (value: T) => boolean | Promise<boolean>): Optional<T> | Promise<Optional<T>> {
    return this as unknown as None<T>;
  }

  public flatMap<P, U extends Optional<P>>(mapper: (value: T) => Promise<U>): Promise<U>;
  public flatMap<P, U extends Optional<P>>(mapper: (value: T) => U): U;
  public flatMap<P, U extends Optional<P>>(_mapper: (value: T) => U | Promise<U>): U | Promise<U> {
    return this as unknown as U;
  }

  public flatten<U>(this: None<Optional<U>>): None<U> {
    return this as unknown as None<U>;
  }

  public fold<U>(ifSome: (value: T) => Promise<U>, ifNone: () => Promise<U>): Promise<U>;
  public fold<U>(ifSome: (value: T) => U, ifNone: () => U): U;
  public fold<U>(_ifSome: (value: T) => U, ifNone: () => U): U {
    return ifNone();
  }

  public isNone(): this is None<T> {
    return true;
  }

  public isSome(): this is Some<NonNullable<T>> {
    return false;
  }

  public isSomeAnd(predicate: (value: T) => Promise<boolean>): Promise<boolean>;
  public isSomeAnd(predicate: (value: T) => boolean): boolean;
  public isSomeAnd(_predicate: (value: T) => boolean | Promise<boolean>): boolean | Promise<boolean> {
    return false;
  }

  public inspect(fn: (value: T) => Promise<void>): Promise<this>;
  public inspect(fn: (value: T) => void): this;
  public inspect(_fn: (value: T) => void | Promise<void>): this | Promise<this> {
    return this;
  }

  public map<U>(mapper: (value: T) => Promise<U>): Promise<None<U>>;
  public map<U>(mapper: (value: T) => Promise<U>): Promise<Optional<U>>;
  public map<U>(mapper: (value: T) => U): None<U>;
  public map<U>(mapper: (value: T) => U): Optional<U>;
  public map<U>(_mapper: (value: T) => U | Promise<U>): Optional<U> | Promise<Optional<U>> {
    return this as unknown as None<U>;
  }

  public mapOr<U>(value: U, mapper: (value: T) => Promise<U>): Promise<U>;
  public mapOr<U>(value: U, mapper: (value: T) => U): U;
  public mapOr<U>(value: U, _mapper: (value: T) => U | Promise<U>): U | Promise<U> {
    return value;
  }

  public mapOrElse<U>(orElse: () => Promise<U>, mapper: (value: T) => Promise<U>): Promise<U>;
  public mapOrElse<U>(orElse: () => U, mapper: (value: T) => U): U;
  public mapOrElse<U>(orElse: () => U | Promise<U>, _mapper: (value: T) => U | Promise<U>): U | Promise<U> {
    return orElse();
  }

  public or<U>(other: Optional<U>): Optional<T | U> {
    return other;
  }

  public orElse(mapper: () => Promise<Optional<T>>): Promise<Optional<T>>;
  public orElse(mapper: () => Optional<T>): Optional<T>;
  public orElse(mapper: () => Optional<T> | Promise<Optional<T>>): Optional<T> | Promise<Optional<T>> {
    return mapper();
  }

  public reduce<U>(initialValue: U, reducer: (acc: U, value: T) => Promise<U>): Promise<U>;
  public reduce<U>(initialValue: U, reducer: (acc: U, value: T) => U): U;
  public reduce<U>(initialValue: U, _reducer: (acc: U, value: T) => U | Promise<U>): U | Promise<U> {
    return initialValue;
  }

  public unwrap(error: string | Error = "No value in Option"): T {
    if (typeof error === "string") {
      throw new Error(error);
    }

    throw error;
  }

  public unwrapOr(other: T): T {
    return other;
  }

  public unwrapOrUndefined(): T | undefined {
    return undefined;
  }

  public unwrapOrNull(): T | null {
    return null;
  }
  public unzip<A, B>(this: None<[A, B]>): [Optional<A>, Optional<B>] {
    return [Option.none(), Option.none()];
  }

  protected valueOf(): T | undefined {
    return undefined;
  }

  public unwrapOrElse(other: () => Promise<T>): Promise<T>;
  public unwrapOrElse(other: () => T): T;
  public unwrapOrElse(other: () => T | Promise<T>): T | Promise<T> {
    return other();
  }

  public xor<U>(other: Optional<U>): Optional<T | U> {
    return other;
  }

  public zip<U>(_other: Optional<U>): Optional<[T, U]> {
    return this as unknown as None<[T, U]>;
  }

  public zipWith<U, V>(other: Optional<U>, zipper: (a: T, b: U) => Promise<V>): Promise<Optional<V>>;
  public zipWith<U, V>(other: Optional<U>, zipper: (a: T, b: U) => V): Optional<V>;
  public zipWith<U, V>(
    _other: Optional<U>,
    _zipper: (a: T, b: U) => V | Promise<V>
  ): Optional<V> | Promise<Optional<V>> {
    return this as unknown as None<V>;
  }
}

export class Some<T> extends Option<T> {
  public and<U>(other: Optional<U>): Optional<U> {
    return other;
  }

  public andThen<U>(mapper: (value: T) => Promise<Optional<U>>): Promise<Optional<U>>;
  public andThen<U>(mapper: (value: T) => Optional<U>): Optional<U>;
  public andThen<U>(mapper: (value: T) => Optional<U> | Promise<Optional<U>>): Optional<U> | Promise<Optional<U>> {
    return mapper(this.get());
  }

  public equals(other: Optional<T>, comparator?: ((a: T, b: T) => Promise<boolean>) | undefined): Promise<boolean>;
  public equals(other: Optional<T>, comparator?: ((a: T, b: T) => boolean) | undefined): boolean;
  public equals(
    other: Optional<T>,
    comparator: ((a: T, b: T) => boolean) | ((a: T, b: T) => Promise<boolean>) = (a, b) => a === b
  ): boolean | Promise<boolean> {
    if (other.isSome()) {
      return comparator(this.get(), other.get());
    }

    return false;
  }

  public expect(_error: string | Error): T {
    return this.get();
  }

  public filter(predicate: (value: T) => Promise<boolean>): Promise<Optional<T>>;
  public filter(predicate: (value: T) => boolean): Optional<T>;
  public filter(predicate: (value: T) => boolean | Promise<boolean>): Optional<T> | Promise<Optional<T>> {
    const result = predicate(this.get());
    if (result instanceof Promise) {
      return result.then((value) => (value ? this : Option.none()));
    }

    return result ? this : Option.none();
  }

  public flatMap<P, U extends Optional<P>>(mapper: (value: T) => Promise<U>): Promise<U>;
  public flatMap<P, U extends Optional<P>>(mapper: (value: T) => U): U;
  public flatMap<P, U extends Optional<P>>(mapper: (value: T) => U | Promise<U>): U | Promise<U> {
    return mapper(this.get());
  }

  public flatten<U>(this: Optional<Optional<U>>): Optional<U>;
  public flatten<U>(this: Some<Optional<U>>): Optional<U> {
    return this.get();
  }

  public fold<U>(ifSome: (value: T) => Promise<U>, ifNone: () => Promise<U>): Promise<U>;
  public fold<U>(ifSome: (value: T) => U, ifNone: () => U): U;
  public fold<U>(ifSome: (value: T) => U | Promise<U>, _ifNone: () => U | Promise<U>): U | Promise<U> {
    return ifSome(this.get());
  }

  public get(): T {
    return this.value!;
  }

  public getOrElse(_other: () => T): T {
    return this.get();
  }

  public async getOrElseAsync(_other: () => Promise<T>): Promise<T> {
    return this.get();
  }

  public isNone(): this is None<T> {
    return false;
  }

  public isSome(): this is Some<NonNullable<T>> {
    return true;
  }

  public isSomeAnd(predicate: (value: T) => Promise<boolean>): Promise<boolean>;
  public isSomeAnd(predicate: (value: T) => boolean): boolean;
  public isSomeAnd(predicate: (value: T) => boolean | Promise<boolean>): boolean | Promise<boolean> {
    return predicate(this.get());
  }

  public inspect(fn: (value: T) => Promise<void>): Promise<this>;
  public inspect(fn: (value: T) => void): this;
  public inspect(fn: (value: T) => void | Promise<void>): this | Promise<this> {
    const result = fn(this.get());
    if (result instanceof Promise) {
      return result.then(() => this);
    }

    return this;
  }

  public map<U>(mapper: (value: T) => Promise<NonNullable<U>>): Promise<Some<NonNullable<U>>>;
  public map<U>(mapper: (value: T) => Promise<U>): Promise<Optional<U>>;
  public map<U>(mapper: (value: T) => NonNullable<U>): Some<NonNullable<U>>;
  public map<U>(mapper: (value: T) => U): Optional<U>;
  public map<U>(mapper: (value: T) => U | Promise<U>): Optional<U> | Promise<Optional<U>> {
    const result = mapper(this.get());
    if (result instanceof Promise) {
      return result.then((value) => Option.of(value));
    }

    return Option.of(result);
  }

  public mapOr<U>(value: U, mapper: (value: T) => Promise<U>): Promise<U>;
  public mapOr<U>(value: U, mapper: (value: T) => U): U;
  public mapOr<U>(_value: U, mapper: (value: T) => U | Promise<U>): U | Promise<U> {
    return mapper(this.get());
  }

  public mapOrElse<U>(orElse: () => U, mapper: (value: T) => U): U;
  public mapOrElse<U>(orElse: () => Promise<U>, mapper: (value: T) => Promise<U>): Promise<U>;
  public mapOrElse<U>(_orElse: () => U | Promise<U>, mapper: (value: T) => U | Promise<U>): U | Promise<U> {
    return mapper(this.get());
  }

  public or<U>(_other: Optional<U>): Optional<T | U> {
    return this;
  }

  public orElse(mapper: () => Promise<Optional<T>>): Promise<Optional<T>>;
  public orElse(mapper: () => Optional<T>): Optional<T>;
  public orElse(_mapper: () => Optional<T> | Promise<Optional<T>>): Optional<T> | Promise<Optional<T>> {
    return this;
  }

  public reduce<U>(initialValue: U, reducer: (acc: U, value: T) => Promise<U>): Promise<U>;
  public reduce<U>(initialValue: U, reducer: (acc: U, value: T) => U): U;
  public reduce<U>(initialValue: U, reducer: (acc: U, value: T) => U | Promise<U>): U | Promise<U> {
    return reducer(initialValue, this.get());
  }

  public unwrap(): T {
    return this.get();
  }

  public unwrapOr(_other: T): T {
    return this.get();
  }

  public unwrapOrElse(other: () => Promise<T>): Promise<T>;
  public unwrapOrElse(other: () => T): T;
  public unwrapOrElse(_other: () => T | Promise<T>): T | Promise<T> {
    return this.get();
  }

  public unwrapOrNull(): T | null {
    return this.get();
  }

  public unwrapOrUndefined(): T | undefined {
    return this.get();
  }

  public unzip<A, B>(this: Some<[A, B]>): [Optional<A>, Optional<B>] {
    const value = this.get();
    return [Option.of(value[0]), Option.of(value[1])];
  }

  public xor<U>(_other: Optional<U>): Optional<T | U> {
    return this;
  }

  public zip<U>(other: Optional<U>): Optional<[T, U]> {
    if (other.isSome()) {
      return Option.some([this.get(), other.get()]);
    }

    return Option.none();
  }

  public zipWith<U, V>(other: Optional<U>, zipper: (a: T, b: U) => Promise<V>): Promise<Optional<V>>;
  public zipWith<U, V>(other: Optional<U>, zipper: (a: T, b: U) => V): Optional<V>;
  public zipWith<U, V>(other: Optional<U>, zipper: (a: T, b: U) => V | Promise<V>): Optional<V> | Promise<Optional<V>> {
    if (other.isSome()) {
      const result = zipper(this.get(), other.get());
      if (result instanceof Promise) {
        return result.then((value) => Option.of(value));
      }

      return Option.of(result);
    }

    return Option.none();
  }
}
