import { useEffect, useMemo, useState } from 'react';
import type {
  PluginContext,
  PluginFactory,
  PluginHooks,
  PluginParts,
  PluginProperties,
  PluginState,
} from './plugin.type';
import { createPluginContext } from './plugin.context';
import { EventEmitter } from '@/utils/events';
import { useEnvironmentContext } from '@/utils/hooks/useEnvironmentContext';

interface UsePluginOptions<
  Attrs extends PluginProperties = {},
  Methods extends PluginHooks = {},
  State extends PluginState = {},
  Parts extends PluginParts = {},
> {
  initialAttrs?: Attrs;
  initialState: (() => State) | State;
  parts?: Parts;
  plugins?: PluginFactory<PluginContext<Attrs, Methods, State, Parts>>[];
}

export function usePlugin<
  Attrs extends PluginProperties = {},
  Methods extends PluginHooks = {},
  State extends PluginState = {},
  Parts extends PluginParts = {},
>(
  options: UsePluginOptions<Attrs, Methods, State, Parts>,
): PluginContext<Attrs, Methods, State, Parts> {
  const { initialState, initialAttrs, parts, plugins = [] } = options;
  const environment = useEnvironmentContext();
  const [context] = useState(() =>
    createPluginContext<Attrs, Methods, State, Parts>({
      initialState,
      parts,
      environment,
    }),
  );

  const [emitter] = useState(() => new EventEmitter());

  const { methods, attrs } = useMemo(() => {
    const results = plugins.map((factory) => factory(context));

    const _attrs: Attrs = {} as Attrs;
    const _methods: Methods = {} as Methods;

    for (const result of results) {
      for (const [key, value] of Object.entries(result)) {
        if (typeof value === 'function') {
          Object.defineProperty(_methods, key, {
            value,
            writable: false,
            enumerable: true,
            configurable: true,
          });
          continue;
        }
        Object.defineProperty(_attrs, key, {
          value,
          writable: false,
          enumerable: true,
          configurable: true,
        });
      }
    }

    return { attrs: _attrs, methods: _methods };
  }, [plugins]);

  useEffect(() => {
    Object.assign(context, initialAttrs || {});
    for (const key in attrs) {
      Reflect.set(context, key, (attrs as any)[key]);
    }
  }, [attrs]);

  useEffect(() => {
    const destructors: (() => void)[] = [];
    for (const key in methods) {
      destructors.push(
        emitter.on(key, (...args: any[]) => {
          (methods as any)[key](...args);
        }),
      );
    }
    return () => {
      destructors.forEach((destroy) => destroy());
    };
  }, []);

  return context;
}
