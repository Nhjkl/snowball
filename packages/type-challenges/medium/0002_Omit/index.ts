type MyOmit<T, K extends keyof T> = {
  // [P in keyof T as P extends K ? never : P]: T[P]
  [P in MyExclude<keyof T, K>] : T[P]
}

type MyOmit1<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>

interface Todo {
  title: string
  description: string
  completed: boolean
}

type MuOmit_test1 = MyOmit1<Todo, 'description'>
