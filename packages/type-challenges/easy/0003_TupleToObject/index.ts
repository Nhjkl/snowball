type ObjKey = number | string | symbol

type TupleToObject<T extends readonly ObjKey[]> = {
  [K in T[number]]: K // types 世界里数组循环 T[number]
}

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
type tsl2 = (typeof tesla)[number] // type tsl2 = "tesla" | "model 3" | "model X" | "model Y"

type TestTupleToObject<T extends readonly any[]> = {
  [K in keyof T]: K
}

type testTuple = TestTupleToObject<['liu', 'xian']> // ['0', '1']
