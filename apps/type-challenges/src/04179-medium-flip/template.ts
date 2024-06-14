type Flip<T extends Record<string, string | boolean | number>> = {
  [K in keyof T as `${T[K]}`]: K;
};
