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
