import { test } from 'vitest';
import { createFetch } from '../src/fetch';

test('fetch abort', async () => {
  const fetch = createFetch(1000);
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    console.log(`res >>`, res);
  } catch (error) {
    console.log(`error >>`, error);
  }
});
