type TupleToObject<T extends any[]> = {
  [K in T[number]]: K
}
