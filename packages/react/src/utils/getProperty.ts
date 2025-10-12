export type FlatKeyof<T extends Record<string, any>> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${FlatKeyof<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

export type InferProp<T, K extends string> = K extends `${infer R}.${infer Rest}`
  ? R extends keyof T
    ? InferProp<T[R], Rest>
    : undefined
  : K extends keyof T
    ? T[K]
    : undefined;

export function getProperty<T extends Record<string, any>, K extends FlatKeyof<T>>(
  obj: T,
  path: K,
): InferProp<T, K> {
  return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj) as any;
}

export function setProperty<T extends Record<string, any>, K extends FlatKeyof<T>>(
  obj: T,
  path: K,
  value: InferProp<T, K>,
): void {
  const keys = path.split('.') as Array<keyof T>;
  const lastKey = keys.pop();

  let target: any = obj;

  while (keys.length && target) {
    const key = keys.shift() as keyof T;
    if (!(key in target)) {
      (target as any)[key] = {};
    }
    target = Reflect.get(target, key);
  }

  if (target && lastKey) {
    Reflect.set(target, lastKey, value);
  }
}
