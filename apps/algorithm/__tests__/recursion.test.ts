// https://www.hello-algo.com/chapter_computational_complexity/iteration_and_recursion/#3
import { expect, test } from 'vitest';

test('递归', () => {
  function recursion(n: number): number {
    if (n <= 1) return 1;
    return n + recursion(n - 1);
  }
  const res = recursion(2);
  expect(res).toBe(3);
});

test('尾递归 tail recursion', () => {
  function tailRecursion(n: number, res: number): number {
    // 终止条件
    if (n === 0) return res;

    return tailRecursion(n - 1, n + res);
  }

  const res = tailRecursion(2, 0);
  expect(res).toBe(3);
});

test('斐波那契数列：递归 ', () => {
  // 给定一个斐波那契数列0,1,1,2,3,5,8,13,... ，求该数列的第 个数字。
  /* 斐波那契数列：递归 */
  function fib(n: number): number {
    // 终止条件 f(1) = 0, f(2) = 1
    if (n === 1 || n === 2) return n - 1;
    // 递归调用 f(n) = f(n-1) + f(n-2)
    const res = fib(n - 1) + fib(n - 2);
    // 返回结果 f(n)
    return res;
  }

  expect(fib(4)).toBe(2);
  expect(fib(5)).toBe(3);
  expect(fib(1)).toBe(0);
  expect(fib(2)).toBe(1);
  expect(fib(3)).toBe(1);
});

test('使用迭代模拟递归', () => {
  /* 使用迭代模拟递归 */
  function forLoopRecur(n: number): number {
    // 使用一个显式的栈来模拟系统调用栈
    const stack: number[] = [];
    let res: number = 0;
    // 递：递归调用
    for (let i = 1; i <= n; i++) {
      // 通过“入栈操作”模拟“递”
      stack.push(i);
    }
    // 归：返回结果
    while (stack.length) {
      // 通过“出栈操作”模拟“归”
      res += stack.pop() ?? 0;
    }
    // res = 1+2+3+...+n
    return res;
  }

  const res = forLoopRecur(10);
  expect(res).toBe(55);
});
