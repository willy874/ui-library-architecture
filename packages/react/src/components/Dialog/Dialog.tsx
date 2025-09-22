import { splitProps } from '@/utils/splitProps';
import StyledDialog from './Dialog.style';
import type { DialogPortalProps } from './components/Portal';
import type { DialogRootProps } from './components/Root';
import DialogPortal from './components/Portal';

export interface DialogProps extends DialogRootProps {
  attrs?: {
    trigger?: React.HTMLAttributes<HTMLButtonElement>;
    content?: React.HTMLAttributes<HTMLDivElement>;
    closeTrigger?: React.HTMLAttributes<HTMLButtonElement>;
    backdrop?: React.HTMLAttributes<HTMLDivElement>;
    positioner?: React.HTMLAttributes<HTMLDivElement>;
    title?: React.HTMLAttributes<HTMLDivElement>;
    description?: React.HTMLAttributes<HTMLDivElement>;
    action?: React.HTMLAttributes<HTMLDivElement>;
    portal?: DialogPortalProps;
  };
  titleNode?: React.ReactNode;
  descriptionNode?: React.ReactNode;
  actionNode?: React.ReactNode;
  triggerNode?: React.ReactNode;
  children?: React.ReactNode;
}

const propKeys = [
  'attrs',
  'children',
  'titleNode',
  'descriptionNode',
  'actionNode',
  'triggerNode',
] as const;

function Dialog(props: DialogProps) {
  const [{ attrs, children, titleNode, descriptionNode, actionNode, triggerNode }, rootProps] =
    splitProps(props, ...propKeys);
  return (
    <StyledDialog.Root {...rootProps}>
      {triggerNode && (
        <StyledDialog.Trigger {...attrs?.trigger}>{triggerNode}</StyledDialog.Trigger>
      )}
      <DialogPortal {...attrs?.portal}>
        <StyledDialog.Backdrop {...attrs?.backdrop} />
        <StyledDialog.Positioner {...attrs?.positioner}>
          <StyledDialog.Content {...attrs?.content}>
            <StyledDialog.CloseTrigger {...attrs?.closeTrigger} />
            {titleNode && <StyledDialog.Title {...attrs?.title}>{titleNode}</StyledDialog.Title>}
            {descriptionNode && (
              <StyledDialog.Description {...attrs?.description}>
                {descriptionNode}
              </StyledDialog.Description>
            )}
            {children}
            {actionNode && (
              <StyledDialog.Action {...attrs?.action}>{actionNode}</StyledDialog.Action>
            )}
          </StyledDialog.Content>
        </StyledDialog.Positioner>
      </DialogPortal>
    </StyledDialog.Root>
  );
}
Dialog.displayName = 'Dialog';
Dialog.Root = StyledDialog.Root;
Dialog.Portal = DialogPortal;
Dialog.Trigger = StyledDialog.Trigger;
Dialog.Backdrop = StyledDialog.Backdrop;
Dialog.Positioner = StyledDialog.Positioner;
Dialog.Content = StyledDialog.Content;
Dialog.Title = StyledDialog.Title;
Dialog.Description = StyledDialog.Description;
Dialog.CloseTrigger = StyledDialog.CloseTrigger;
Dialog.Action = StyledDialog.Action;

export default Dialog;
