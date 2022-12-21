type ObjKey = number | string | symbol

type TupleToObject<T extends readonly ObjKey[]> = {
  [K in T[number]]: K // types 世界里数组循环 T[number]
}

type TestTupleToObject<T extends readonly any[]> = {
  [K in keyof T]: K
}

type testTuple = TestTupleToObject<['liu', 'xian']> // ['0', '1']
