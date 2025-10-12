import type { InferProp, FlatKeyof } from '@/utils/getProperty';

export type PluginState = Record<string, any>;

export type PluginEvents = Record<string, (...args: any[]) => boolean> & {
  created?: () => void;
  destroyed?: () => void;
};

export interface PluginContext<
  State extends PluginState = {},
  Ev extends PluginEvents = {},
  Parts extends string = string,
> {
  __events__: Ev;
  __state__: State;
  prop: <K extends string>(
    key: FlatKeyof<State>,
  ) => InferProp<State, K> extends object ? Readonly<InferProp<State, K>> : InferProp<State, K>;
  watch: <K extends FlatKeyof<State>>(
    key: K,
    callback: (value: InferProp<State, K>, prevValue: InferProp<State, K>) => void,
  ) => () => void;
  emit: <K extends keyof Ev>(type: K, ...payload: Parameters<Ev[K]>) => void;
  on: <K extends keyof Ev>(type: K, listener: Ev[K]) => void;
  getPart: (part: Parts) => HTMLElement | null;
  destroy: () => void;
}

export interface PluginProperties {
  name: string;
}

export interface PluginHooks {}

export type PluginFactory<
  T extends PluginContext,
  P extends PluginProperties,
  H extends PluginHooks,
> = (context: T) => Partial<P> & Partial<H>;
