import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { useDialogContext } from '../Dialog.context';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { mergeProps } from '@/utils/mergeProps';

export interface PositionerProps extends HTMLProps<'div'> {}

const Positioner = forwardRef<HTMLDivElement, PositionerProps>(({ children, ...props }, ref) => {
  const { getPositionerProps, animationRef } = useDialogContext();
  const composeRef = useForkRef(animationRef, ref);

  return (
    <ui.div {...mergeProps(getPositionerProps(), props)} ref={composeRef}>
      {children}
    </ui.div>
  );
});

export default Positioner;
