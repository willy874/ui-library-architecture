import { EventEmitter } from '@/utils/events';
import { proxy, watch } from '@/utils/proxy';
import { getProperty } from '@/utils/getProperty';
import { environmentContext, type EnvironmentContext } from '@/utils/environment-context';
import type { PluginContext, PluginEvents, PluginState } from './plugin.type';

export function createPluginContext<
  State extends PluginState,
  Ev extends PluginEvents,
  Parts extends string = string,
>(params: {
  initialState: (() => State) | State;
  getIds: () => Record<Parts, string>;
  events?: Ev;
  environment?: EnvironmentContext;
}): PluginContext<State, Ev, Parts> {
  const { initialState, events, getIds, environment = environmentContext } = params;
  const state = proxy(
    typeof initialState === 'function' ? initialState() : { ...initialState },
  ) as State;
  const clearup: (() => void)[] = [];
  const emitter = new EventEmitter();
  const on = (type: keyof Ev, listener: (p: Parameters<Ev[typeof type]>) => void) => {
    clearup.push(emitter.on(type as any, (...args) => listener?.apply(null, args as any)));
  };
  const emit = (type: keyof Ev, ...payload: Parameters<Ev[typeof type]>) => {
    const schema = events?.[type] || (() => true);
    const isValid = schema.apply(null, payload as any);
    if (isValid) {
      emitter.emit(type as any, ...payload);
    } else {
      throw new Error(`[Plugin] Event "${String(type)}" is prevented.`);
    }
  };
  const getPart = (part: Parts) => {
    const ids = getIds();
    return environment.getDocument().getElementById(ids[part]) || null;
  };
  const destroy = () => {
    clearup.forEach((fn) => fn());
  };
  const prop = (key: any) => getProperty(state, key);
  const watchProp = (key: string, callback: (value: any, prevValue: any) => void) => {
    return watch(
      () => getProperty(state, key as any),
      (newValue, oldValue) => callback(newValue, oldValue),
    );
  };
  return {
    __state__: {},
    __events__: {},
    prop,
    watch: watchProp,
    on,
    emit,
    getPart,
    destroy,
  } as any;
}
