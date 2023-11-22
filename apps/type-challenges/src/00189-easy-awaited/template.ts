type MyAwaited<P extends PromiseLike<any>> = P extends PromiseLike<infer TValue>
  ? TValue extends PromiseLike<any>
    ? MyAwaited<TValue>
    : TValue
  : never;
