import { fieldAnatomy } from '@ui-library-architecture/anatomy';

export const parts = fieldAnatomy.build();

export type Parts = typeof parts;

export const slots = fieldAnatomy.keys();
