type _TrimRight<S extends string> = S extends `${infer L}${' ' | '\n' | '\t'}`
  ? TrimRight<L>
  : S;
type _TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}`
  ? TrimLeft<R>
  : S;
type Trim<S extends string> = _TrimRight<_TrimLeft<S>>;
