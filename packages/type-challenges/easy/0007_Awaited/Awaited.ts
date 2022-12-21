type MyAwaited<T extends PromiseLike<any>> =
  T extends PromiseLike<infer X> // 判断是不是类这种结构 Promise<string>
  ?(
    X extends PromiseLike<any> // 判断 X 是不是 PromiseLike<any>
    ? MyAwaited<X> // 如果是递归调用 MyAwaited<X>
    : X // 返回结果
  )
  : never
