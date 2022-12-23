// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

{
  const name: string = 'lx';
  const age: number = 32;
  const single: boolean = false;
  const undef: undefined = undefined;
  const nul: null = null;
  const obj: object = {};
  const symbolVar: symbol = Symbol('unique'); // es2015 or later
  const bigIniVar1: bigint = 9007199254740991n; // es2020 or later
  const bigIniVar2: bigint = BigInt(9007199254740991); // es2020 or later
}
