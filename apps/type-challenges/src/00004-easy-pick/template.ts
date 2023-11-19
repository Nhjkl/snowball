type MyPick<Obj, Keys extends keyof Obj> = {
  [K in Keys]: Obj[K];
};
