type Merge<F, S> = {
  [K in keyof (F & S)]: K extends keyof S
    ? S[K]
    : K extends keyof F
      ? F[K]
      : never;
};
