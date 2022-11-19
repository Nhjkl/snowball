// https://promisesaplus.com/
// https://juejin.cn/post/7001775082339041288
import { expect, test } from 'vitest';
import { MyPromise } from '../index';

test('Promise', async () => {
  const res = await Promise.resolve(1);
  expect(res).toBe(1);
});

test('Promise execute fun immediate execution', async () => {
  let immediate = false;

  new MyPromise(() => {
    immediate = true;
  });

  expect(immediate).toBe(true);
});

test('Promise execute fun immediate execution', async () => {
  let immediate = false;

  new MyPromise(resolve => {
    resolve(1);
  }).then(() => {
    immediate = true;
  });

  expect(immediate).toBe(false);
});
