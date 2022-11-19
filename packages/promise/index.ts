export class Promise {
  constructor(cb: Function) {
    cb && cb();
  }
}
