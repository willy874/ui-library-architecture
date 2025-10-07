import { definePreset, defineSemanticTokens, defineSlotRecipe, defineParts } from '@pandacss/dev';
import { dialogAnatomy } from '@ui-library-architecture/anatomy';

const token = defineSemanticTokens({});

const parts = defineParts(dialogAnatomy.build());

const slotRecipe = defineSlotRecipe({
  className: 'ui-modal',
  slots: dialogAnatomy.keys(),
  base: parts({
    backdrop: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, .48)',
      zIndex: 1399,
    },
    positioner: {
      position: 'fixed',
      zIndex: 1400,
      inset: 0,
    },
    content: {
      borderRadius: 'md',
      background: 'white',
      padding: '{spacing.6}',
      position: 'relative',
      pointerEvents: 'auto',
    },
    trigger: {},
    closeTrigger: {
      position: 'absolute',
      top: '0',
      right: '0',
      zIndex: 1500,
    },
    title: {
      fontSize: 'xl',
      fontWeight: '700',
      lineHeight: 'xl',
      marginBottom: '2',
      textAlign: 'center',
      color: '{colors.slate.800}',
    },
    description: {
      fontSize: 'sm',
      lineHeight: 'sm',
      color: '{colors.slate.800}',
      mb: '5',
      textAlign: 'center',
    },
    action: {
      display: 'flex',
      gap: '{spacing.2}',
      '& > button': {
        flexGrow: 1,
      },
    },
  }),
  variants: {
    size: {
      sm: parts({
        content: {
          width: '280px',
        },
      }),
      md: parts({
        content: {
          width: '360px',
        },
      }),
      lg: parts({
        content: {
          width: '480px',
        },
      }),
      xl: parts({
        content: {
          width: '640px',
        },
      }),
      full: parts({
        content: {
          width: '100%',
        },
      }),
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function createModalPreset() {
  return definePreset({
    name: 'ui-Modal',
    theme: {
      extend: {
        slotRecipes: {
          modal: slotRecipe,
        },
        semanticTokens: token,
      },
    },
  });
}
