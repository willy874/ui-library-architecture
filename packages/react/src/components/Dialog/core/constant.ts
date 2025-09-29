export const NOOP = () => {};

export const LifecycleStates = {
  CLOSE: 0,
  PRE_OPEN: 1,
  OPEN_ANIMATING: 2,
  OPEN: 3,
  CLOSE_ANIMATING: 4,
  PRE_CLOSE: 5,
} as const;

export const LifecycleStatesCollection = {
  name: {
    0: 'close',
    1: 'pre-open',
    2: 'open-animating',
    3: 'open',
    4: 'close-animating',
    5: 'pre-close',
  },
} as const;
