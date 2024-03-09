import { test, expect } from 'vitest';
import { getIndexOf, getNext } from '../src/getIndexOf';

test('测试next函数', () => {
  const match = 'ababc'; // [-1, 0, 0, 1, 2]
  const next = getNext(match);
  expect(next).toEqual([-1, 0, 0, 1, 2]);
});

test('测试getIndexOf函数', () => {
  const text = 'aaabababababxababcrrr';
  const match = 'ababc'; // [-1, 0, 0, 1, 2]

  const index = getIndexOf(text, match);
  expect(index).toEqual(13);
});
