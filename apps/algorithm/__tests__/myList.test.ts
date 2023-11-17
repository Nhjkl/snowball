import { expect, test } from 'vitest';
import { MyList } from '../src/myList';

test('myList test', () => {
  const list = new MyList();

  list.add(10);

  expect(list.size()).toBe(1);

  expect(list.toArray()).toEqual([10]);
});
