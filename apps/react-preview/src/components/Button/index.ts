import { Button as _Button, type ContainerButtonProps } from './Button';
import { BlockButton as _BlockButton, type BlockButtonProps } from './BlockButton';
import { LinkButton as _LinkButton, type LinkButtonProps } from './LinkButton';

export const Button = _Button as React.ForwardRefExoticComponent<
  ContainerButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export const BlockButton = _BlockButton as React.ForwardRefExoticComponent<
  BlockButtonProps & React.RefAttributes<HTMLElement>
>;

export const LinkButton = _LinkButton as React.ForwardRefExoticComponent<
  LinkButtonProps & React.RefAttributes<HTMLAnchorElement>
>;
