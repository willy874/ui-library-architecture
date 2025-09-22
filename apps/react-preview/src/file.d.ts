declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg?react' {
  import React from 'react';

  interface SvgProps extends React.SVGProps<SVGSVGElement> {}
  const SvgComponent: React.FC<SvgProps>;
  export default SvgComponent;
}

declare module '*.css' {
  const content: string;
  export default content;
}
