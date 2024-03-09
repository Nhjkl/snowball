export function getIndexOf(text: string, match: string) {
  if (!text || !match || match.length > text.length) return -1;

  //
  let i = 0;
  let j = 0;
  const next = getNext(match);

  while (i < text.length && j < match.length) {
    if (text[i] === match[j]) {
      // 如果pattern的第j个字符和text的第i个字符匹配
      i++;
      j++;
    } else if (next[j] === -1) {
      // next[j]的值为-1,说明j位于第一个字符,即j=0
      i++;
    } else {
      j = next[j];
    }
  }

  return j < match.length ? -1 : i - j;
}

export function getNext(match: string) {
  if (match.length == 1) return [-1];

  const next = [-1, 0];
  let i = 2; // 求什么位置上的信息
  let currentIndex = 0;

  while (i < match.length) {
    if (match[i - 1] === match[currentIndex]) {
      next[i++] = ++currentIndex;
    } else if (currentIndex > 0) {
      currentIndex = next[currentIndex];
    } else {
      next[i++] = 0;
    }
  }

  return next;
}
