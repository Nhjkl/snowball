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
        console.log(`url >> start`, url);
        const res = await fetch(url);
        results[i] = res;
      } catch (e) {
        results[i] = e;
      } finally {
        count++;
        console.log(`url >> end`, url);
        if (count === urls.length) {
          console.log(
            `results >>`,
            results.map((res) => (res ? res.status : res)),
          );
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

{
  const urls = [];
  for (let i = 0; i < 10; i++) {
    urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`);
  }
  concurReqeust(urls, 3);
}
