import type { Parts } from './anatomy';
import { EventEmitter } from '@/utils/events';

export type DialogState =
  | 'open'
  | 'close'
  | 'pre-open'
  | 'pre-close'
  | 'open-animating'
  | 'close-animating';

export type DialogPosition =
  | 'center'
  | 'top-center'
  | 'bottom-center'
  | 'left-center'
  | 'right-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface DialogPluginState {
  position: DialogPosition;
  edgeOffset: number;
}

interface DialogPluginContext<T = unknown> {
  getInstance: () => T;
  getPart: (part: Parts) => HTMLElement | null;
  emitter: EventEmitter;
  state: DialogPluginState;
}

interface DialogPluginProperties {
  name: string;
}

export interface LifeCycleParams {
  context: unknown;
  next: () => void;
  preNext: () => void;
}

interface DialogPluginHooks {
  onBeforeOpen: (params: LifeCycleParams) => void;
  onAfterOpen: (params: LifeCycleParams) => void;
  onBeforeClose: (params: LifeCycleParams) => void;
  onAfterClose: (params: LifeCycleParams) => void;
  onStateUpdate: (state: DialogPluginState) => void;
}

export interface DialogPlugin extends DialogPluginHooks, DialogPluginProperties {}

export type DialogPluginFactory = (
  context: DialogPluginContext<DialogPlugin>,
) => Partial<DialogPluginProperties> & Partial<DialogPluginHooks>;
