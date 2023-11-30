/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from '@type-challenges/utils';
// 特殊类型的特性
// 类型的判断要根据它的特性来，比如判断联合类型就要根据它的 distributive 的特性。
//
// IsAny
// 如何判断一个类型是 any 类型呢？要根据它的特性来：
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。

{
  type IsAny<T> = 1 extends 2 & T ? true : false;

  type test1 = IsAny<1>;
  type test2 = IsAny<any>;

  type cases = [
    Expect<Equal<IsAny<1>, false>>,
    Expect<Equal<IsAny<any>, true>>,
  ];
}

{
  type IsEqual<A, B> = (A extends B ? true : false) &
    (B extends A ? true : false);

  type test1 = IsEqual<1, any>;

  type cases = [Expect<Equal<IsEqual<1, any>, true>>]; // NOTE: 自觉应该是false 因为 any 可以是任何类型，任何类型也都是 any，所以当这样写判断不出 any 类型来。

  type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <
    T,
  >() => T extends B ? 1 : 2
    ? true
    : false;

  type cases2 = [Expect<Equal<IsEqual2<1, any>, false>>]; // TODO: 这是因为 TS 对这种形式的类型做了特殊处理，是一种 hack 的写法，它的解释要从 TypeScript 源码找答案了
}

{
  type IsUnion<A, B extends A = A> = A extends A
    ? [B] extends [A]
      ? false
      : true
    : never;

  type test1 = IsUnion<string | number>;
}

// IsNever
// NOTE: never 在条件类型中也比较特殊，如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never：
{
  type TestNever<T> = T extends number ? 1 : 2;

  type test1 = TestNever<never>;

  type IsNever<T> = [T] extends [never] ? true : false;

  type test2 = IsNever<never>;

  type TestAny<T> = T extends number ? 1 : 2;

  type test3 = TestAny<any>;
}

// IsTuple
// 元组类型的 length 是数字字面量，而数组的 length 是 number。
{
  type tupleLength = [1, 2]['length'];
  type arrayLength = number[]['length'];

  type cases = [
    Expect<Equal<tupleLength, 2>>,
    Expect<Equal<arrayLength, number>>,
  ];

  type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
    T,
  >() => T extends B ? 1 : 2
    ? false
    : true;

  type isTuple<T> = T extends [...items: infer P]
    ? NotEqual<P['length'], number>
    : false;

  type test1 = isTuple<[]>;
  type test2 = isTuple<number[]>;

  type cases2 = [Expect<Equal<test1, true>>, Expect<Equal<test2, false>>];
}

// UnionToIntersection
// 类型之间是有父子关系的，更具体的那个是子类型，比如 A 和 B 的交叉类型 A & B 就是联合类型 A | B 的子类型，因为更具体。
// 如果允许父类型赋值给子类型，就叫做逆变。
// 如果允许子类型赋值给父类型，就叫做协变。
// NOTE: 在 TypeScript 中有函数参数是有逆变的性质的，也就是如果参数可能是多个类型，参数类型会变成它们的交叉类型。
// NOTE: 函数参数的逆变性质一般就联合类型转交叉类型会用，记住就行。
{
  type UnionToIntersection<U> = (
    U extends U ? (x: U) => unknown : never
  ) extends (x: infer R) => unknown
    ? R
    : never;

  type test1 = UnionToIntersection<{ a: 1 } | { b: 2 }>;

  type cases = [Expect<Equal<test1, { a: 1 } & { b: 2 }>>];
}

// GetOptional
// 如何提取索引类型中的可选索引呢？
// NOTE: 这也要利用可选索引的特性：可选索引的值为 undefined 和值类型的联合类型。
{
  type TObj = {
    name: string;
    age?: number;
  };

  type GetOptional<Obj extends Record<string, any>> = {
    [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
  };

  type res = {} extends Pick<TObj, 'age'> ? true : false;
  // 可选的意思是这个索引可能没有，没有的时候，那 Pick 就是空的，所以 {} extends Pick 就能过滤出可选索引。

  type test1 = GetOptional<TObj>;
}

// GetRequired
// 实现了 GetOptional，那反过来就是 GetRequired，也就是过滤所有非可选的索引构造成新的索引类型：
{
  type TObj = {
    name: string;
    age?: number;
  };

  type isRequest<Obj, Key extends keyof Obj> = {} extends Pick<Obj, Key>
    ? never
    : Key;

  type GetRequired<Obj extends Record<string, any>> = {
    [Key in keyof Obj as isRequest<Obj, Key>]: Obj[Key];
  };

  type res = {} extends Pick<TObj, 'age'> ? true : false;
  // 可选的意思是这个索引可能没有，没有的时候，那 Pick 就是空的，所以 {} extends Pick 就能过滤出可选索引。

  type test1 = GetRequired<TObj>;
}

// RemoveIndexSignature
{
  type Dong = {
    [key: string]: any;
    sleep(): void;
  };
  // 这里的 sleep 是具体的索引，[key: string]: any 就是可索引签名，代表可以添加任意个 string 类型的索引。
  // 如果想删除索引类型中的可索引签名呢？
  // NOTE: 同样根据它的性质，索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以。
  type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
  };

  type test1 = RemoveIndexSignature<Dong>;
}

// ClassPublicProps
// 如何过滤出 class 的 public 的属性呢？
// NOTE: 也同样是根据它的特性：keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。
{
  class Dong {
    public name: string;
    protected age: number;
    private hobbies: string[];

    constructor() {
      this.name = 'dong';
      this.age = 20;
      this.hobbies = ['sleep', 'eat'];
    }
  }

  type publicProps = keyof Dong;

  type GetPublicProps<T extends Record<string, any>> = {
    [Key in keyof T]: T[Key];
  };

  type test1 = GetPublicProps<Dong>;
}

// as const
// TypeScript 默认推导出来的类型并不是字面量类型。
{
  const obj = { a: 1, b: 'b' };

  type test1 = typeof obj;

  const arr = [1, 2, 3];

  type test2 = typeof arr;

  type cases = [
    Expect<Equal<test1, { a: number; b: string }>>,
    Expect<Equal<test2, number[]>>,
  ];
}
// 但是类型编程很多时候是需要推导出字面量类型的，这时候就需要用 as const：
{
  const obj = { a: 1, b: 'b' } as const;

  type test1 = typeof obj;

  type NotReadonly<T> = {
    -readonly [Key in keyof T]: T[Key];
  };

  type test3 = NotReadonly<typeof obj>;

  const arr = [1, 2, 3] as const;

  type test2 = typeof arr;

  type cases = [
    Expect<Equal<test1, { readonly a: 1; readonly b: 'b' }>>,
    Expect<Equal<test2, readonly [1, 2, 3]>>,
  ];
}

// 学完前面 5 个套路，我们已经能够实现各种类型编程逻辑了，但一些类型的特性还是要记一下。在判断或者过滤类型的时候会用到：
//
// 0, any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。
// 1, 联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并。
// 2, never 作为类型参数出现在条件类型左侧时，会直接返回 never。
// 3, any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
// 4, 元组类型也是数组类型，但 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。
// 5, 函数参数处会发生逆变，可以用来实现联合类型转交叉类型。
// 6, 可选索引的索引可能没有，那 Pick 出来的就可能是 {}，可以用来过滤可选索引，反过来也可以过滤非可选索引。
// 7, 索引类型的索引为字符串字面量类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。
// 8, keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。
// 9, 默认推导出来的不是字面量类型，加上 as const 可以推导出字面量类型，但带有 readonly 修饰，这样模式匹配的时候也得加上 readonly 才行。
