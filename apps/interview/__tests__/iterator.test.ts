/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, test } from 'vitest';

test('iterator', () => {
  const arr = [1, 2, 3];
  const iter = arr[Symbol.iterator]();

  const a = iter.next().value;
  const b = iter.next().value;

  expect(a).toBe(1);
  expect(b).toBe(2);
});

test('Destructuring assignment', () => {
  // (Object.prototype as any)[Symbol.iterator] = function* () {
  //   yield* Object.values(this);
  // };

  (Object.prototype as any)[Symbol.iterator] = function () {
    return Object.values(this)[Symbol.iterator](); // 返回迭代器
  };

  const [a, b] = { a: 1, b: 2 } as any;

  expect(a).toBe(1);
  expect(b).toBe(2);
});
