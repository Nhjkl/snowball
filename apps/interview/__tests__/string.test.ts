import { expect, test } from 'vitest';

test('在一个字符串中找到，字符“ab”', () => {
  function find_ab(str: string): boolean {
    for (let i = 0; i < str.length - 1; i++) {
      if (`${str.charAt(i)}${str.charAt(i + 1)}` === 'ab') {
        return true;
      }
    }
    return false;
  }

  function find_target(str: string, targer: string) {
    for (let i = 0; i < str.length - 1; i++) {
      let tempTarget = '';
      for (let j = i; j < i + targer.length; j++) {
        tempTarget += str.charAt(j);
      }
      if (tempTarget === targer) {
        return true;
      }
    }
    return false;
  }

  function find_ab2(str: string): boolean {
    let foundA = false;

    for (const c of str) {
      if (c === 'a') {
        foundA = true;
      } else if (foundA && c === 'b') {
        return true;
      } else {
        foundA = false;
      }
    }

    return false;
  }

  function find_abcd(str: string): boolean {
    let foundA = false;
    let foundB = false;
    let foundC = false;

    for (const c of str) {
      if (c === 'a') {
        foundA = true;
      } else if (foundA && c === 'b') {
        foundB = true;
      } else if (foundB && c === 'c') {
        foundC = true;
      } else if (foundC && c === 'd') {
        return true;
      } else {
        foundA = false;
        foundB = false;
        foundC = false;
      }
    }

    return false;
  }

  expect(find_ab('fdsfdsbahaeafdsab')).toBe(true);
  expect(find_ab2('fdsfdsbahaeafdsab')).toBe(true);
  expect(find_target('fdsfdsb abcdefg haeafdsab', 'abcdefg')).toBe(true);
  expect(find_abcd('fdsfdsb abcdefg haeafdsab')).toBe(true);
});
