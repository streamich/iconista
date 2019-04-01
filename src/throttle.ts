export type Args = any[] & {
  self: any;
  resolve: (result: any) => void;
  reject: (error: any) => void;
  next?: Args;
};
export interface Queue {
  push: (args: Args) => void;
  shift: () => Args;
}

export const throttle = (fn, concurrency = 3) => {
  let count = 0;
  let start: Args | undefined;
  let end: Args | undefined;

  const push = (args: Args) => {
    if (!start) start = end = args;
    else end = end!.next = args;
  };

  const shift = (): Args | undefined => {
    if (start) {
      const first = start;
      start = start.next;
      first.next = undefined;
      return first;
    }
    return undefined;
  };

  let next;
  next = args => {
    if (args) {
      count++;
      fn.apply(args.self, args).then(args.resolve, args.reject).then(() => {
        count--;
        if (count < concurrency) next(shift());
      });
    }
  };

  return function (this: any, ...args: Args) {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line no-invalid-this
      args.self = this;
      args.resolve = resolve;
      args.reject = reject;
      push(args);
      if (count < concurrency) next(shift());
    });
  };
};
