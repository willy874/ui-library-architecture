import { signal, isSignal, effect, effectScope } from 'alien-signals';
import { getProperty, setProperty } from '@/utils/getProperty';
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
    if (typeof initialState === 'function') {
      if (isSignal(initialState)) {
        return initialState as ReturnType<typeof signal<State>>;
      }
      return signal(initialState());
    }
    return signal(initialState);
  })();
  const clearup: (() => void)[] = [];

  return {
    ...environment,
    getInstance: (): Attrs & Methods & { getState: () => State } => {
      throw new Error('getInstance method is not implemented.');
    },
    prop: (key, value) => {
      const rootState = state();
      const target = getProperty(rootState, key);
      if (value === void 0) {
        return target;
      }
      if (Object.is(target, value)) {
        return;
      }
      setProperty(rootState, key, value);
      state({ ...rootState });
    },
    watch: (key: string, callback: (value: any, prevValue: any) => void) => {
      let prevValue: unknown = void 0;
      const scopeState = signal(getProperty(state(), key as any));
      const fn = effectScope(() => {
        effect(() => {
          scopeState(getProperty(state(), key as any));
        });
        effect(() => {
          const value = scopeState();
          callback(value, prevValue);
          prevValue = value;
        });
      });
      clearup.push(fn);
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
