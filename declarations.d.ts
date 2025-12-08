export {};

declare module 'react-router-hash-link' {
  import { LinkProps } from 'react-router-dom';
  import * as React from 'react';

  export interface HashLinkProps extends LinkProps {
    smooth?: boolean;
    scroll?: (el: HTMLElement) => void;
    to: string;
    children?: React.ReactNode;
    className?: string;
  }

  export const HashLink: React.ForwardRefExoticComponent<
    HashLinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  
  export const NavHashLink: React.ForwardRefExoticComponent<
    HashLinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      cylinderGeometry: any;
      boxGeometry: any;
      torusGeometry: any;
      extrudeGeometry: any;
      meshStandardMaterial: any;
      primitive: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      directionalLight: any;
      perspectiveCamera: any;
      [elemName: string]: any;
    }
  }
}
