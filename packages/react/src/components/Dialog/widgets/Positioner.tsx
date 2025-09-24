import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { useDialogContext } from '../core/context';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { mergeProps } from '@/utils/mergeProps';

export interface DialogPositionerProps extends HTMLProps<'div'> {}

const DialogPositioner = forwardRef<HTMLDivElement, DialogPositionerProps>(
  ({ children, ...props }, ref) => {
    const { getPositionerProps, animationRef } = useDialogContext();
    const composeRef = useForkRef(animationRef, ref);

    return (
      <ui.div {...mergeProps(getPositionerProps(), props)} ref={composeRef}>
        {children}
      </ui.div>
    );
  },
);

DialogPositioner.displayName = 'DialogPositioner';

export default DialogPositioner;
