import clsx from 'clsx'

type AnyFunction = (...args: any[]) => any

export const cx = clsx

export const callAll = (...fns: AnyFunction[]) => {
  return function (this: any, ...args: any[]) {
    for (const fn of fns) {
      if (typeof fn === 'function') {
        fn.apply(this, args);
      }
    }
  };
};

export function mergeProps<T1 extends Record<string, any>, T2 extends Record<string, any>,>(
  object: T1, object2: T2
): Omit<T1 & T2, 'children'>;
export function mergeProps<T1 extends Record<string, any>, T2 extends Record<string, any>, T3 extends Record<string, any>>(
  object: T1, object2: T2, object3: T3
): Omit<T1 & T2 & T3, 'children'>;
export function mergeProps<T1 extends Record<string, any>, T2 extends Record<string, any>, T3 extends Record<string, any>, T4 extends Record<string, any>>(
  object: T1, object2: T2, object3: T3, object4: T4
): Omit<T1 & T2 & T3 & T4, 'children'>;
export function mergeProps<T1 extends Record<string, any>, T2 extends Record<string, any>, T3 extends Record<string, any>, T4 extends Record<string, any>, T5 extends Record<string, any>>(
  object: T1, object2: T2, object3: T3, object4: T4, object5: T5
): Omit<T1 & T2 & T3 & T4 & T5, 'children'>;
export function mergeProps<T extends Record<string, any>>(
  object: T, ...objects: T[]
): T
export function mergeProps(
  object: Record<string, any>, ...objects: Record<string, any>[]
): Record<string, any> {
  const merged = { ...object };
  for (const obj of objects) {
    Object.keys(obj).forEach((key) => {
      if (key === 'className' && typeof obj[key] === 'string') {
        merged[key] = clsx(merged[key], obj[key]);
        return;
      }
      if (key.startsWith('on') && typeof obj[key] === 'function') {
        merged[key] = callAll(merged[key], obj[key]);
        return;
      }
      if (key === 'style' && typeof obj[key] === 'object') {
        merged[key] = { ...merged[key], ...obj[key] };
        return;
      }
      if (typeof obj[key] !== 'undefined') {
        merged[key] = obj[key];
      }
    });
  }
  delete merged.children
  return merged;
};
