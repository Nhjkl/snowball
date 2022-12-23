type MyParameters<T extends (...args: any[]) => any> =
  T extends (...args: infer Rest) => any // 获取函数参数固定写法
    ? Rest
    : never

const foo = (arg1: string, arg2: number): void => {}

type MyParameters_test1 = MyParameters<typeof foo>
