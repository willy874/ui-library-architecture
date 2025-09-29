import { definePreset, defineSemanticTokens, defineSlotRecipe } from '@pandacss/dev';
import { dialogAnatomy } from '@ui-library-architecture/anatomy';

export const token = defineSemanticTokens({});

export const slotRecipe = defineSlotRecipe({
  className: 'ui-dialog',
  slots: dialogAnatomy.keys(),
  base: {
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
  },
  variants: {
    size: {
      sm: {
        content: {
          width: '280px',
        },
      },
      md: {
        content: {
          width: '360px',
        },
      },
      lg: {
        content: {
          width: '480px',
        },
      },
      xl: {
        content: {
          width: '640px',
        },
      },
      full: {
        content: {
          width: '100%',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function createDialogPreset() {
  return definePreset({
    name: 'ui-Dialog',
    theme: {
      extend: {
        slotRecipes: {
          dialog: slotRecipe,
        },
        semanticTokens: token,
      },
    },
  });
}
