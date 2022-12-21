import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type typeofTuple = typeof tuple;


type cases = [
  Expect<Equal<TupleToObject<typeofTuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

type tupleType = ['tesla', 'model 3'];
type keyofTuple = keyof tupleType

let _keyofTuple: keyofTuple;

_keyofTuple = '0'
_keyofTuple = '1'
// @ts-expect-error
_keyofTuple = '2'
