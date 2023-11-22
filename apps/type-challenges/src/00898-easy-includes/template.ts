/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
// TODO:github.com/microsoft/TypeScript/issues/27024
type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

type Includes<Arr extends any[], Target> = Arr['length'] extends 0
  ? false
  : IsEqual<Arr[0], Target> extends true
    ? true
    : Arr extends [Arr[0], ...infer Tail]
      ? Includes<Tail, Target>
      : false;
