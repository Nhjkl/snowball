type TrimRight<S extends string> = S extends `${infer L}${' ' | '\n' | '\t'}`
  ? TrimRight<L>
  : S;
