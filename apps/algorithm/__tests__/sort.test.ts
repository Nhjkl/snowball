import { test, expect } from 'vitest';

function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function selectionSort(arr: number[]) {
  if (arr.length < 2) return;
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }
}

function dubbleSort(arr: number[]) {
  if (arr.length < 2) return;

  for (let end = arr.length - 1; end > 0; end--) {
    for (let i = 0; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
      }
    }
  }
}

function insertionSort(arr: number[]) {
  if (arr.length < 2) return;
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      swap(arr, j, j - 1);
      j--;
    }
  }
}

test('选择排序', () => {
  const arr = [3, 5, 2, 1, 4];
  selectionSort(arr);
  expect(arr).toEqual([1, 2, 3, 4, 5]);
});

test('冒泡排序', () => {
  const arr = [3, 5, 2, 1, 4];
  dubbleSort(arr);
  expect(arr).toEqual([1, 2, 3, 4, 5]);
});

test('插入排序', () => {
  const arr = [3, 5, 2, 1, 4];
  insertionSort(arr);
  expect(arr).toEqual([1, 2, 3, 4, 5]);
});
