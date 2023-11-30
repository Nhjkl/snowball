/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from '@type-challenges/utils';
import { type } from 'os';

// Promise 的递归复用

{
  type ttt = Promise<Promise<Promise<string>>>;

  type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
    infer ValueType
  >
    ? ValueType extends Promise<unknown>
      ? DeepPromiseValueType<ValueType>
      : ValueType
    : never;

  // 不再约束类型参数必须是 Promise，这样就可以少一层判断。
  type DeepPromiseValueType2<P> = P extends Promise<infer ValueType>
    ? DeepPromiseValueType2<ValueType>
    : P;

  type test1 = DeepPromiseValueType<ttt>;
  type test2 = DeepPromiseValueType2<ttt>;
  type test3 = DeepPromiseValueType2<string>;

  type cases = [
    Expect<Equal<test1, string>>,
    Expect<Equal<test2, string>>,
    Expect<Equal<test3, string>>,
  ];
}

// 数组类型的递归
// ReverseArr
{
  type arr = [1, 2, 3, 4, 5];
  // 我们把它反过来，也就是变成： type arr = [5,4,3,2,1];
  // [1, 2, 3, 4, 5]
  // [2, 3, 4, 5, 1]
  // [3, 4, 5, 2, 1]
  // [4, 5, 3, 2, 1]
  // [5, 4, 3, 2, 1]
  type ReverseArr<Arr extends unknown[]> = Arr extends [
    infer First,
    ...infer Rest,
  ]
    ? [...ReverseArr<Rest>, First]
    : Arr;
  /* TODO: ReverseArr 最后一次被调用Rest = [], 所以该行Arr可以替换成[], 为什么不能替换成 never,
   因为上面表达式就会变成[...never, First], TypeScript提前结束，finally返回never
   */

  type ReverseArr2<Arr extends unknown[]> = Arr extends [
    infer Left,
    ...infer Center,
    infer Right,
  ]
    ? [Right, ...ReverseArr2<Center>, Left]
    : Arr;

  type test1 = ReverseArr<arr>;
  type test2 = ReverseArr2<arr>;

  type cases = [
    Expect<Equal<test1, [5, 4, 3, 2, 1]>>,
    Expect<Equal<test1, test2>>,
  ];
}

// Includes
{
  type arr = [1, 2, 3, 4, 5];
  // 查找 [1, 2, 3, 4, 5] 中是否存在 4，是就返回 true，否则返回 false。

  type IsEqual<A, B> = (A extends B ? true : false) &
    (B extends A ? true : false);

  type Includes<Arr extends unknown[], T> = Arr extends [
    infer First,
    ...infer Rest,
  ]
    ? IsEqual<First, T> extends false
      ? Includes<Rest, T>
      : true
    : false;

  type test1 = Includes<arr, 4>;
  type test2 = Includes<arr, 6>;

  type cases = [Expect<Equal<test1, true>>, Expect<Equal<test2, false>>];
}

// RemoveItem
{
  type IsEqual<A, B> = (A extends B ? true : false) &
    (B extends A ? true : false);

  type RemoveItem<
    Arr extends unknown[],
    Item,
    Result extends unknown[] = [],
  > = Arr extends [infer First, ...infer Rest]
    ? IsEqual<First, Item> extends true
      ? RemoveItem<Rest, Item, Result> // 如果 First === Item,则继续递归， Result = []
      : RemoveItem<Rest, Item, [...Result, First]> // 如果 First !== Item,则继续递归， Result = [...Result, First] 保留 First
    : Result;

  type arr = [1, 2, 3, 4, 5];

  type test1 = RemoveItem<arr, 4>;
}

// BuildArray
{
  type BuildArray<
    Len extends number,
    Item,
    Arr extends unknown[] = [],
  > = Arr['length'] extends Len ? Arr : BuildArray<Len, Item, [...Arr, Item]>;

  type test1 = BuildArray<3, 1>;

  type cases = [Expect<Equal<test1, [1, 1, 1]>>];
}

// ReplaceAll
{
  type ReplaceAll<
    Str extends string,
    From extends string,
    To extends string,
  > = Str extends `${infer Left}${From}${infer Right}`
    ? `${Left}${To}${ReplaceAll<Right, From, To>}`
    : Str;

  type test1 = ReplaceAll<'goooooogle', 'o', '0'>;

  type cases = [Expect<Equal<test1, 'g000000gle'>>];
}

// StringToUnion
{
  type StringToUnion<Str extends string> =
    Str extends `${infer First}${infer Rest}`
      ? First | StringToUnion<Rest>
      : never;

  type test1 = StringToUnion<'hello'>;
}

// ReverseStr
{
  // hello
  //     h
  //    eh
  //   leh
  //  lleh
  // olleh
  type ReverseStr<
    Str extends string,
    Result extends string = '',
  > = Str extends `${infer First}${infer Rest}`
    ? ReverseStr<Rest, `${First}${Result}`>
    : Result;

  type test1 = ReverseStr<'hello'>;

  type cases = [Expect<Equal<test1, 'olleh'>>];
}

// DeepReadonly
{
  type DeepReadonly<Obj extends Record<string, any>> = {
    readonly [K in keyof Obj]: Obj[K] extends object
      ? Obj[K] extends Function
        ? Obj[K]
        : DeepReadonly<Obj[K]>
      : Obj[K];
  };

  type DeepReadonly2<Obj extends Record<string, any>> = Obj extends any
    ? {
        readonly [Key in keyof Obj]: Obj[Key] extends object
          ? Obj[Key] extends Function
            ? Obj[Key]
            : DeepReadonly<Obj[Key]>
          : Obj[Key];
      }
    : never;

  type obj = {
    a: {
      b: {
        c: {
          f: () => 'dong';
          d: {
            e: {
              guang: string;
            };
          };
        };
      };
    };
  };

  type test1 = DeepReadonly<{ a: 1; b: { c: 1 } }>;
  type test2 = DeepReadonly<{ a: 1; b: () => void }>;
  type test3 = DeepReadonly<obj>;
  type test4 = DeepReadonly2<obj>;

  type cases = [
    Expect<Equal<test1, { readonly a: 1; readonly b: { readonly c: 1 } }>>,
    Expect<Equal<test2, { readonly a: 1; readonly b: () => void }>>,
  ];
}

// 在 TypeScript 类型系统中的高级类型也同样支持递归，在类型体操中，遇到数量不确定的问题，要条件反射的想到递归。
// 比如数组长度不确定、字符串长度不确定、索引类型层数不确定等。
