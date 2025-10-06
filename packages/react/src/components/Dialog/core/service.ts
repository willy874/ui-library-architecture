import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { normalizeProps, useMachine } from '@zag-js/react';
import * as dialog from '@zag-js/dialog';
import type { DefaultHTMLProps, HTMLProps, PolymorphicProps } from '@/utils/factory';
import { EventEmitter } from '@/utils/events';
import { proxy, watch } from '@/utils/proxy';
import type { PortalProps } from '@/components/Portal';
import { useDialogLifecycle } from './hooks/useDialogLifecycle';
import type {
  DialogPlugin,
  DialogPluginFactory,
  DialogPluginState,
  DialogPosition,
  DialogState,
  LifeCycleParams,
} from './type';
import { LifecycleStatesCollection } from './constant';
import type { Parts } from './anatomy';
import { modalPlugin } from '../plugins/modal';
import { fadeInPlugin } from '../plugins/fadeInAnimate';
import { mergeProps } from '@/utils/mergeProps';
import type { GetContainer } from '@/utils/types';

interface DialogEvents {
  openChange: (params: { open: boolean }) => void;
  beforeOpen: (params: LifeCycleParams) => void;
  afterOpen: (params: LifeCycleParams) => void;
  beforeClose: (params: LifeCycleParams) => void;
  afterClose: (params: LifeCycleParams) => void;
}

type PartsRecord<T> = {
  [K in Parts]?: T;
};

export interface UseDialogServiceProps {
  id?: string;
  ids?: PartsRecord<string>;
  classNames?: PartsRecord<string>;
  defaultOpen?: boolean;
  open?: boolean;
  getRootNode?: GetContainer;
  onOpenChange?: dialog.Props['onOpenChange'];
  onBeforeOpen?: DialogEvents['beforeOpen'];
  onAfterOpen?: DialogEvents['afterOpen'];
  onBeforeClose?: DialogEvents['beforeClose'];
  onAfterClose?: DialogEvents['afterClose'];
  preventScroll?: dialog.Props['preventScroll'];
  closeOnInteractOutside?: dialog.Props['closeOnInteractOutside'];
  closeOnEscape?: dialog.Props['closeOnEscape'];
  position?: DialogPosition;
  edgeOffset?: number;
  plugins?: DialogPluginFactory[];
}

const defaultPlugins: DialogPluginFactory[] = [fadeInPlugin, modalPlugin];

export const useDialogService = (props: UseDialogServiceProps = {}) => {
  const {
    open: propOpen,
    id: propId,
    ids: propIds,
    classNames,
    getRootNode,
    onOpenChange,
    onBeforeOpen,
    onAfterOpen,
    onBeforeClose,
    onAfterClose,
    position = 'center',
    edgeOffset = 20,
    plugins = defaultPlugins,
  } = props;
  const uid = useId();
  const id = propId || uid;

  const ids = useMemo<Record<Parts, string>>(
    () => ({
      action: propIds?.action ?? `dialog::${id}::action`,
      backdrop: propIds?.backdrop ?? `dialog::${id}::backdrop`,
      closeTrigger: propIds?.closeTrigger ?? `dialog::${id}::close-trigger`,
      content: propIds?.content ?? `dialog::${id}::content`,
      description: propIds?.description ?? `dialog::${id}::description`,
      positioner: propIds?.positioner ?? `dialog::${id}::positioner`,
      title: propIds?.title ?? `dialog::${id}::title`,
      trigger: propIds?.trigger ?? `dialog::${id}::trigger`,
    }),
    [propIds, id],
  );

  const emitterRef = useRef(new EventEmitter());
  const pluginStateRef = useRef(
    proxy({
      position,
      edgeOffset,
    } as DialogPluginState),
  );
  useEffect(() => {
    const stateProxy = pluginStateRef.current;
    return watch(stateProxy, (newValue) => {
      hookRef.current.onStateUpdate(newValue);
    });
  }, []);
  const getHookInstance = useCallback(() => {
    const pluginContext = {
      getInstance: () => instance,
      getPart: (part: Parts) => {
        const id = ids[part];
        if (!id) return null;
        return document.getElementById(id);
      },
      emitter: emitterRef.current,
      state: pluginStateRef.current,
    };
    const pluginInstances = plugins.map((factory) => factory(pluginContext));
    const instance: DialogPlugin = {
      name: pluginInstances.map((p) => p.name || '').join(','),
      onStateUpdate: (params) => pluginInstances.forEach((p) => p.onStateUpdate?.(params)),
      onBeforeOpen: (params) => pluginInstances.forEach((p) => p.onBeforeOpen?.(params)),
      onAfterOpen: (params) => pluginInstances.forEach((p) => p.onAfterOpen?.(params)),
      onBeforeClose: (params) => pluginInstances.forEach((p) => p.onBeforeClose?.(params)),
      onAfterClose: (params) => pluginInstances.forEach((p) => p.onAfterClose?.(params)),
    };
    return instance;
  }, [ids, ...plugins]);
  const hookRef = useRef(getHookInstance());
  useEffect(() => {
    hookRef.current = getHookInstance();
  }, [getHookInstance]);

  const [dialogContext, setDialogContext] = useState<unknown>({});

  const {
    open: $open,
    state: lifecycleState,
    ref: animationRef,
    emitOpenChange,
  } = useDialogLifecycle({
    open: propOpen,
    defaultOpen: props.defaultOpen,
    context: dialogContext,
    onOpenChange: ({ open }: { open: boolean }) => {
      onOpenChange?.({ open });
    },
    onBeforeOpen: (params) => {
      const ctx = { ...params, context: dialogContext };
      hookRef.current.onBeforeOpen(ctx);
      onBeforeOpen?.(ctx);
    },
    onAfterOpen: (params) => {
      const ctx = { ...params, context: dialogContext };
      hookRef.current.onAfterOpen(ctx);
      onAfterOpen?.(ctx);
    },
    onBeforeClose: (params) => {
      const ctx = { ...params, context: dialogContext };
      hookRef.current.onBeforeClose(ctx);
      onBeforeClose?.(ctx);
    },
    onAfterClose: (params) => {
      const ctx = { ...params, context: dialogContext };
      hookRef.current.onAfterClose(ctx);
      onAfterClose?.(ctx);
      setDialogContext({});
    },
  });

  const animationState: DialogState = Reflect.get(LifecycleStatesCollection.name, lifecycleState);

  const service = useMachine(dialog.machine, {
    id,
    open: $open,
    onOpenChange: (detail) => emitOpenChange(detail.open),
    defaultOpen: props.defaultOpen,
    preventScroll: props.preventScroll,
    closeOnInteractOutside: props.closeOnInteractOutside,
    closeOnEscape: props.closeOnEscape,
    ids,
  });
  const api = dialog.connect(service, normalizeProps);

  const controlProviderProps = useMemo(
    () =>
      ({
        'data-uid': id,
        'data-state': animationState,
      }) as const,
    [id, animationState],
  );

  const getBackdropProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps<DefaultHTMLProps>(
        {
          ...api.getBackdropProps(),
          ...controlProviderProps,
          className: classNames?.backdrop,
        },
        { ...overrides },
      ),
    [api, controlProviderProps],
  );

  const getPortalProps = useCallback(
    (overrides?: PortalProps) =>
      mergeProps<PortalProps>(
        {
          open: api.open,
          autoLock: props.preventScroll,
          autoDestroy: true,
          getRootNode,
        },
        { ...overrides },
      ),
    [api.open, getRootNode, props.preventScroll],
  );

  const getPositionerProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps<DefaultHTMLProps & PolymorphicProps>(
        {
          ...api.getPositionerProps(),
          ...controlProviderProps,
          className: classNames?.positioner,
          render: () => {},
          ref: animationRef,
        },
        { ...overrides },
      ),
    [api, controlProviderProps],
  );

  const getContentProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps<DefaultHTMLProps>(
        {
          ...api.getContentProps(),
          ...controlProviderProps,
          className: classNames?.content,
        },
        { ...overrides },
      ),
    [api, controlProviderProps],
  );

  const getTitleProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps<DefaultHTMLProps>(
        {
          ...api.getTitleProps(),
          ...controlProviderProps,
          className: classNames?.title,
        },
        { ...overrides },
      ),
    [api, controlProviderProps],
  );

  const getActionProps = useCallback(
    (overrides?: DefaultHTMLProps) => {
      const attrs = { 'data-part': 'action' };
      return mergeProps<DefaultHTMLProps>(
        {
          id: ids.action,
          ...attrs,
          ...controlProviderProps,
          className: classNames?.action,
        },
        { ...overrides },
      );
    },
    [ids.action, controlProviderProps],
  );

  const getDescriptionProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps<DefaultHTMLProps>(
        {
          ...api.getDescriptionProps(),
          ...controlProviderProps,
          className: classNames?.description,
        },
        { ...overrides },
      ),
    [api, controlProviderProps],
  );

  const getOpenTriggerProps = useCallback(
    (overrides?: HTMLProps<'button'>) =>
      mergeProps<HTMLProps<'button'>>(
        {
          ...api.getTriggerProps(),
          ...controlProviderProps,
          className: classNames?.trigger,
        },
        { ...overrides },
      ),
    [api, controlProviderProps],
  );

  const getCloseTriggerProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps<DefaultHTMLProps>(
        {
          ...api.getCloseTriggerProps(),
          ...controlProviderProps,
          className: classNames?.closeTrigger,
        },
        { ...overrides },
      ),
    [api, controlProviderProps],
  );

  return {
    open: api.open,
    onOpen: () => emitOpenChange(true),
    onClose: () => emitOpenChange(false),
    setContext: setDialogContext,
    getBackdropProps,
    getPortalProps,
    getPositionerProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getActionProps,
    getOpenTriggerProps,
    getCloseTriggerProps,
  };
};

export type UseDialogServiceReturn = ReturnType<typeof useDialogService>;
