import { expect, test } from 'vitest';

test('Promise', async () => {
  const res = await Promise.resolve(1);
  expect(res).toBe(1);
});

test('Promise execute fun immediate execution', async () => {
  let immediate = false;

  new Promise(() => {
    immediate = true;
  });

  expect(immediate).toBe(true);
});

test('Promise execute fun immediate execution', async () => {
  let immediate = false;

  new Promise(resolve => {
    resolve(1);
  }).then(() => {
    immediate = true;
  });

  expect(immediate).toBe(false);
});
