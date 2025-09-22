import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { useDialogContext } from '../Dialog.context';

export interface TitleProps extends HTMLProps<'div'> {}

const Title = forwardRef<HTMLDivElement, TitleProps>(({ children, ...props }, ref) => {
  const { getTitleProps } = useDialogContext();
  return (
    <ui.div {...getTitleProps()} {...props} ref={ref}>
      {children}
    </ui.div>
  );
});

export default Title;
