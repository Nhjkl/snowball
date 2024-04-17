/* eslint-disable no-inner-declarations */
/* eslint-disable no-var */
import { expect, test } from 'vitest';

test('var 变量提升', () => {
  {
    expect(a).toBeUndefined();
    var a = 1;
  }

  {
    var a = 1;

    function foo() {
      var a = 2;
      console.log(`a >>`, a);
      expect(a).toBe(2);
    }

    foo();
  }
});

// 当程序的控制流程在新的作用域（module、function或block作用域）进行实例化时，
// 在此作用域中用let/const声明的变量会先在作用域中被创建出来，但因此时还未进
// 行词法绑定，所以是不能被访问的，如果访问就会抛出错误。因此，在这运行流程
// 进入作用域创建变量，到变量可以被访问之间的这一段时间，就称之为暂时死区。
//
// ES6规定，let/const命令会使区块形成封闭的作用域。若在声明之前使用变量，
// 就会报错。总之，在代码块内，使用let/const命令声明变量之前，该变量都是
// 不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称TDZ)
test('暂时性死区', () => {
  {
    // console.log(`a >>`, a); // ReferenceError: Cannot access 'a' before initialization
    const a = 1;
  }
});

test('let, const 不允许重复声明', () => {
  {
    var a = 1;
    var a = 2;
  }

  // {
  //   let a = 1;
  //   let a = 2; // ERROR: The symbol "a" has already been declared
  //
  //   var b = 1;
  //   let b = 2; // ERROR: The symbol "b" has already been declared
  //
  //   let c = 1;
  //   var c = 2; // ERROR: The symbol "c" has already been declared
  // }
  //
  // {
  //   const a = 1;
  //   const a = 2; // ERROR: The symbol "a" has already been declared
  // }
});

test('const 必须立刻初始化，且不能修改', () => {
  {
    try {
      // const a; // The constant "a" must be initialized
      const b = 1;
      b = 2; // TypeError: Assignment to constant variable
    } catch (error) {
      console.log(`error >>`, error);
    }
  }
});
