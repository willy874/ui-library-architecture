import { modal, type ModalVariant } from 'styled-system/recipes';
import type { ModalStylesFn } from './variants';

export const modalStyles: ModalStylesFn<Partial<ModalVariant>> = (props) => {
  const variants = modal.getVariantProps(props) as ModalVariant;
  return [modal(variants), variants];
};
