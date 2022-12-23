type MyReturnType<T extends Function> =
  T extends (...args: any[]) => infer U // 获取函数返回值固定写法
    ? U
    : never
