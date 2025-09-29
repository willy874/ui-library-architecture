import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { useDialogContext } from '../core/context';

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
