import { splitProps } from '@/utils/splitProps';
import { dialog, type DialogVariant } from '@/styled-system/recipes';
import { ui } from '@/utils/factory';
import { CloseIcon } from '@/assets';
import { Portal } from '@/components/Portal';
import { Button } from '@/components/Button';
import { fadeInPlugin, modalPlugin, useDialogService } from '@/components/Dialog';
import type { ModalPartProps, UseDialogServiceProps } from '@/components/Dialog';

export interface ModalProps extends Omit<UseDialogServiceProps, 'plugins'>, Partial<DialogVariant> {
  titleNode?: React.ReactNode;
  descriptionNode?: React.ReactNode;
  actionNode?: React.ReactNode;
  triggerNode?: React.ReactNode;
  children?: React.ReactNode;
  attrs?: ModalPartProps;
}

const propKeys = [
  'children',
  'titleNode',
  'descriptionNode',
  'actionNode',
  'triggerNode',
  'attrs',
] as const;

function Modal(props: ModalProps) {
  const [containerProps, serviceParams] = splitProps(props, ...propKeys);
  const variants = dialog.getVariantProps(dialog.splitVariantProps(props)[0]);
  const {
    getPortalProps,
    getBackdropProps,
    getPositionerProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getActionProps,
    getOpenTriggerProps,
    getCloseTriggerProps,
  } = useDialogService({
    classNames: dialog(variants),
    plugins: [fadeInPlugin, modalPlugin],
    ...serviceParams,
  });
  const { children, titleNode, descriptionNode, actionNode, triggerNode, attrs } = containerProps;
  return (
    <>
      {triggerNode && <Button {...getOpenTriggerProps(attrs?.trigger)}>{triggerNode}</Button>}
      <Portal {...getPortalProps(attrs?.portal)}>
        <ui.div {...getBackdropProps(attrs?.backdrop)} />
        <ui.div {...getPositionerProps(attrs?.positioner)}>
          <ui.div {...getContentProps(attrs?.content)}>
            <ui.button {...getCloseTriggerProps(attrs?.closeTrigger)}>{<CloseIcon />}</ui.button>
            {titleNode && <ui.div {...getTitleProps(attrs?.title)}>{titleNode}</ui.div>}
            {descriptionNode && (
              <ui.div {...getDescriptionProps(attrs?.description)}>{descriptionNode}</ui.div>
            )}
            {children}
            {actionNode && <ui.div {...getActionProps(attrs?.action)}>{actionNode}</ui.div>}
          </ui.div>
        </ui.div>
      </Portal>
    </>
  );
}

export default Modal;
