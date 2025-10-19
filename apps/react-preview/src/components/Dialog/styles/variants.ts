export interface ModalVariant {
  /**
   * @default "md"
   */
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const modalVariantKeys = ['size'] as const;

export type AnatomyParts =
  | 'trigger'
  | 'closeTrigger'
  | 'backdrop'
  | 'positioner'
  | 'content'
  | 'title'
  | 'description'
  | 'action';

export type ModalStylesFn<T extends Partial<ModalVariant>> = (
  props: T,
) => [Record<AnatomyParts, string>, Required<Pick<T, keyof ModalVariant>>];
