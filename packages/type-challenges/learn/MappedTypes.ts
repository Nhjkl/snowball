/* Mapped Types
One common task is to take an existing type and make each of its properties entirely optional . Let’s say we have a Person: */

interface Person {
  name: string;
  age: number;
  location: string;
}

// interface PartialPerson {
//   name?: string;
//   age?: number;
//   location?: string;
// }

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type PartialPerson = MyPartial<Person>;

type MyReadOny<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadonlyPerson = MyReadOny<PartialPerson>;

const readonlyPerson: ReadonlyPerson = {
  name: 'x',
};

// readonlyPerson.name = 'x'; // Cannot assign to 'name' because it is a read-only property.
