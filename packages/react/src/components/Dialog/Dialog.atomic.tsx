import { defineInjectContext } from '@/utils/define-inject-context';
import type { DefineInjectContextRecipe } from '@/utils/define-inject-context';
import Root from './widgets/Root';
import DialogPortal from './widgets/Portal';
import Trigger from './widgets/Trigger';
import Backdrop from './widgets/Backdrop';
import Positioner from './widgets/Positioner';
import Content from './widgets/Content';
import Title from './widgets/Title';
import Description from './widgets/Description';
import CloseTrigger from './widgets/CloseTrigger';
import Action from './widgets/Action';
import type { Parts } from './core/anatomy';

function Dialog(recipe: DefineInjectContextRecipe<Parts>) {
  const { withProvider, withContext } = defineInjectContext(recipe);
  return {
    Root: withProvider(Root),
    Trigger: withContext(Trigger, 'trigger'),
    Backdrop: withContext(Backdrop, 'backdrop'),
    Positioner: withContext(Positioner, 'positioner'),
    Content: withContext(Content, 'content'),
    Title: withContext(Title, 'title'),
    Description: withContext(Description, 'description'),
    CloseTrigger: withContext(CloseTrigger, 'closeTrigger'),
    Action: withContext(Action, 'action'),
  };
}

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
