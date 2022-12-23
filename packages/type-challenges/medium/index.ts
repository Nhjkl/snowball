import type { Equal, Expect } from '@type-challenges/utils'

type Last<T extends any[]> = T extends [...any[], infer R] ? R : never

// type Last<T extends any[]> = T extends [infer F, ...infer E] ? T[E['length']] : never

// ---------- test ------------

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]
