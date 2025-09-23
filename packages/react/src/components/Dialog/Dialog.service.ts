import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { normalizeProps, useMachine } from '@zag-js/react';
import * as dialog from '@zag-js/dialog';
import type { HTMLProps } from '@/utils/factory';
import { EventEmitter } from '@/utils/events';
import type { PortalProps } from '@/components/Portal';
import { useDialogLifecycle } from './hooks/useOpenAnimation';
import { fadeInPlugin } from './plugins/fadeInAnimate';
import { positionPlugin } from './plugins/position';
import { dialogAnatomy } from '@ui-library-architecture/anatomy';
import type {
  DialogPlugin,
  DialogPluginFactory,
  DialogPosition,
  DialogState,
  LifeCycleParams,
  Part,
} from './Dialog.type';
import { LifecycleStatesCollection } from './Dialog.constant';

const parts = dialogAnatomy.build();

interface DialogEvents {
  openChange: (params: { open: boolean }) => void;
  beforeOpen: (params: LifeCycleParams) => void;
  afterOpen: (params: LifeCycleParams) => void;
  beforeClose: (params: LifeCycleParams) => void;
  afterClose: (params: LifeCycleParams) => void;
}

type ElementIds = {
  [K in keyof typeof parts]?: string;
};

export interface UseDialogServiceProps {
  id?: string;
  ids?: ElementIds;
  defaultOpen?: boolean;
  open?: boolean;
  getRootNode?: dialog.Props['getRootNode'];
  onOpenChange?: dialog.Props['onOpenChange'];
  onBeforeOpen?: DialogEvents['beforeOpen'];
  onAfterOpen?: DialogEvents['afterOpen'];
  onBeforeClose?: DialogEvents['beforeClose'];
  onAfterClose?: DialogEvents['afterClose'];
  preventScroll?: dialog.Props['preventScroll'];
  closeOnInteractOutside?: dialog.Props['closeOnInteractOutside'];
  closeOnEscape?: dialog.Props['closeOnEscape'];
  position?: DialogPosition;
}

const pluginFactories: DialogPluginFactory[] = [fadeInPlugin, positionPlugin];

export const useDialogService = (props: UseDialogServiceProps = {}) => {
  const {
    open: propOpen,
    id: propId,
    ids: propIds,
    getRootNode,
    onOpenChange,
    onBeforeOpen,
    onAfterOpen,
    onBeforeClose,
    onAfterClose,
    position = 'center',
  } = props;
  const uid = useId();
  const id = propId || uid;

  const ids = useMemo<Record<Part, string>>(
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
  const pluginStateRef = useRef({ position });
  const getHookInstance = useCallback(() => {
    const pluginContext = {
      getInstance: () => instance,
      getPart: (part: Part) => {
        const id = ids[part];
        if (!id) return null;
        return document.getElementById(id);
      },
      emitter: emitterRef.current,
      state: pluginStateRef.current,
    };
    const plugins = pluginFactories.map((factory) => factory(pluginContext));
    const instance: DialogPlugin = {
      name: plugins.map((p) => p.name || '').join(','),
      onStateUpdate: (params) => plugins.forEach((p) => p.onStateUpdate?.(params)),
      onBeforeOpen: (params) => plugins.forEach((p) => p.onBeforeOpen?.(params)),
      onAfterOpen: (params) => plugins.forEach((p) => p.onAfterOpen?.(params)),
      onBeforeClose: (params) => plugins.forEach((p) => p.onBeforeClose?.(params)),
      onAfterClose: (params) => plugins.forEach((p) => p.onAfterClose?.(params)),
    };
    return instance;
  }, [ids]);
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

  useEffect(() => {
    hookRef.current.onStateUpdate({ type: 'position', value: position });
  }, [position]);

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
    () =>
      ({
        ...api.getBackdropProps(),
        ...controlProviderProps,
      }) as HTMLProps<'div'>,
    [api, controlProviderProps],
  );

  const getPortalProps = useCallback(
    () =>
      ({
        open: api.open,
        autoLock: props.preventScroll,
        autoDestroy: true,
        getRootNode,
      }) as PortalProps,
    [api.open, getRootNode, props.preventScroll],
  );

  const getPositionerProps = useCallback(
    () =>
      ({
        ...api.getPositionerProps(),
        ...controlProviderProps,
      }) as HTMLProps<'div'>,
    [api, controlProviderProps],
  );

  const getContentProps = useCallback(
    () =>
      ({
        ...api.getContentProps(),
        ...controlProviderProps,
      }) as HTMLProps<'div'>,
    [api, controlProviderProps],
  );

  const getTitleProps = useCallback(
    () =>
      ({
        ...api.getTitleProps(),
        ...controlProviderProps,
      }) as HTMLProps<'div'>,
    [api, controlProviderProps],
  );

  const getActionProps = useCallback(
    () =>
      ({
        id: ids.action,
        'data-part': parts.action,
        ...controlProviderProps,
      }) as HTMLProps<'div'>,
    [ids.action, controlProviderProps],
  );

  const getDescriptionProps = useCallback(
    () =>
      ({
        ...api.getDescriptionProps(),
        ...controlProviderProps,
      }) as HTMLProps<'div'>,
    [api, controlProviderProps],
  );

  const getOpenTriggerProps = useCallback(
    () =>
      ({
        ...api.getTriggerProps(),
        ...controlProviderProps,
      }) as HTMLProps<'button'>,
    [api, controlProviderProps],
  );

  const getCloseTriggerProps = useCallback(
    () =>
      ({
        ...api.getCloseTriggerProps(),
        ...controlProviderProps,
      }) as HTMLProps<'button'>,
    [api, controlProviderProps],
  );

  return {
    open: api.open,
    state: animationState,
    animationRef,
    getBackdropProps,
    getPortalProps,
    getPositionerProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getActionProps,
    getOpenTriggerProps,
    getCloseTriggerProps,
    onOpen: () => emitOpenChange(true),
    onClose: () => emitOpenChange(false),
    setContext: setDialogContext,
  };
};

export type UseDialogServiceReturn = ReturnType<typeof useDialogService>;
