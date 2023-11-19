import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
];
