import { createAnatomy } from '@zag-js/anatomy'

export const anatomy = createAnatomy('field').parts(
  'root',
  'label',
  'helper',
  'prefix',
  'suffix',
  'errorText',
  'wrapper',
  'passwordControl',
  'input',
  'select',
  'textarea',
)
