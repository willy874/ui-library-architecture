import { dialogAnatomy } from '@ui-library-architecture/anatomy';

export const parts = dialogAnatomy.build();

export type Parts = keyof typeof parts;

export const slots = dialogAnatomy.keys();
