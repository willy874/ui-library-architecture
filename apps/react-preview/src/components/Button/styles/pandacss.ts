import { button } from 'styled-system/recipes';
import type { ButtonStylesFn, ButtonVariant } from './variants';

export const buttonStyles: ButtonStylesFn<Partial<ButtonVariant>> = (props) => {
  const variants = button.getVariantProps(props) as ButtonVariant;
  return [
    {
      button: button(variants),
    },
    variants,
  ];
};
