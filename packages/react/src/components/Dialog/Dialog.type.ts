import { EventEmitter } from '@/utils/events';

import { dialogAnatomy } from '@ui-library-architecture/anatomy';

const parts = dialogAnatomy.build();

export type Part = keyof typeof parts;

export type DialogState =
  | 'open'
  | 'close'
  | 'pre-open'
  | 'pre-close'
  | 'open-animating'
  | 'close-animating';

export type DialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left-center'
  | 'right-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

interface DialogPluginState {
  position: DialogPosition;
}

interface DialogPluginContext<T = unknown> {
  getInstance: () => T;
  getPart: (part: Part) => HTMLElement | null;
  emitter: EventEmitter;
  state: DialogPluginState;
}

interface DialogPluginProperties {
  name: string;
}

export interface LifeCycleParams {
  context: unknown;
  element: HTMLElement | null;
  next: () => void;
}

interface DialogPluginHooks {
  onBeforeOpen: (params: LifeCycleParams) => void;
  onAfterOpen: (params: LifeCycleParams) => void;
  onBeforeClose: (params: LifeCycleParams) => void;
  onAfterClose: (params: LifeCycleParams) => void;
  onStateUpdate: <T extends keyof DialogPluginState>(state: {
    type: T;
    value: DialogPluginState[T];
  }) => void;
}

export interface DialogPlugin extends DialogPluginHooks, DialogPluginProperties {}

export type DialogPluginFactory = (
  context: DialogPluginContext<DialogPlugin>,
) => Partial<DialogPluginProperties> & Partial<DialogPluginHooks>;
