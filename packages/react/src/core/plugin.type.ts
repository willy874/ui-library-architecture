import type { InferProp, FlatKeyof } from '@/utils/getProperty';
import type { EnvironmentContext } from '@/utils/environment-context';
import type { DeepReadonly } from '@/utils/types';

export type PluginState = Record<string, any>;
export type PluginParts = Record<
  string,
  (env: EnvironmentContext) => HTMLElement[] | HTMLElement | null
>;

export type PluginProperties = Record<string, any>;

export type PluginHooks = Record<string, (...args: any[]) => any>;

export type PluginInstance<
  Attrs extends PluginProperties = {},
  Methods extends PluginHooks = {},
  State extends PluginState = {},
> = Attrs &
  Methods & {
    name: string;
    getState: () => DeepReadonly<State> & { name: string };
  };

export interface PluginContext<
  Attrs extends PluginProperties = {},
  Methods extends PluginHooks = {},
  State extends PluginState = {},
  Parts extends PluginParts = {},
> extends EnvironmentContext {
  __state__: State;
  __attrs__: Attrs;
  __methods__: Methods;
  getInstance: () => PluginInstance<Attrs, Methods, State>;
  prop: <K extends string>(
    key: FlatKeyof<State>,
    value?: InferProp<State, K>,
  ) => InferProp<State, K> extends object ? DeepReadonly<InferProp<State, K>> : InferProp<State, K>;
  watch: <K extends FlatKeyof<State>>(
    key: K,
    callback: (value: InferProp<State, K>, prevValue: InferProp<State, K>) => void,
  ) => () => void;
  getParts: <K extends keyof Parts>(key: K) => ReturnType<Parts[K]>;
  destroy: () => void;
}

export type PluginFactory<T extends PluginContext> = (
  context: T,
) => Partial<T['__attrs__'] & T['__methods__']> & { name: string };

export type PluginCreator<T extends PluginContext> = (
  ...plugins: PluginFactory<T>[]
) => PluginInstance<T['__attrs__'], T['__methods__'], T['__state__']>;
