type MyOmit<T, K extends keyof T> = {
  // [P in keyof T as P extends K ? never : P]: T[P]
  [P in MyExclude<keyof T, K>] : T[P]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

type MuOmit_test1 = MyOmit<Todo, 'description'>
