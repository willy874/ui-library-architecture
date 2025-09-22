import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { useDialogContext } from '../Dialog.context';

export interface ContentProps extends HTMLProps<'div'> {}

const Content = forwardRef<HTMLDivElement, ContentProps>(({ children, ...props }, ref) => {
  const { getContentProps } = useDialogContext();
  return (
    <ui.div {...getContentProps()} {...props} ref={ref}>
      {children}
    </ui.div>
  );
});

export default Content;
