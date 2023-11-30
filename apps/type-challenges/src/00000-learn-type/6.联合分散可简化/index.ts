// 联合分散可简化
// 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，
// TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，
// 这种语法叫做分布式条件类型。

import { Equal, Expect } from '@type-challenges/utils';

{
  type UppercaseA<Item extends string> = Item extends 'a'
    ? Uppercase<Item>
    : Item;

  type test1 = UppercaseA<'a' | 'b' | 'C'>;

  type cases = [Expect<Equal<UppercaseA<'a' | 'b'>, 'A' | 'b'>>];
}

{
  type Union = 'a' | 'b' | 'c';

  type str = `${Union}~~`;

  type cases = [Expect<Equal<str, 'a~~' | 'b~~' | 'c~~'>>];
}

// 这样确实是简化了类型编程逻辑的，不需要递归提取每个元素再处理。
// TypeScript 之所以这样处理联合类型也很容易理解，因为联合类型的每个元素都是互不相关的，
// 不像数组、索引、字符串那样元素之间是有关系的。所以设计成了每一个单独处理，最后合并。

// CamelcaseUnion
{
  type Camelcase<Str extends string> =
    Str extends `${infer Left}_${infer Right}${infer Rest}`
      ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
      : Str;

  type test = Camelcase<'one_two_three'>;

  type cases = [Expect<Equal<test, 'oneTwoThree'>>];

  type CamelcaseArr<Arr extends unknown[]> = Arr extends [
    infer Left,
    ...infer Rest,
  ]
    ? [Camelcase<Left & string>, ...CamelcaseArr<Rest>]
    : [];

  type test2 = CamelcaseArr<['a_b', 'b_c_d', 'c_cc_dd']>;

  type cases2 = [Expect<Equal<test2, ['aB', 'bCD', 'cCcDd']>>];

  // 对联合类型的处理和对单个类型的处理没什么区别，TypeScript 会把每个单独的类型拆开传入。
  // 不需要像数组类型那样需要递归提取每个元素做处理。
  // 确实简化了很多，好像都是优点？
  // 也不全是，其实这样处理也增加了一些认知成本，不信我们再来看个例子： IsUnion
  type CamelcaseUnion<Item extends string> =
    Item extends `${infer Left}_${infer Right}${infer Rest}`
      ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
      : Item;

  type test3 = CamelcaseUnion<'aa_bb_cc' | 'bb_cc_dd'>;

  type cases3 = [Expect<Equal<test3, 'aaBbCc' | 'bbCcDd'>>];
}

// IsUnion
{
  type IsUnion<A, B extends A = A> = A extends A
    ? [B] extends [A]
      ? false
      : true
    : never;

  type test1 = IsUnion<1 | 2 | 3 | 4>;
  type test2 = IsUnion<[1 | 2 | 3]>;
  type test3 = IsUnion<[1 | 2 | 3]>;
}
// 是不是在心里会问：什么鬼？这段逻辑是啥？
// 这就是分布式条件类型带来的认知成本。
// 我们先来看这样一个类型：
{
  type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;
  /* A 和 B 都是同一个联合类型，为啥值还不一样呢？
   * 因为条件类型中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会。
   * 所以 A 是 'a' 的时候，B 是 'a' | 'b' | 'c'， A 是 'b' 的时候，B 是 'a' | 'b' | 'c'。。。
   */
  type TestUnionResult = TestUnion<'a' | 'b' | 'c'>;

  type casee = [
    Expect<
      Equal<
        TestUnionResult,
        | {
            a: 'a';
            b: 'a' | 'b' | 'c';
          }
        | {
            a: 'b';
            b: 'a' | 'b' | 'c';
          }
        | {
            a: 'c';
            b: 'a' | 'b' | 'c';
          }
      >
    >,
  ];

  /**
   * 类型参数 A、B 是待判断的联合类型，B 默认值为 A，也就是同一个类型。
   * A extends A 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。
   * [B] extends [A] 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。
   * B 是联合类型整体，而 A 是单个类型，自然不成立，**而其它类型没有这种特殊处理**，A 和 B 都是同一个，怎么判断都成立。
   * 利用这个特点就可以判断出是否是联合类型。
   * 其中有两个点比较困惑，我们重点记一下：
   * NOTE: 当 A 是联合类型时：
   * A extends A 这种写法是为了触发分布式条件类型，让每个类型单独传入处理的，没别的意义。
   * A extends A 和 [A] extends [A] 是不同的处理，前者是单个类型和整个类型做判断，后者两边都是整个联合类型，因为只有 extends 左边直接是类型参数才会触发分布式条件类型。
   * 理解了这两点，分布式条件类型就算掌握了。
   * ```
   *  type test1 = IsUnion<1 | 2 | 3 | 4>; // true
   * ```
   */
  type IsUnion<A, B = A> = A extends A
    ? [B] extends [A]
      ? false
      : true
    : never;
}

// BEM
// bem 是 css 命名规范，用 block__element--modifier 的形式来描述某个区块下面的某个元素的某个状态的样式。
{
  type Union = ['a', 'b'][number]; // NOTE: 数组转联合类型

  // 类型参数 Block、Element、Modifiers 分别是 bem 规范的三部分，其中 Element 和 Modifiers 都可能多个，约束为 string[]。
  // 构造一个字符串类型，其中 Element 和 Modifiers 通过索引访问来变为联合类型。
  type BEM<
    Block extends string,
    Element extends string[],
    Modifier extends string[],
  > = `${Block}__${Element[number]}--${Modifier[number]}`;

  type bemResult = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>;

  // 可以看到，用好了联合类型，确实能简化类型编程逻辑。
  type cases = [
    Expect<
      Equal<
        bemResult,
        | 'guang__aaa--warning'
        | 'guang__aaa--success'
        | 'guang__bbb--warning'
        | 'guang__bbb--success'
      >
    >,
  ];
}

// AllCombinations
// 希望传入 'A' | 'B' 的时候，能够返回所有的组合： 'A' | 'B' | 'BA' | 'AB'。
{
  type Combination<A extends string, B extends string> =
    | A
    | B
    | `${A}${B}`
    | `${B}${A}`;

  type AllCombinations<A extends string, B extends string = A> = A extends A
    ? Combination<A, AllCombinations<Exclude<B, A>>>
    : never;

  type test1 = AllCombinations<'A' | 'B' | 'C'>;
}
