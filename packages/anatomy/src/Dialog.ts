import { createAnatomy } from '@zag-js/anatomy'

export const anatomy = createAnatomy('dialog').parts(
  'trigger',
  'closeTrigger',
  'backdrop',
  'positioner',
  'content',
  'title',
  'description',
  'action',
)
