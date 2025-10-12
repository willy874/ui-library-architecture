import type { InferProp, FlatKeyof } from '@/utils/getProperty';
import type { EnvironmentContext } from '@/utils/environment-context';

export type PluginState = Record<string, any>;
export type PluginParts = Record<
  string,
  (env: EnvironmentContext) => HTMLElement[] | HTMLElement | null
>;

export interface PluginProperties {
  name: string;
}

export type PluginHooks = Record<string, (...args: any[]) => any>;

export interface PluginContext<
  Attrs extends PluginProperties,
  Methods extends PluginHooks = {},
  State extends PluginState = {},
  Parts extends PluginParts = {},
> extends EnvironmentContext {
  __state__: State;
  __attrs__: Attrs;
  __methods__: Methods;
  prop: <K extends string>(
    key: FlatKeyof<State>,
  ) => InferProp<State, K> extends object ? Readonly<InferProp<State, K>> : InferProp<State, K>;
  watch: <K extends FlatKeyof<State>>(
    key: K,
    callback: (value: InferProp<State, K>, prevValue: InferProp<State, K>) => void,
  ) => () => void;
  getParts: <K extends keyof Parts>(key: K) => ReturnType<Parts[K]>;
  destroy: () => void;
}

export type PluginFactory<T extends PluginContext<{ name: string }>> = (
  context: T,
) => Partial<T['__attrs__']> & Partial<T['__methods__']>;
