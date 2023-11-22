// (number | string | symbol)[] => [1, '1', Symbol(1)]
// nunber [] | string [] | symbol [] => [1,2,3] || ['1','2','3'] ...
type TupleToObject<T extends readonly (number | string | symbol)[]> = {
  [K in T[number]]: K;
};
