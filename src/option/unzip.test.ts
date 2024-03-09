import { Option, Optional } from './index';

describe('Option.unzip', () => {
  it('should unzip an zipped option', () => {
    const zipped = Option.some(1).zip(Option.some(2));
    const unzipped = zipped.unzip();
    expect(unzipped).toEqual([Option.some(1), Option.some(2)]);
  })

  it('should unzip an zipped option with the first option being none', () => {
    const zipped = Option.none().zip(Option.some(2));
    const unzipped = zipped.unzip();
    expect(unzipped).toEqual([Option.none(), Option.none()]);
  })

  it('should unzip an optional', () => {
    const zipped = Option.some(1).zip(Option.none<number>()) as Optional<[number, number]>;
    const [a, b] = zipped.unzip();
    expect(a).toEqual(Option.none());
    expect(b).toEqual(Option.none());
  })
})
