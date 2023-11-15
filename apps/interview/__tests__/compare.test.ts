import { expect, test } from 'vitest';
import { compare } from '../src/compare';

test('test compare', () => {
  expect(compare('1-2-35', '1-2-34')).toBe(1);
  expect(compare('1-2', '1-2-34')).toBe(-1);
  expect(compare('1-2-34', '1-2-34')).toBe(0);
});
