type Zip<T extends unknown[], U extends unknown[]> = T extends [
  infer TF,
  ...infer TR,
]
  ? U extends [infer UF, ...infer UR]
    ? [[TF, UF], ...Zip<TR, UR>]
    : []
  : [];
