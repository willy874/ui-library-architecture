import { SpinnerIcon } from '@ui-library-architecture/react-icon';

export const Spinner = () => <SpinnerIcon />;

export type ButtonHTMLAttributes<T extends HTMLElement> = Omit<
  React.ButtonHTMLAttributes<T>,
  keyof React.HTMLAttributes<T>
>;
