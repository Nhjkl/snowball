type Join<
  T extends any[],
  U extends string | number = ',',
> = T['length'] extends 0
  ? ''
  : T extends [infer F extends string, ...infer R]
    ? R['length'] extends 0
      ? `${F}`
      : `${F}${U}${Join<R, U>}`
    : never;
