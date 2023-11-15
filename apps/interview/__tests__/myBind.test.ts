/* eslint-disable @typescript-eslint/no-this-alias */
import { expect, test } from 'vitest';
import { myBind } from '../src/myBind';

test('test myBind', () => {
  let this1;
  let this2;
  let args1;
  let args2;

  function fn(this: unknown, ...args: unknown[]) {
    args1 = args;
    this1 = this;
  }

  const newFn = myBind(fn, 'ctx', 1, 2);
  newFn(3, 4);

  function fn1(this: unknown, ...args: unknown[]) {
    args2 = args;
    this2 = this;
  }
  const newFn1 = fn1.bind('ctx', 1, 2);

  newFn1(3, 4);

  expect(this1).toBe(this2);
  expect(args1).toEqual(args2);
});
