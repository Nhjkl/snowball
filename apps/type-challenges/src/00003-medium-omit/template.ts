type MyOmit<T, K extends keyof T> = {
  // [Key in Exclude<keyof T, K>]: T[Key];
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

type test = keyof { a: 1; b: 1 };
