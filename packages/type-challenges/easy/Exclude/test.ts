import type { Equal, Expect } from '@type-challenges/utils';

type test1 = MyExclude<'a' | 'b' | 'c', 'a'>;

type cases = [
  Expect<Equal<test1, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<
    Equal<MyExclude<string | number | (() => void), Function>, string | number>
  >
];
