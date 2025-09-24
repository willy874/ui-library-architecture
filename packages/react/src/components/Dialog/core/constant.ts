export const NOOP = () => {};

export const LifecycleStates = {
  PRE_OPEN: 1,
  OPEN_ANIMATING: 2,
  OPEN: 3,
  CLOSE_ANIMATING: 4,
  PRE_CLOSE: 5,
  CLOSE: 6,
} as const;

export const LifecycleStatesCollection = {
  name: {
    1: 'pre-open',
    2: 'open-animating',
    3: 'open',
    4: 'close-animating',
    5: 'pre-close',
    6: 'close',
  },
} as const;
