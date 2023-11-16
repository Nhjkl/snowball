import { expect, test } from 'vitest';

test('for 循环', () => {
  function forLoop(num: number) {
    let result: number = 0;
    for (let i = 1; i <= num; i++) {
      result += i;
    }
    return result;
  }

  expect(forLoop(2)).toBe(3);
  expect(forLoop(100)).toBe(((1 + 100) * 100) / 2);
});

test('while 循环', () => {
  function whileLoop(num: number) {
    let result: number = 0;
    let index: number = 1;

    while (index <= num) {
      result += index;
      index++;
    }

    return result;
  }

  expect(whileLoop(2)).toBe(3);
  expect(whileLoop(100)).toBe(((1 + 100) * 100) / 2);
});

/**
 * while 循环比 for 循环的自由度更高。在 while 循环中，我们可以自由设计条件变量的初始化和更新步骤。
 * 例如在以下代码中，条件变量 每轮进行了两次更新，这种情况就不太方便用 for 循环实现。
 */
test('while 循环（两次更新', () => {
  function whileLoop(num: number) {
    let result: number = 0;
    let index: number = 1;

    // 循环求和 1, 4, ...
    while (index <= num) {
      console.log(`index >>`, index);
      result += index;
      index++;
      index *= 2;
    }
    return result;
  }

  expect(whileLoop(100)).toBe(177);
});

test('嵌套循环', () => {
  function nestedLoop(num: number) {
    let result: string = '';

    for (let i = 1; i <= num; i++) {
      for (let j = 1; j <= num; j++) {
        result += `(${i}, ${j})\n`;
      }
    }

    // console.log(result);

    return result;
  }
  nestedLoop(10);
});
