import { writeFile, githubRequest, isExist } from '@snowball/utils';

/**
 * 获取题目列表
 */
async function getQuestions() {
  const baseUrl = 'https://github.com/type-challenges/type-challenges';
  const res = await githubRequest(`${baseUrl}/tree-commit-info/main/questions`);
  const body = await res.json();

  const options = Object.keys(body || {}).join('\n');

  writeFile(`./questions`, options);
}

/**
 * download 题目文件
 * @param [name='00004-easy-pick']
 */
async function getQuestionFile(name: string = '00004-easy-pick') {
  const baseUrl = 'https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions';
  const templateFile = `${baseUrl}/${name}/template.ts`;
  const testCasesFile = `${baseUrl}/${name}/test-cases.ts`;

  if (!isExist(templateFile)) {
    const templateRes = await githubRequest(templateFile);
    const templateBody = await templateRes.text();
    writeFile(`./src/${name}/template.ts`, templateBody);
  }

  if (!isExist(testCasesFile)) {
    const testCasesRes = await githubRequest(testCasesFile);
    const testCasesBody = await testCasesRes.text();
    writeFile(`./src/${name}/test-cases.ts`, testCasesBody);
  }
}

// 获取命令行参数
const args = process.argv.slice(2); // 从第三个元素开始是传递给脚本的参数

if (args.length) {
  console.log('Command line arguments:', args);
  const name = args[0];
  if (name) {
    getQuestionFile(name);
  }
}
