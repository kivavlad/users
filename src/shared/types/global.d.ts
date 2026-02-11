declare module '*.svg' {
  import type * as React from 'react';

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;

  export default ReactComponent;
  export { ReactComponent };
}