import { splitProps } from '@/utils/splitProps';
import { injectDataset } from '@/utils/injectDataset';
import { dialog, type DialogVariant } from '@/styled-system/recipes';
import type { DialogRootProps } from './widgets/Root';
import DialogPortal from './widgets/Portal';
import type { DialogPortalProps } from './widgets/Portal';
import type { DialogPositionerProps } from './widgets/Positioner';
import type { DialogTriggerProps } from './widgets/Trigger';
import type { DialogBackdropProps } from './widgets/Backdrop';
import type { DialogCloseTriggerProps } from './widgets/CloseTrigger';
import type { DialogTitleProps } from './widgets/Title';
import type { DialogContentProps } from './widgets/Content';
import type { DialogDescriptionProps } from './widgets/Description';
import type { DialogActionProps } from './widgets/Action';
import defineDialog from './Dialog.atomic';

const { Root, Trigger, Backdrop, Positioner, Content, Title, Description, CloseTrigger, Action } =
  defineDialog((props) => {
    const variants = dialog.getVariantProps(dialog.splitVariantProps(props)[0]) as DialogVariant;
    const slotStyles = dialog(variants);
    const dataset = injectDataset({
      size: variants.size,
    });
    return {
      trigger: { className: slotStyles.trigger, ...dataset },
      content: { className: slotStyles.content, ...dataset },
      closeTrigger: { className: slotStyles.closeTrigger, ...dataset },
      backdrop: { className: slotStyles.backdrop, ...dataset },
      positioner: { className: slotStyles.positioner, ...dataset },
      title: { className: slotStyles.title, ...dataset },
      description: { className: slotStyles.description, ...dataset },
      action: { className: slotStyles.action, ...dataset },
    };
  });

export interface DialogProps extends DialogRootProps {
  attrs?: {
    trigger?: DialogTriggerProps;
    content?: DialogContentProps;
    closeTrigger?: DialogCloseTriggerProps;
    backdrop?: DialogBackdropProps;
    positioner?: DialogPositionerProps;
    title?: DialogTitleProps;
    description?: DialogDescriptionProps;
    action?: DialogActionProps;
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
    <Root {...rootProps}>
      {triggerNode && <Trigger {...attrs?.trigger}>{triggerNode}</Trigger>}
      <DialogPortal {...attrs?.portal}>
        <Backdrop {...attrs?.backdrop} />
        <Positioner {...attrs?.positioner}>
          <Content {...attrs?.content}>
            <CloseTrigger {...attrs?.closeTrigger} />
            {titleNode && <Title {...attrs?.title}>{titleNode}</Title>}
            {descriptionNode && (
              <Description {...attrs?.description}>{descriptionNode}</Description>
            )}
            {children}
            {actionNode && <Action {...attrs?.action}>{actionNode}</Action>}
          </Content>
        </Positioner>
      </DialogPortal>
    </Root>
  );
}

Dialog.displayName = 'Dialog';
Dialog.Root = Root;
Dialog.Portal = DialogPortal;
Dialog.Trigger = Trigger;
Dialog.Backdrop = Backdrop;
Dialog.Positioner = Positioner;
Dialog.Content = Content;
Dialog.Title = Title;
Dialog.Description = Description;
Dialog.CloseTrigger = CloseTrigger;
Dialog.Action = Action;

export default Dialog;
