import {
  Button as CoreButton,
  type ButtonHTMLAttributes,
  type ButtonProps as CoreButtonProps,
} from '@/components';
import { Button as ContainerButton, type ButtonProps } from './Button';

type ButtonComponent = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> &
    React.RefAttributes<HTMLButtonElement>
> & {
  Core: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<CoreButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> &
      React.RefAttributes<HTMLButtonElement>
  >;
  Block: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ButtonProps & ButtonHTMLAttributes<HTMLElement>> &
      React.RefAttributes<HTMLElement>
  >;
  Link: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ButtonProps & ButtonHTMLAttributes<HTMLAnchorElement>> &
      React.RefAttributes<HTMLAnchorElement>
  >;
};

export const Button = Object.assign(ContainerButton, {
  Core: CoreButton,
  Block: ContainerButton,
  Link: ContainerButton,
}) as ButtonComponent;
