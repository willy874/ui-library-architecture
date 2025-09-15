export type RootNode = ShadowRoot | Document | DocumentFragment | Element

export type Assign<T, U> = Omit<T, keyof U> & U

export type Pretty<T> = { [K in keyof T]: T[K] } & {}

export type DistributiveOmit<T, K extends keyof any> = T extends unknown ? Omit<T, K> : never