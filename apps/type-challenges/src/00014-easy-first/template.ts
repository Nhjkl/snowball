// eslint-disable-next-line @typescript-eslint/no-explicit-any
type First<T extends any[]> = T extends [] ? never : T[0];
