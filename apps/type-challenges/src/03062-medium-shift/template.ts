type Shift<T extends unknown[]> = T['length'] extends 0
  ? []
  : T extends [unknown, ...infer R]
    ? R
    : never;
