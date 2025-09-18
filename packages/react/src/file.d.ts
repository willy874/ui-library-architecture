declare module '*.svg' {
  const svg: string;
  export default svg;
}

declare module '*.png' {
  const png: string;
  export default png;
}

interface SvgProps extends React.SVGProps<SVGSVGElement> {}
const SvgComponent: React.FC<SvgProps>;

declare module '*.svg?react' {
  import React from 'react';
  export default SvgComponent;
}
