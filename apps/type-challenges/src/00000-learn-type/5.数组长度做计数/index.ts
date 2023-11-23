import { Equal, Expect } from '@type-challenges/utils';

// 数组长度做计数
{
  type num1 = [unknown]['length'];
  type num2 = [unknown, unknown]['length'];
  type num3 = [unknown, unknown, unknown]['length'];

  type cases = [Expect<Equal<num1, 1>>, Expect<Equal<num2, 2>>, Expect<Equal<num3, 3>>];
  // TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length
  // 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。
}

type buildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> = Arr['length'] extends Length
  ? Arr
  : buildArray<Length, Ele, [Ele, ...Arr]>;

// Add
type Add<X extends number, Y extends number> = [...buildArray<X>, ...buildArray<Y>]['length'];
{
  type arr1 = buildArray<3>;

  type num1 = Add<2, 2>;
  type num2 = Add<5, 2>;
  type num3 = Add<999, 999>;

  type cases = [Expect<Equal<num1, 4>>, Expect<Equal<num2, 7>>, Expect<Equal<num3, 1998>>];
}

// Subtract
type Subtract<X extends number, Y extends number> = buildArray<X> extends [...arr1: buildArray<Y>, ...arr2: infer Rest]
  ? Rest['length']
  : never;
{
  type num1 = Subtract<5, 2>;
  type num2 = Subtract<100, 2>;

  type cases = [Expect<Equal<num1, 3>>, Expect<Equal<num2, 98>>];
}

// Multiply
type Multiply<X extends number, Y extends number, Result extends number = 0> = Y extends 0
  ? Result
  : Multiply<X, Subtract<Y, 1>, Add<X, Result> & number>;
{
  type num1 = Multiply<2, 3>;
  type num2 = Multiply<3, 222>;
  type cases = [Expect<Equal<num1, 6>>, Expect<Equal<num2, 666>>];
}

// Divide
type Divide<X extends number, Y extends number, Result extends number = 0> = X extends 0
  ? Result
  : Divide<Subtract<X, Y>, Y, Add<Result, 1> & number>;

{
  type num1 = Divide<6, 2>;
  type num2 = Divide<66, 3>;

  type cases = [Expect<Equal<num1, 3>>, Expect<Equal<num2, 22>>];
}

// StrLen
type StrLen<S extends string, CountArr extends unknown[] = []> = S extends `${string}${infer Rest}`
  ? StrLen<Rest, [unknown, ...CountArr]> // 每次递归往CountArr里放一个元素
  : CountArr['length'];

{
  type num1 = StrLen<'abc'>;
  type num2 = StrLen<'abcde'>;

  type cases = [Expect<Equal<num1, 3>>, Expect<Equal<num2, 5>>];
}

// GreaterThan
// 类型参数 Num1 和 Num2 是待比较的两个数。
// 类型参数 CountArr 是计数用的，会不断累加，默认值是 [] 代表从 0 开始。
// 如果 Num1 extends Num2 成立，代表相等，直接返回 false。
// 否则判断计数数组的长度，如果先到了 Num2，那么就是 Num1 大，返回 true。
// 反之，如果先到了 Num1，那么就是 Num2 大，返回 false。
// 如果都没到就往计数数组 CountArr 中放入一个元素，继续递归。
// 这样就实现了数值比较。
type GreaterThan<Num1 extends number, Num2 extends number, CountArr extends unknown[] = []> = Num1 extends Num2
  ? false
  : CountArr['length'] extends Num2
    ? true
    : CountArr['length'] extends Num1
      ? false
      : GreaterThan<Num1, Num2, [unknown, ...CountArr]>;

{
  type num1 = GreaterThan<2, 1>;
  type num2 = GreaterThan<2, 2>;
  type num3 = GreaterThan<2, 3>;

  type cases = [Expect<Equal<num1, true>>, Expect<Equal<num2, false>>, Expect<Equal<num3, false>>];
}

// Fibonacci
// 类型参数 PrevArr 是代表之前的累加值的数组。类型参数 CurrentArr 是代表当前数值的数组。
// 类型参数 IndexArr 用于记录 index，每次递归加一，默认值是 []，代表从 0 开始。
// 类型参数 Num 代表求数列的第几个数。
// 判断当前 index 也就是 IndexArr['length'] 是否到了 Num，到了就返回当前的数值 CurrentArr['length']。
// 否则求出当前 index 对应的数值，用之前的数加上当前的数 [...PrevArr, ... CurrentArr]。
// 然后继续递归，index + 1，也就是 [...IndexArr, unknown]。
// 这就是递归计算 Fibinacci 数列的数的过程。
type FibonacciLoop<
  PrevArr extends unknown[],
  CurrentArr extends unknown[],
  IndexArr extends unknown[] = [],
  Num extends number = 1,
> = IndexArr['length'] extends Num
  ? CurrentArr['length']
  : FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num>;

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;

{
  // Fibonacci 数列是 1、1、2、3、5、8、13、21、34、…… 这样的数列，有当前的数是前两个数的和的规律。
  type num1 = Fibonacci<1>;
  type num2 = Fibonacci<8>;
}
