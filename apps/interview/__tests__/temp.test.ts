/* eslint-disable no-var */
import { expect, test } from 'vitest';

test('闭包考题01', () => {
  for (var i = 0; i < 6; i++) {
    setTimeout(() => {
      console.log(i); // 问输出什么
    });
  }
});

test('浅拷贝问题', () => {
  const a = {
    age: 1,
    jobs: {
      first: 'FE',
    },
  };
  const b = { ...a };
  a.jobs.first = 'native';
  expect(b.jobs.first).toBe('native');
});

test('使用MessageChannel实现深拷贝', async () => {
  const a = {
    a: 1,
    b: undefined,
    // c: Symbol('c'), // DataCloneError: Symbol(c) could not be cloned
    d: undefined,
  };

  a.d = a;

  function deepClone(obj) {
    return new Promise((resolve) => {
      const { port1, port2 } = new MessageChannel();
      port1.onmessage = (e) => resolve(e.data);
      port2.postMessage(obj);
    });
  }

  const _a = await deepClone(a);
  console.log(`_a >>`, _a);
});

test('原型', () => {
  const person = {
    gender: 1,
  };

  const zhangsan = Object.create(person, {
    name: {
      value: 'zhangsan',
      enumerable: true,
    },
  });

  expect(zhangsan.gender).toBe(1);

  // 使用构造函数创建类
  function Person(this: any) {
    this.gender = 1;
  }

  const u = {};
  Person.call(u);
  console.log(`u >>`, u);

  const zhangsan1 = new Person();

  expect(zhangsan1.constructor).toBe(Person);
  expect(zhangsan1.__proto__).toBe(Person.prototype);
  expect(Person.prototype.constructor).toBe(Person);
  expect(Object.prototype.constructor).toBe(Object);
  expect(Object.prototype.__proto__).toBe(null);
});

test('闭包', () => {
  for (var i = 0; i < 6; i++) {
    (function () {
      var j = i;
      setTimeout(() => {
        console.log(j); // 问输出什么
      });
    })();
  }

  console.log(`i >>`, i);
});
