import fetch, { RequestInit } from 'node-fetch';

export function createFetch(timeout: number) {
  return function (url: string, options?: RequestInit) {
    if (timeout) {
      const controller = new AbortController();
      options = { ...options, signal: controller.signal };
      setTimeout(() => {
        controller.abort();
      }, timeout);
    }
    return fetch(url, options);
  };
}

export async function loadNovel() {
  const url = 'https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt';
  const res = await fetch(url);

  res.body &&
    res.body.on('readable', () => {
      let chunk: string | Buffer;
      while (res.body && (chunk = res.body.read()) !== null) {
        console.log(`chunk >>`, chunk.toString());
      }
    });
}
