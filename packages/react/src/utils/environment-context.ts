import type { RootNode } from './types';

export interface EnvironmentContext {
  getRootNode(): RootNode;
  getDocument(): Document;
  getWindow(): Window & typeof globalThis;
}

export const environmentContext: EnvironmentContext = {
  getDocument: () => document,
  getWindow: () => window,
  getRootNode: () => document.body,
};
