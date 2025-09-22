import { dialog } from '@/styled-system/recipes';
import { createStyleContext } from '@/utils/create-style-context';
import Root from './components/Root';
import Trigger from './components/Trigger';
import Backdrop from './components/Backdrop';
import Positioner from './components/Positioner';
import Content from './components/Content';
import Title from './components/Title';
import Description from './components/Description';
import CloseTrigger from './components/CloseTrigger';
import Action from './components/Action';

const { withProvider, withContext } = createStyleContext(dialog);

const Dialog = {
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

export default Dialog;
