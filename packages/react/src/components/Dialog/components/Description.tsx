import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { useDialogContext } from '../Dialog.context';

export interface DescriptionProps extends HTMLProps<'div'> {}

const Description = forwardRef<HTMLDivElement, DescriptionProps>(({ children, ...props }, ref) => {
  const { getDescriptionProps } = useDialogContext();
  return (
    <ui.div {...getDescriptionProps()} {...props} ref={ref}>
      {children}
    </ui.div>
  );
});

export default Description;
