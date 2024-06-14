/* eslint-disable prefer-const */
import { test } from 'vitest';

interface Person {
  name: string;
  age: number;
}

interface Guang {
  name: string;
  age: number;
  hobbies: string[];
}

test('协变(covariant), 把子类型赋值给父类', () => {
  let person: Person = {
    name: 'sean',
    age: 18,
  };

  const guang: Guang = {
    name: 'sean',
    age: 18,
    hobbies: ['a', 'b'],
  };

  person = guang;
  console.log(`person >>`, person);
});

test('逆变(contravariant),', () => {
  let printHobbies: (guang: Guang) => void;

  printHobbies = (guang) => {
    console.log(guang.hobbies);
  };

  let printName: (person: Person) => void;

  printName = (person) => {
    console.log(person.name);
  };

  printHobbies = printName;

  // printName = printHobbies;
});
