/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
var i = 1;

function foo() {
  console.log(`bar >>`, bar);
  console.log(`foo i >>`, i);
  let f = 'f';
  function bar() {
    console.log(`bar f >>`, f);
    function joo() {
      console.log(`joo i >>`, i);
    }
    joo();
  }
  bar();
}

// foo();

// console.log(`foo >>`, foo);

function bar(i) {
  function joo() {
    if (i >= 0) {
      console.log(`i >>`, i);
      i--;
      bar(i);
    }
  }
  joo();
}
bar(5);

{
  function foo() {
    const num = 2;
    return function () {
      console.log(`num >>`, num);
    };
  }

  const f = foo();

  const num = f();
  console.log(`num >>`, num);
}
