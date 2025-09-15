import { field } from '@/styled-system/recipes'
import { createStyleContext } from '@/utils/create-style-context'
import Root from './components/Root'
import Label from './components/Label'
import Helper from './components/Helper'
import Prefix from './components/Prefix'
import Suffix from './components/Suffix'
import ErrorText from './components/ErrorText'
import Wrapper from './components/Wrapper'
import PasswordControl from './components/PasswordControl'
import Input from './components/Input'
import Select from './components/Select'
import Textarea from './components/Textarea'

const { withRootProvider, withContext } = createStyleContext(field)

const Field = {
  Root: withRootProvider(Root),
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
}

export default Field
