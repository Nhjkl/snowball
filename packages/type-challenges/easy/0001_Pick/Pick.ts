// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html
type MyPick<Obj, Keys extends keyof Obj> = {
  [K in Keys]: Obj[K]
}
/*
1. 返回一个对象
2. 循环keys
3. 对象赋值
4. 检测keys中的key，是obj的属性
*/
const _MyPick = (obj: any, keys: string[]) => {
  let _obj: any = {};
  keys.forEach(key => {
    if (key in obj) {
      _obj[key] = obj[key];
    }
  });
  return _obj;
};
