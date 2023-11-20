import { Equal, Expect } from '@type-challenges/utils';
// 重新构造
{
  //TODO: 数组和元组的区别：数组类型是指任意多个同一类型的元素构成的，
  //比如 number[]、Array，而元组则是数量固定，类型可以不同的元素构成的，比如 [1, true, 'guang']。
  type tuple = [1, 2, 3];

  type Push<Arr extends unknown[], Item> = [...Arr, Item];
  type Unshift<Arr extends unknown[], Item> = [Item, ...Arr];

  type test1 = Push<tuple, 4>;
  type test2 = Unshift<tuple, 4>;

  type cases = [Expect<Equal<test1, [1, 2, 3, 4]>>, Expect<Equal<test2, [4, 1, 2, 3]>>];
}

// Zip
{
  type tuple1 = [1, 2];
  type tuple2 = ['guang', 'dong'];
  type tuple = [[1, 'guang'], [2, 'dong']];

  type Zip<T1 extends [unknown, unknown], T2 extends [unknown, unknown]> = T1 extends [infer a, infer b]
    ? T2 extends [infer c, infer d]
      ? [[a, c], [b, d]]
      : []
    : [];

  type ZipRecursion<T1 extends unknown[], T2 extends unknown[]> = T1 extends [infer T1First, ...infer T1Ohter]
    ? T2 extends [infer T2First, ...infer T2Ohter]
      ? [[T1First, T2First], ...ZipRecursion<T1Ohter, T2Ohter>]
      : []
    : [];

  type test1 = Zip<tuple1, tuple2>;
  type test2 = ZipRecursion<[1, 2, 3], ['a', 'b', 'c']>;

  type cases = [Expect<Equal<test1, tuple>>, Expect<Equal<test2, [[1, 'a'], [2, 'b'], [3, 'c']]>>];
}

// 字符串类型的重新构造
{
  type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}` // TypeScript 提供的内置高级类型 Uppercase 把首字母转为大写
    : Str;

  // CamelCase
  type CamelCase<Str extends string> = Str extends `${infer First}_${infer Right}${infer Rest}`
    ? `${First}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;

  // DropSubStr
  type DropSubStr<Str extends string, SubStr extends string> = Str extends `${infer Left}${SubStr}${infer Right}`
    ? DropSubStr<`${Left}${Right}`, SubStr>
    : Str;

  type test1 = CapitalizeStr<'sean'>;
  type test2 = CamelCase<'dong_dong_dong'>;
  type test3 = DropSubStr<'~~~~~duang~~~~~', '~'>;

  type cases = [Expect<Equal<test1, 'Sean'>>, Expect<Equal<test2, 'dongDongDong'>>, Expect<Equal<test3, 'duang'>>];
}

// 函数类型的重新构造：
{
  // eslint-disable-next-line @typescript-eslint/ban-types
  type AppendArgument<Func extends Function, Arg> = Func extends (...args: infer Args) => infer TReturn
    ? (...args: [...Args, Arg]) => TReturn
    : never;

  type test1 = AppendArgument<(arg: number) => void, boolean>;

  type cases = [Expect<Equal<test1, (arg: number, b: boolean) => void>>];
}

// 索引类型的重新构造
{
  type Maping<O extends object> = {
    [K in keyof O]: [O[K], O[K], O[K]]; // 映射的过程中可以对 value 做下修改
  };

  type UppercaseKey<O extends object> = {
    [K in keyof O as Uppercase<K & string>]: O[K]; // 因为索引可能为 string、number、symbol 类型，而这里只能接受 string 类型，所以要 & string，也就是取索引中 string 的部分
  };

  type test1 = Maping<{ a: 1 }>;
  type test2 = UppercaseKey<{ a: 1 }>;

  type cases = [Expect<Equal<test1, { a: [1, 1, 1] }>>, Expect<Equal<test2, { A: 1 }>>];
}

// Record
{
  type Record<K extends string | number | symbol, T> = {
    [P in K]: T;
  };

  type UppercaseKey<O extends Record<string, any>> = {
    [K in keyof O as Uppercase<K & string>]: O[K]; // 因为索引可能为 string、number、symbol 类型，而这里只能接受 string 类型，所以要 & string，也就是取索引中 string 的部分
  };

  type test1 = Record<string, number>;
  type test2 = UppercaseKey<{ a: 1 }>;

  type cases = [Expect<Equal<test1, { [k: string]: number }>>, Expect<Equal<test2, { A: 1 }>>];
}

// ToReadOnly
{
  type ToReadOnly<T> = {
    readonly [K in keyof T]: T[K];
  };

  type test1 = ToReadOnly<{ a: 1 }>;

  type cases = [Expect<Equal<test1, Readonly<{ a: 1 }>>>];
}

// ToPartial
{
  type ToPartial<T> = {
    [K in keyof T]?: T[K];
  };

  type test1 = ToPartial<{ a: 1 }>;

  type cases = [Expect<Equal<test1, Partial<{ a: 1 }>>>];
}

// ToMutable
{
  type ToMutable<T> = {
    -readonly [K in keyof T]: T[K]; // -readonly 固定写法去掉 readonly 修饰
  };

  type test1 = ToMutable<{ readonly a: 1 }>;

  type cases = [Expect<Equal<test1, { a: 1 }>>];
}

// ToRequired
{
  type ToRequired<T> = {
    [K in keyof T]-?: T[K]; // -? 固定写法去掉 ? 修饰
  };

  type test1 = ToRequired<{ a?: 1 }>;

  type cases = [Expect<Equal<test1, { a: 1 }>>];
}

// FilterByValueType 可以在构造新索引类型的时候根据值的类型做下过滤：
{
  type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
    // 如果原来索引的值 Obj[Key] 是 ValueType 类型，索引依然为之前的索引 Key，否则索引设置为 never，never 的索引会在生成新的索引类型时被去掉。
    [K in keyof Obj as Obj[K] extends ValueType ? K : never]: Obj[K];
  };

  type test1 = FilterByValueType<{ a: string; b: string; c: number }, string>;

  type cases = [Expect<Equal<test1, { a: string; b: string }>>];
}
