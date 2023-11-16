import { test, expect } from 'vitest';

test('初始化数组', () => {
  const arr: number[] = new Array(3).fill(0);
  const nums: number[] = [1, 2, 4, 5];
  console.log(`arr >>`, arr);
  console.log(`nums >>`, nums);
});

test('随机访问元素', () => {
  const nums: number[] = [1, 2, 4, 5, 10, 3, 4, 5, 6, 74353, 7657];

  function randomAccess(nums: number[]): number {
    return nums[Math.floor(Math.random() * nums.length)];
  }

  const res = randomAccess(nums);
  console.log(`res >>`, res);
});

test('在数组的索引 index 处插入元素 num', () => {
  const nums: number[] = [1, 2, 4, 5, 10];

  /* 在数组的索引 index 处插入元素 num */
  function insert(nums: number[], num: number, index: number): void {
    // 把索引 index 以及之后的所有元素向后移动一位
    for (let i = nums.length - 1; i > index; i--) {
      nums[i] = nums[i - 1];
    }
    // 将 num 赋给 index 处元素
    nums[index] = num;
  }

  insert(nums, 90, 2);

  console.log(`nums >>`, nums);
});

test('删除索引 index 处元素', () => {
  const nums: number[] = [1, 2, 4, 5, 10];

  function remove(nums: number[], index: number): void {
    for (let i = index; i < nums.length - 1; i++) {
      nums[i] = nums[i + 1];
    }
    nums.pop();
  }

  remove(nums, 2);

  expect(nums).toEqual([1, 2, 5, 10]);
});

test('遍历数组', () => {
  const nums: number[] = [1, 2, 4, 5, 10];

  function traverse(nums: number[]): void {
    // 通过索引遍历
    for (let i = 0; i < nums.length; i++) {
      console.log(nums[i]);
    }

    // 直接遍历
    for (const num of nums) {
      console.log(num);
    }
  }

  traverse(nums);
});

test('在数组中查找指定元素', () => {
  const nums: number[] = [1, 2, 4, 5, 10];

  function find(nums: number[], target: number): number {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === target) {
        return i;
      }
    }
    return -1;
  }

  expect(find(nums, 4)).toBe(2);
  expect(find(nums, 100)).toBe(-1);
});

test('扩容数组', () => {
  const nums: number[] = [1, 2, 4, 5, 10];
  /* 扩展数组长度 */
  // 请注意，TypeScript 的 Array 是动态数组，可以直接扩展
  // 为了方便学习，本函数将 Array 看作是长度不可变的数组
  function extend(nums: number[], enlarge: number): number[] {
    // 初始化一个扩展长度后的数组
    const res = new Array(nums.length + enlarge).fill(0);
    // 将原数组中的所有元素复制到新数组
    for (let i = 0; i < nums.length; i++) {
      res[i] = nums[i];
    }
    // 返回扩展后的新数组
    return res;
  }

  const res = extend(nums, 3);

  expect(res).toEqual([1, 2, 4, 5, 10, 0, 0, 0]);
});
