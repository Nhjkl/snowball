type BuildArray<
  T extends number,
  Result extends unknown[] = [],
> = Result['length'] extends T ? Result : BuildArray<T, [...Result, unknown]>;

type Add<A extends number, B extends number> = [
  ...BuildArray<A>,
  ...BuildArray<B>,
]['length'];

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  P extends number = 0, // 用于标识是否替换
> = Start extends End // Start === End
  ? T
  : T extends [infer F, ...infer R] // T 为 [] 条件终止
    ? P extends Start // P 为 Start,则替换
      ? [N, ...Fill<R, N, Add<Start, 1> & number, End, Add<P, 1> & number>] // Start 位置替换过后需要 + 1，P 也 + 1
      : [F, ...Fill<R, N, Start, End, Add<P, 1> & number>] // 不需要N替换继续往前走P + 1
    : T;
