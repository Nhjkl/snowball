import type { Equal, Expect } from '@type-challenges/utils';
{
  type cases = [
    Expect<Equal<K1, 'name' | 'age'>>,
    Expect<Equal<K2, keyof []>>,
    Expect<Equal<K3, keyof { [k: string]: number }>>,
    Expect<Equal<K4, K1>>,

    Expect<Equal<P1, string>>,
    Expect<Equal<P2, number>>,
    Expect<Equal<P3, number | string>>,
    Expect<Equal<P4, P1[]['push']>>,
    Expect<Equal<P5, string>>,
    Expect<Equal<typeof age, number>>,
    Expect<Equal<typeof name, string>>
  ];

  interface Person {
    name: string;
    age: number;
  }

  type K1 = keyof Person;
  type K2 = keyof Person[];
  type K3 = keyof { [k: string]: Person };
  type K4 = keyof { [k in keyof Person]: Person };

  type P1 = Person['name'];
  type P2 = Person['age'];
  type P3 = Person['age' | 'name'];
  type P4 = string[]['push'];
  type P5 = string[][0]; // TODO ?

  function getProperty<O, K extends keyof O>(obj: O, key: K) {
    return obj[key];
  }

  function setProperty<O, K extends keyof O>(obj: O, key: K, value: O[K]) {
    obj[key] = value;
  }

  const obj: Person = { name: 'lx', age: 32 };

  const age = getProperty(obj, 'age');
  const name = getProperty(obj, 'name');
  // const test = getProperty(obj, 'test'); // Argument of type '"test"' is not assignable to parameter of type 'keyof Person'.

  setProperty(obj, 'name', 'Sean');
  // setProperty(obj, 'name', 1); //  Argument of type 'number' is not assignable to parameter of type 'string'.
  setProperty(obj, 'age', 18);
}
