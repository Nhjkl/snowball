/**
 * 比较两个字符串的大小
 * 两个字符串都是用-连接的数字 如：1-2-33-41-5
 * 比较方式是从左到右比较每个数字的大小，遇到相等的数字继续
 * 往后比较遇到不同的数字直接得出比较结果
 * str1 > str2 return 1
 * str1 < str2 return -1
 * str1 === str2 return 0
 */
function* walk(str: string) {
  let part = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '-') {
      yield Number(part);
      part = '';
    } else {
      part += str[i];
    }
  }
  if (part) {
    yield Number(part);
  }
}

export function compare(str1: string, str2: string) {
  const it1 = walk(str1);
  const it2 = walk(str2);
  for (;;) {
    // 取出str1下一个数字
    const n1 = it1.next();
    // 取出str2下一个数字
    const n2 = it2.next();

    if (n1.done && n2.done) {
      return 0;
    } else if (n1.done) {
      return -1;
    } else if (n2.done) {
      return 1;
    } else if (n1.value > n2.value) {
      return 1;
    } else if (n1.value < n2.value) {
      return -1;
    }
  }
}

export function _compare(str1: string, str2: string) {
  const strs1 = str1.split('-');
  const strs2 = str2.split('-');
  let index = 0;
  for (;;) {
    const num1 = Number(strs1[index]);
    const num2 = Number(strs2[index]);
    index++;
    if (isNaN(num1) && isNaN(num2)) {
      return 0;
    } else if (isNaN(num1)) {
      return -1;
    } else if (isNaN(num2)) {
      return 1;
    } else if (num1 > num2) {
      return 1;
    } else if (num1 < num1) {
      return -1;
    }
  }
}
