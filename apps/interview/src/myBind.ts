export function myBind(
  func: (...args: unknown[]) => void | unknown,
  context: unknown,
  ...args: unknown[]
) {
  return function (..._args: unknown[]) {
    func.apply(context, args.concat(_args));
  };
}
