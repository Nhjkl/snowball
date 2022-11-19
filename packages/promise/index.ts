// Promise 必须有这三种状态：pendding（准备），fulfilled (履行，结果)，rejected （拒绝）
enum Status {
  Pendding = 'pendding',
  Rejected = 'rejected',
  Fulfilled = 'fulfilled',
}

type ResolveFun = (value: any) => void;

type RejectFun = ResolveFun;

type Executor = (resolve: ResolveFun, reject: RejectFun) => void;

export class MyPromise {
  private status: Status = Status.Pendding;

  private value: any;

  constructor(executor: Executor) {
    const { resolve, reject } = this;
    executor(resolve, reject);
  }

  then(onFulfilled: Function, onRejected?: Function) {
    const { status, value } = this;

    if (status === Status.Fulfilled) {
     onFulfilled && setTimeout(onFulfilled.bind(null,value), 0);
    }

    if (status === Status.Rejected) {
     onRejected && setTimeout(onRejected.bind(null,value), 0);
    }
  }

  private resolve: ResolveFun = (value: any) => {
    if (this.status !== Status.Pendding) return;
    this.status = Status.Fulfilled;
    this.value = value;
  };

  private reject: RejectFun = (value: any) => {
    if (this.status !== Status.Pendding) return;
    this.status = Status.Rejected;
    this.value = value;
  };
}
