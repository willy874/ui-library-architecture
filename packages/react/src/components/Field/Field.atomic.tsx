import { createStyleContext, type Recipe } from '@/utils/create-style-context';
import Root from './widgets/Root';
import Label from './widgets/Label';
import Helper from './widgets/Helper';
import Prefix from './widgets/Prefix';
import Suffix from './widgets/Suffix';
import ErrorText from './widgets/ErrorText';
import Wrapper from './widgets/Wrapper';
import PasswordControl from './widgets/PasswordControl';
import Input from './widgets/Input';
import Select from './widgets/Select';
import Textarea from './widgets/Textarea';

function Field(recipe: Recipe) {
  const { withRootProvider, withContext } = createStyleContext(recipe);
  return {
    Root: withRootProvider(Root, 'root'),
    Label: withContext(Label, 'label'),
    Helper: withContext(Helper, 'helper'),
    Prefix: withContext(Prefix, 'prefix'),
    Suffix: withContext(Suffix, 'suffix'),
    ErrorText: withContext(ErrorText, 'errorText'),
    Wrapper: withContext(Wrapper, 'wrapper'),
    PasswordControl: withContext(PasswordControl, 'passwordControl'),
    Input: withContext(Input, 'input'),
    Select: withContext(Select, 'select'),
    Textarea: withContext(Textarea, 'textarea'),
  };
}

Field.Root = Root;
Field.Label = Label;
Field.Helper = Helper;
Field.Prefix = Prefix;
Field.Suffix = Suffix;
Field.ErrorText = ErrorText;
Field.PasswordControl = PasswordControl;
Field.Wrapper = Wrapper;
Field.Input = Input;
Field.Select = Select;
Field.Textarea = Textarea;

export default Field;
