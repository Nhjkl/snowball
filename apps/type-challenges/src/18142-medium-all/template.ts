type _Equal<A, B> = (<T>() => T extends A ? true : false) extends <
  T,
>() => T extends B ? true : false
  ? true
  : false;

type All<Arr extends unknown[], T> = Arr extends [infer F, ...infer R]
  ? true extends _Equal<F, T>
    ? All<R, T>
    : false
  : true;
