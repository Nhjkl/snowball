type MyReadonly2<T, K extends keyof T = keyof T> = //  = keyof T 设置参数默认值
  { readonly [P in K]: T[P] } & MyOmit<T, K> //  & 交叉类型（Intersection Types） // https://typescript.bootcss.com/advanced-types.html

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

type MyReadonly2_test1 = MyReadonly2<Todo1>
