/* eslint-disable no-with */
import { expect, test } from 'vitest';

test('原始值', () => {
  const a = 1;
  const b = 'b';
  const c = true;
  const d = null;
  const e = undefined;
  const f = Symbol('f');
  const g = BigInt(1);
  expect(typeof a).toBe('number');
  expect(typeof b).toBe('string');
  expect(typeof c).toBe('boolean');
  expect(typeof d).toBe('object'); // 设计问题
  // 这里面null比较特殊，打印出来是object，这是由于历史原因所遗留下来的问题。
  // 是来源于JavaScript从第一个版本开始时的一个bug，并且这个bug无法被修复。
  // 因为修复会破坏现有的代码。具体原因是因为不同的对象在底层都表现为二进制，
  // 在JavaScript中二进制前三位都为0的话会被判断为object类型，null的二进制
  // 全部为0，自然前三位也是0，所以执行 typeof 值会返回 object。
  expect(typeof e).toBe('undefined');
  expect(typeof f).toBe('symbol');
  expect(typeof g).toBe('bigint');
});

test('原始值, 按值访问', () => {
  const a = 1;
  let b = a;

  b = 2;

  expect(a).toBe(1); // a 不变
  expect(b).toBe(2);
});

test('复杂值, 按引用访问', () => {
  const foo = { a: 1 };
  const bar = foo;
  bar.a = 2;

  expect(foo.a).toBe(2); // foo.a 变了
  expect(bar.a).toBe(2);
});

test('比较方式', () => {
  {
    const a = 1;
    const b = 1;
    expect(a === b).toBe(true);
  }

  {
    const a = [1];
    const b = [1];
    expect(a === b).toBe(false);
  }
});

test('简单值，不能添加属性', () => {
  const a = 'xxx';
  // a.name = 'yyy'; // TypeError: Cannot create property 'name' on string 'xxx'
  console.log(`a >>`, a);
});

test('包装类型', () => {
  {
    const a = 'hello';
    const b = new String(a);
    expect(a == b).toBe(true);
    expect(a === b).toBe(false);
    expect(a.charAt(0)).toBe(b.charAt(0));
  }
  {
    const a = 1;
    const b = new Number(a);
    expect(a == b).toBe(true);
    expect(a === b).toBe(false);
    expect(a + b).toBe(2);
    expect(a.toFixed(0)).toBe('1');
    expect(b.toFixed(0)).toBe('1');
    expect((1).toFixed(0)).toBe('1');
  }
  {
    const a = true;
    const b = new Boolean(a);

    expect(a == b).toBe(true);
    expect(a === b).toBe(false);
    expect(a.valueOf()).toBe(true);
    expect(b.valueOf()).toBe(true);
  }

  // 为什么普通数据类型也可以调用方法
});

test('获取global', () => {
  console.log(`global >>`, global);
});

test('函数是按值传参的', () => {
  function setName(obj: { name: string }) {
    obj.name = 'xxx';
    obj = { name: 'yyy' };
  }
  const person = { name: 'zzz' };
  console.log(`person >>`, person.name); // zzz
  setName(person);
  console.log(`person >>`, person.name); // xxx
});

test('作用域链增强', () => {
  function getRootPath() {
    const user = {
      name: 1,
    };
    console.log(`user >>`, user);
    // with (user) {
    //   console.log(`user >>`, name);
    // }
  }
  getRootPath();
});
