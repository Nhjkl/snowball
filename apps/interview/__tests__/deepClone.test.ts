import { expect, test } from 'vitest';
import { deepClone } from '../src/deepClone';

test('test deepClone', async () => {
  const obj = {
    name: 'sean liu',
  };
  const res = await deepClone(obj);
  console.log(`res >>`, res);
  expect(res === obj).toBe(false);
});
