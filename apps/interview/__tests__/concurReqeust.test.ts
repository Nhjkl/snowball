import { expect, test } from 'vitest';
import { concurReqeust } from '../src/concurRequest';

test('concurReqeust returns correct length', async () => {
  const urls = [];
  for (let i = 0; i < 2; i++) {
    urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`);
  }
  const res = await concurReqeust(urls, 3);
  res.map((item) => {
    console.log(`item >>`, item);
    return item;
  });
  expect(res.length).toBe(2);
});
