/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, test } from 'vitest';

test('对象属性顺序测试', () => {
  console.log(`对象属性测试 >>`, 'x');

  const obj = {
    0: 0,
    a: 0,
    c: 0,
    b: 0,
    1: 0,
    2: 0,
  };

  expect(JSON.stringify(obj)).toBe(`{"0":0,"1":0,"2":0,"a":0,"c":0,"b":0}`); // 对象属性排序，会把数字类的属性提升到最前面从小到大排列
});

test('对象属性面试题', () => {
  const obj: any = {
    a: 0,
  };

  obj['1'] = 0; // { 1: 0, a: 0 }
  obj[++obj.a] = obj.a++; // { 1: 1, a: 2 }
  const values: any = Object.values(obj); // [1, 2]
  obj[values[1]] = obj.a; // { 1: 1, 2: 2 a: 2 }

  expect(obj.a).toBe(2);
  expect(obj['1']).toBe(1);
  expect(obj['2']).toBe(2);
});
