import { default as Close } from './x.svg?react';
import { default as Eye } from './eye.svg?react';
import { default as EyeSlash } from './eye-slash.svg?react';
import { default as Spinner } from './spinner.svg?react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {}

const CloseIcon = Close as React.FC<SvgProps>;
const EyeIcon = Eye as React.FC<SvgProps>;
const EyeSlashIcon = EyeSlash as React.FC<SvgProps>;
const SpinnerIcon = Spinner as React.FC<SvgProps>;

export { CloseIcon, EyeIcon, EyeSlashIcon, SpinnerIcon };
