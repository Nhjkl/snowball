// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
// string,number,boolean,object
// null,undefined // null 与 undefined 以外，余下的类型基本上可以完全对应到 JavaScript 中的数据类型概念，因此这里我们只对 null 与 undefined 展开介绍。
// symbol,bitint

{
  const name: string = 'lx';
  const age: number = 32;
  const single: boolean = false;
  const undef: undefined = undefined; // 没有值
  const nul: null = null; // 有值但是为空
  const obj: object = {};
  const symbolVar: symbol = Symbol('unique'); // es2015 or later
  const bigIniVar1: bigint = 9007199254740991n; // es2020 or later
  const bigIniVar2: bigint = BigInt(9007199254740991); // es2020 or later
}

{
  const people: [name: string, age: number, male: boolean] = [
    'liuxian',
    32,
    true,
  ];

  // const [name, age, male, other] = people

  type people = typeof people[number];
}

// boxed types
{
  const tmp9: String = undefined;
  const tmp10: String = null;
  const tmp11: String = void 0;
  const tmp12: String = 'linbudu';

  // 以下不成立，因为不是字符串类型的拆箱类型
  // const tmp13: String = 599; // X
  // const tmp14: String = { name: 'linbudu' }; // X
  // const tmp15: String = () => {}; // X
  // const tmp16: String = []; // X}

  // 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
  const tmp1: Object = undefined;
  const tmp2: Object = null;
  const tmp3: Object = void 0;

  const tmp4: Object = 'linbudu';
  const tmp5: Object = 599;
  const tmp6: Object = { name: 'linbudu' };
  const tmp7: Object = () => {};
  const tmp8: Object = [];
}

// unboxed types
{
  const tmp17: object = undefined;
  const tmp18: object = null;
  const tmp19: object = void 0;

  const tmp20: object = 'linbudu'; // X 不成立，值为原始类型
  const tmp21: object = 599; // X 不成立，值为原始类型

  const tmp22: object = { name: 'linbudu' };
  const tmp23: object = () => {};
  const tmp24: object = [];
}
