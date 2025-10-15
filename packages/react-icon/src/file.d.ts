declare module '*.svg' {
  const svg: string;
  export default svg;
}

interface SvgProps extends React.SVGProps<SVGSVGElement> {}
const SvgComponent: React.FC<SvgProps>;

declare module '*.svg?react' {
  import React from 'react';
  export default SvgComponent;
}
