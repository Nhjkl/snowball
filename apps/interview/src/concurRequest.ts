import fetch from 'node-fetch';

/**
 * 并发请求
 * @param urls 请求地
 * @param maxNum 最大并发数
 */
export function concurReqeust(urls: string[], maxNum: number) {
  return new Promise<unknown[]>((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }

    const results: unknown[] = [];
    let index = 0;
    let count = 0; // 当前请求完成数量

    async function request() {
      if (index === urls.length) return;
      const i = index;
      const url = urls[index];
      index++;
      try {
        const res = await fetch(url);
        if (res.status === 200) {
          results[i] = {
            status: res.status,
            data: await res.json(),
          };
        } else {
          results[i] = {
            status: res.status,
          };
        }
      } catch (e) {
        results[i] = e;
      } finally {
        count++;
        if (count === urls.length) {
          resolve(results);
        }
        request();
      }
    }

    const times = Math.min(urls.length, maxNum);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}
