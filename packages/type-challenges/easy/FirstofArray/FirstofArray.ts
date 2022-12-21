// 判读数组是否为空 T extends []
type First<T extends any[]> = T extends [] ? never : T[0];

// 1. 判断入参是否有值，有返回第一项，没有返回never
function first(arrs: any[]) {
  if (arrs && arrs.length) {
    return arrs[0];
  } else {
    return 'never'
  }
}
