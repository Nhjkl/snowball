import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export const add = (a: number, b: number) => {
  return a + b;
};

export function writeFile(filePath: string, content: string) {
  if (isExist(filePath)) {
    console.log(`${filePath}文件已存在,不再创建`);
  } else {
    const directory = path.dirname(filePath);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(filePath, content);
  }
}

export function isExist(filePath: string) {
  return fs.existsSync(filePath);
}

export function githubRequest(
  url: string,
  options?: { method: 'GET' | 'POST' },
) {
  return fetch(url, {
    method: options ? options.method : 'GET',
    headers: {
      accept: 'application/json',
    },
    body: null,
  });
}
