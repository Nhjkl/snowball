/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, test } from 'vitest';

test('Count character frequency', () => {
  const str = 'dsfdsfdddsdfsee';

  function count(str: string) {
    const result: any = {};
    for (const c of str) {
      if (result[c]) {
        result[c]++;
      } else {
        result[c] = 1;
      }
    }
    return result;
  }

  function count2(str: string) {
    return [...str].reduce((r, c) => {
      r[c]++ || (r[c] = 1);
      return r;
    }, {} as any);
  }

  const res = count(str);
  const res2 = count2(str);

  expect(res).toEqual(res2);
});
