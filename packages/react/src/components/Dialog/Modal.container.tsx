import { splitProps } from '@/utils/splitProps';
import { injectDataset } from '@/utils/injectDataset';
import { injectBaseProps } from '@/utils/define-inject-context';
import { dialog, type DialogVariant } from '@/styled-system/recipes';
import { Portal, type PortalProps } from './widgets/imports';
import type { DialogPositionerProps } from './widgets/Positioner';
import type { DialogTriggerProps } from './widgets/Trigger';
import type { DialogBackdropProps } from './widgets/Backdrop';
import type { DialogCloseTriggerProps } from './widgets/CloseTrigger';
import type { DialogTitleProps } from './widgets/Title';
import type { DialogContentProps } from './widgets/Content';
import type { DialogDescriptionProps } from './widgets/Description';
import type { DialogActionProps } from './widgets/Action';
import defineDialog from './Dialog.atomic';
import { fadeInPlugin } from './plugins/fadeInAnimate';
import { modalPlugin } from './plugins/modal';
import { DialogConsumer } from './core/context';

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

const ModalRoot = injectBaseProps(Root, {
  plugins: [fadeInPlugin, modalPlugin],
});

type BaseModalProps = React.ComponentProps<typeof ModalRoot>;
export interface ModalProps extends BaseModalProps, Partial<DialogVariant> {
  attrs?: {
    trigger?: DialogTriggerProps;
    content?: DialogContentProps;
    closeTrigger?: DialogCloseTriggerProps;
    backdrop?: DialogBackdropProps;
    positioner?: DialogPositionerProps;
    title?: DialogTitleProps;
    description?: DialogDescriptionProps;
    action?: DialogActionProps;
    portal?: PortalProps;
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

function Modal(props: ModalProps) {
  const [{ attrs = {}, children, titleNode, descriptionNode, actionNode, triggerNode }, rootProps] =
    splitProps(props, ...propKeys);
  return (
    <ModalRoot {...rootProps}>
      {triggerNode && <Trigger {...attrs.trigger}>{triggerNode}</Trigger>}
      <DialogConsumer>
        {(ctx) => (
          <Portal {...ctx.getPortalProps(attrs.portal)}>
            <Backdrop {...attrs.backdrop} />
            <Positioner {...attrs.positioner}>
              <Content {...attrs.content}>
                <CloseTrigger {...attrs.closeTrigger} />
                {titleNode && <Title {...attrs.title}>{titleNode}</Title>}
                {descriptionNode && (
                  <Description {...attrs.description}>{descriptionNode}</Description>
                )}
                {children}
                {actionNode && <Action {...attrs.action}>{actionNode}</Action>}
              </Content>
            </Positioner>
          </Portal>
        )}
      </DialogConsumer>
    </ModalRoot>
  );
}

Modal.displayName = 'Modal';
Modal.Root = ModalRoot;
Modal.Trigger = Trigger;
Modal.Backdrop = Backdrop;
Modal.Positioner = Positioner;
Modal.Content = Content;
Modal.Title = Title;
Modal.Description = Description;
Modal.CloseTrigger = CloseTrigger;
Modal.Action = Action;

export default Modal;
