/* eslint-disable no-inner-declarations */
import { Equal, Expect } from '@type-challenges/utils';

class Person {
  name: string = 'sean';
  gender: number = 1;
}

interface PersonConstructor {
  new (name: string): Person;
}

// Parameters 用于提取函数类型的参数类型。
{
  type testFun = (a: string) => void;

  type test1 = Parameters<testFun>;

  type MyParameters<T extends (...args: any) => any> = T extends (
    ...args: infer P
  ) => any
    ? P
    : never;

  type test2 = MyParameters<testFun>;

  type cases = [Expect<Equal<test1, test2>>];
}

// ReturnType 用于提取函数类型的返回值类型。
{
  type testFun = (a: string) => string;

  type test1 = ReturnType<testFun>;

  type MyReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
  ) => infer R
    ? R
    : never;

  type test2 = MyReturnType<testFun>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Parameters 用于提取函数参数的类型，而 ConstructorParameters 用于提取构造器参数的类型。
{
  type test1 = ConstructorParameters<PersonConstructor>;

  type MyConstructorParameters<T extends abstract new (...args: any) => any> =
    T extends abstract new (...args: infer P) => any ? P : never;

  type test2 = MyConstructorParameters<PersonConstructor>;

  type cases = [Expect<Equal<test1, test2>>];
}

// 提取了构造器参数的类型，自然也可以提取构造器返回值的类型，就是 InstanceType。
{
  type test1 = InstanceType<PersonConstructor>;

  type MyInstanceType<T extends abstract new (...args: any) => any> =
    T extends abstract new (...args: any) => infer R ? R : any;

  type test2 = MyInstanceType<PersonConstructor>;

  type cases = [Expect<Equal<test1, test2>>];
}

// ThisParameterType
{
  function hello(this: Person) {
    return this.name;
  }

  type test1 = ThisParameterType<typeof hello>;

  type MyThisParameterType<T> = T extends (this: infer F, ...args: any) => any
    ? F
    : unknown;

  type test2 = MyThisParameterType<typeof hello>;

  type cases = [Expect<Equal<test1, test2>>];
}

// OmitThisParameter
{
  function say(this: Person, age: number) {
    return this.name + ' ' + age;
  }

  type test1 = OmitThisParameter<typeof say>;

  type MyOmitThisParameter<T> = unknown extends ThisParameterType<T>
    ? T
    : T extends (...args: infer A) => infer R
      ? (...args: A) => R
      : T;
  type test2 = MyOmitThisParameter<typeof say>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Partial 索引类型可以通过映射类型的语法做修改，比如把索引变为可选。
{
  type test1 = Partial<Person>;

  type MyPartial<T> = {
    [Key in keyof T]?: T[Key];
  };

  type test2 = MyPartial<Person>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Required可以把索引变为可选，也同样可以去掉可选，也就是 Required 类型：
{
  type test = Partial<Person>;
  type test1 = Required<test>;

  type MyRequired<T> = {
    [Key in keyof T]-?: T[Key];
  };

  type test2 = MyRequired<test>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Readonly
{
  type test1 = Readonly<Person>;

  type MyReadonly<T> = {
    readonly [Key in keyof T]: T[Key];
  };

  type test2 = MyReadonly<test1>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Pick 映射类型的语法用于构造新的索引类型，在构造的过程中可以对索引和值做一些修改或过滤。
{
  type test1 = Pick<Person, 'name'>;

  type MyPick<T, K extends keyof T> = {
    [Key in K]: T[Key];
  };

  type test2 = MyPick<Person, 'name'>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Record 用于创建索引类型，传入 key 和值的类型：
{
  type test1 = Record<string, number>;

  type MyRecord<K extends keyof any, T> = {
    [P in K]: T;
  };

  type test2 = MyRecord<string, number>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Exclude 当想从一个联合类型中去掉一部分类型时，可以用 Exclude 类型：
{
  type test1 = Exclude<'a' | 'b' | 'c', 'a'>;

  type MyExclude<T, U> = T extends U ? never : T;

  type test2 = MyExclude<'a' | 'b' | 'c', 'a'>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Extract 可以过滤掉，自然也可以保留，Exclude 反过来就是 Extract，也就是取交集：
{
  type test1 = Extract<'a' | 'b' | 'c', 'a'>;
  type MyExtract<T, U> = T extends U ? T : never;
  type test2 = MyExtract<'a' | 'b' | 'c', 'a'>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Omit
// 我们知道了 Pick 可以取出索引类型的一部分索引构造成新的索引类型，那反过来就是去掉这部分索引构造成新的索引类型。
{
  type test1 = Omit<Person, 'name'>;
  type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  type test2 = MyOmit<Person, 'name'>;
  type cases = [Expect<Equal<test1, test2>>];
}

// Awaited
{
  type test1 = Awaited<Promise<string>>;

  type MyAwaited<T> = T extends null | undefined
    ? T
    : T extends object & { then(onfulfilled: infer F): any }
      ? F extends (value: infer V, ...args: any) => any
        ? MyAwaited<V>
        : never
      : T;

  type test2 = MyAwaited<Promise<string>>;

  type cases = [Expect<Equal<test1, test2>>];
}

// NonNullable 就是用于判断是否为非空类型，也就是不是 null 或者 undefined 的类型的
{
  type test1 = NonNullable<string | number | null | undefined>;
  type MyNonNullable<T> = T extends null | undefined ? never : T;
  type test2 = MyNonNullable<string | number | null | undefined>;

  type cases = [Expect<Equal<test1, test2>>];
}

// Uppercase、Lowercase、Capitalize、Uncapitalize
// 这四个类型是分别实现大写、小写、首字母大写、去掉首字母大写的。
// 它们的源码时这样的：
{
  type Uppercase<S extends string> = intrinsic;

  type Lowercase<S extends string> = intrinsic;

  type Capitalize<S extends string> = intrinsic;

  type Uncapitalize<S extends string> = intrinsic;
}

// 这个 intrinsic 是固有的意思，就像 js 里面的有的方法打印会显示 [native code] 一样。
// 这部分类型不是在 ts 里实现的，而是编译过程中由 js 实现的。
