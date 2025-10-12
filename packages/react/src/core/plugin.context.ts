import { proxy, isProxy, watch } from '@/utils/proxy';
import { getProperty } from '@/utils/getProperty';
import type {
  PluginContext,
  PluginProperties,
  PluginParts,
  PluginState,
  PluginHooks,
} from './plugin.type';
import { environmentContext, type EnvironmentContext } from '@/utils/environment-context';

export function createPluginContext<
  Attrs extends PluginProperties,
  Methods extends PluginHooks = {},
  State extends PluginState = {},
  Parts extends PluginParts = {},
>(params: {
  initialState: (() => State) | State;
  parts?: Parts;
  environment?: EnvironmentContext;
}): PluginContext<Attrs, Methods, State, Parts> {
  const { initialState, parts, environment = environmentContext } = params;
  const state = (() => {
    const init = typeof initialState === 'function' ? initialState() : initialState;
    return isProxy(init) ? init : proxy({ ...init });
  })();
  const clearup: (() => void)[] = [];

  return {
    ...environment,
    getInstance: (): Attrs & Methods & { getState: () => State } => {
      throw new Error('getInstance method is not implemented.');
    },
    prop: (key) => getProperty(state, key),
    watch: (key: string, callback: (value: any, prevValue: any) => void) => {
      clearup.push(
        watch(
          () => getProperty(state, key as any),
          (newValue, oldValue) => callback(newValue, oldValue),
        ),
      );
    },
    getParts: (key) => {
      if (!parts) return null;
      return parts[key]?.(environment) ?? null;
    },
    destroy: () => {
      clearup.forEach((fn) => fn());
    },
  } as PluginContext<Attrs, Methods, State, Parts>;
}
