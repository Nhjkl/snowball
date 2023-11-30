/* eslint-disable @typescript-eslint/ban-types */
import type { Equal, Expect } from '@type-challenges/utils';

// Typescript 支持做模式匹配
{
  type p = Promise<'test'>;

  // 提取'test' 值

  type TGetValue<P> = P extends Promise<infer T> ? T : never; // 通过 infer 声明一个局部变量 T 来保存

  type value = TGetValue<p>;

  type cases = [Expect<Equal<value, 'test'>>];
}

{
  // any 和 unknown 的区别： any 和 unknown 都代表任意类型，但是 unknown 只能接收任意类型的值，
  // 而 any 除了可以接收任意类型的值，也可以赋值给任意类型（除了 never）。
  // 类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。
  type TFrist<T extends unknown[]> = T extends [infer First, ...unknown[]]
    ? First
    : never;

  type first = TFrist<[1, 2, 3]>;

  type TLast<T extends unknown[]> = T extends [...unknown[], infer Last]
    ? Last
    : never;

  type last = TLast<[1, 2, 3]>;

  type nev = TFrist<[]>;

  type cases = [
    Expect<Equal<first, 1>>,
    Expect<Equal<last, 3>>,
    Expect<Equal<nev, never>>,
  ];
}

{
  type PopArr<T extends unknown[]> = T extends []
    ? []
    : T extends [...infer R, unknown]
      ? R
      : never;

  type test1 = PopArr<[1, 2, 3]>;
  type test2 = PopArr<[]>;

  type ShiftArr<T extends unknown[]> = T extends []
    ? []
    : T extends [unknown, ...infer R]
      ? R
      : never;

  type test3 = ShiftArr<[1, 2, 3]>;
  type test4 = ShiftArr<[]>;

  type cases = [
    Expect<Equal<test1, [1, 2]>>,
    Expect<Equal<test2, []>>,
    Expect<Equal<test3, [2, 3]>>,
    Expect<Equal<test4, []>>,
  ];
}

// 字符串类型
{
  type StartsWith<
    str extends string,
    prefix extends string,
  > = str extends `${prefix}${string}` ? true : false; // ${string}固定写法，代表可以匹配任何string

  type test1 = StartsWith<'abc', 'a'>;

  type test2 = StartsWith<'abc', 'b'>;

  type cases = [Expect<Equal<test1, true>>, Expect<Equal<test2, false>>];
}

// Replace
{
  type ReplaceStr<
    Str extends string,
    From extends string,
    To extends string,
  > = Str extends `${infer Prefix}${From}${infer Suffix}`
    ? `${Prefix}${To}${Suffix}`
    : Str;

  type test1 = ReplaceStr<'a++c', '++', '--'>;

  type test2 = ReplaceStr<'hello world', 'world', 'type'>;

  type test3 = ReplaceStr<'abc', 's', 't'>;

  type cases = [
    Expect<Equal<test1, 'a--c'>>,
    Expect<Equal<test2, 'hello type'>>,
    Expect<Equal<test3, 'abc'>>,
  ];
}

// Trim
// 能够匹配和替换字符串，那也就能实现去掉空白字符的 Trim：
// 不过因为我们不知道有多少个空白字符，所以只能一个个匹配和去掉，需要递归。
{
  type TrimRight<Str extends string> = Str extends `${infer R}${
    | ' '
    | '\n'
    | '\t'}`
    ? TrimRight<R>
    : Str;
  type TrimLeft<Str extends string> = Str extends `${
    | ' '
    | '\n'
    | '\t'}${infer R}`
    ? TrimLeft<R>
    : Str;

  type TrimAll<Str extends string> = TrimRight<TrimLeft<Str>>;

  type test1 = TrimRight<'a     '>;
  type test2 = TrimRight<`a

  `>;

  type test3 = TrimLeft<'     a'>;

  type test4 = TrimAll<'     a    '>;

  type cases = [
    Expect<Equal<test1, 'a'>>,
    Expect<Equal<test2, 'a'>>,
    Expect<Equal<test3, 'a'>>,
    Expect<Equal<test4, 'a'>>,
  ];
}

// 函数
// 取参数、返回值的类型。
{
  type GetParameters<Func extends Function> = Func extends (
    ...args: infer P
  ) => unknown
    ? P
    : never;
  // type GetReturnType<Func extends Function> = Func extends (...args: infer _) => infer R ? R : never;
  // TODO: 参数类型可以是任意类型，也就是 any[]（注意，这里不能用 unknown，这里的解释涉及到参数的逆变性质，具体原因逆变那一节会解释）。
  type GetReturnType<Func extends Function> = Func extends (
    ...args: any[]
  ) => infer R
    ? R
    : never;

  type test1 = GetParameters<(name: string, age: number) => unknown>;
  type test2 = GetReturnType<(name: string, age: number) => number>;

  type cases = [
    Expect<Equal<test1, [name: string, age: number]>>,
    Expect<Equal<test2, number>>,
  ];
}

// 约束this类型

{
  class Dog {
    name: string;

    constructor() {
      this.name = 'dog';
    }

    // 约束this类型
    hello(this: Dog) {
      return "hello, I'm " + this.name;
    }

    noThis() {
      console.log(`noThis >>`);
    }
  }

  const dog = new Dog();

  // 如果没有报错，说明没开启 strictBindCallApply 的编译选项，这个是控制是否按照原函数的类型来检查 bind、call、apply
  // @ts-expect-error
  dog.hello.apply('test'); // 1. Argument of type 'string' is not assignable to parameter of type 'Dog'. [2345]

  type GetThisType<T> = T extends (this: infer U, ...args: any[]) => any
    ? U
    : any;

  type test1 = GetThisType<typeof dog.hello>;

  type test2 = GetThisType<typeof dog.noThis>;

  type cases = [
    Expect<Equal<test1, Dog>>,
    // TODO: 还没找的结果 Dog 对象hello没有约束this 返回的thisType为unknown，没有走到 :any  这个分枝
    // @ts-expect-error
    Expect<Equal<test2, any>>,
  ];
}

// 构造器
{
  interface Person {
    name: string;
  }

  interface PersonConstructor {
    new (name: string): Person;
  }

  type GetInterfaceParameter<T extends new (...args: any[]) => any> =
    T extends new (...args: infer P) => any ? P : never;

  type GetInterfaceType<T extends new (...args: any[]) => any> = T extends new (
    ...args: any[]
  ) => infer R
    ? R
    : never;

  type test1 = GetInterfaceType<PersonConstructor>;
  type test2 = GetInterfaceParameter<PersonConstructor>;

  type cases = [
    Expect<Equal<test1, Person>>,
    Expect<Equal<test2, [name: string]>>,
  ];
}

// 索引类型
{
  // type GetRefProps<Props> = 'ref' extends keyof Props ? Props['ref'] : never;
  type GetRefProps<Props> = 'ref' extends keyof Props
    ? Props extends { ref?: infer Value | undefined }
      ? Value
      : never
    : never;

  type test1 = GetRefProps<{ ref?: 1; name: 'Sean' }>;
  type test2 = GetRefProps<{ ref?: undefined }>;
  type test3 = GetRefProps<{}>;

  type cases = [
    Expect<Equal<test1, 1>>,
    Expect<Equal<test2, undefined>>,
    Expect<Equal<test3, never>>,
  ];
}
