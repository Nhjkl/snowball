import type { Equal, Expect } from '@type-challenges/utils';

type TupleToUnion<T extends any[]> = T[number] // Tuple to Union 固定用法

{
  type test = TupleToUnion<[123, '456', true]> // 123 | '456' | true

  type cases = [
    Expect<Equal<test, 123 | '456' | true>>,
    Expect<Equal<TupleToUnion<[123]>, 123>>
  ];
}
