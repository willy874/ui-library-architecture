export type RootNode = ShadowRoot | Document | DocumentFragment | Element;

export type GetContainer = string | RootNode | (() => RootNode) | false;

export type Assign<T, U> = Omit<T, keyof U> & U;

export type Pretty<T> = { [K in keyof T]: T[K] } & {};

export type DistributiveOmit<T, K extends keyof any> = T extends unknown ? Omit<T, K> : never;

export type StyleAttributes<T extends string = string> = {
  [K in `data-${T}`]: string;
} & { className: string };

export type Props = Readonly<Record<string, unknown>>;
