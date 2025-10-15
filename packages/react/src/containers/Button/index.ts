import { ContainerButton, BlockButton, LinkButton } from './Button';
import type { ContainerButtonProps, BlockButtonProps, LinkButtonProps } from './Button';

type ButtonComponent = React.ForwardRefExoticComponent<
  ContainerButtonProps & React.RefAttributes<HTMLButtonElement>
> & {
  Core: React.ForwardRefExoticComponent<LinkButtonProps & React.RefAttributes<HTMLElement>>;
  Block: React.ForwardRefExoticComponent<BlockButtonProps & React.RefAttributes<HTMLElement>>;
  Link: React.ForwardRefExoticComponent<LinkButtonProps & React.RefAttributes<HTMLAnchorElement>>;
};

export const Button = Object.assign(ContainerButton, {
  Block: BlockButton,
  Link: LinkButton,
}) as ButtonComponent;
