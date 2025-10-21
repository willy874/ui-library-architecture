export interface ButtonVariant {
  /**
   * @default "neutral"
   */
  theme:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger';
  /**
   * @default "filled"
   */
  variant: 'filled' | 'outlined' | 'text' | 'link';
  /**
   * @default "medium"
   */
  size: 'small' | 'medium' | 'large';
  /**
   * @default "rounded"
   */
  shape: 'rounded' | 'square' | 'pill' | 'circle';
}

export const buttonVariantKeys = ['theme', 'variant', 'size', 'shape'] as const;

export type AnatomyParts = 'button';

export type ButtonStylesFn<T extends Partial<ButtonVariant>> = (
  props: T,
) => [Record<AnatomyParts, string>, Required<Pick<T, keyof ButtonVariant>>];
