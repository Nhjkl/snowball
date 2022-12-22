type MyEquals<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;

/* type Includes<T extends readonly any[], U> = true extends {
  [K in keyof T]: MyEquals<T[K], U>
}[number] ? true : false */

type Includes<T extends readonly any[], U> =
T extends [infer First, ...infer Rest]
  ? MyEquals<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false


function Includes(list: any[], key: any) {
  function _run(list: any[], key: any): boolean {
    if (list.length === 0) return false;
    const [first, ...rest] = list
    if (first === key) {
      return true
    }
    return _run(rest, key);
  }
  return _run(list, key)
}

// ------------------

type Includes_test1 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>
type Includes_test2 = Includes<[{}], { a: 'A' }>

type Includes_test3 = [{ a: 'A' }, {}]

type Includes_test4 = Includes_test3[number]

type Includes_test5 = Includes_test4 extends {} ? true : false

type Includes_test6 = { [x in keyof {}] : 1 }

type Includes_test7<X> = <T>() => T extends X ? 1 : 2

type Includes_test8<X> = Includes_test7<{}>
