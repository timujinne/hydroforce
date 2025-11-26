declare module 'react-router-hash-link' {
  import { LinkProps } from 'react-router-dom';
  import React from 'react';

  export interface HashLinkProps extends LinkProps {
    smooth?: boolean;
    scroll?: (el: HTMLElement) => void;
  }

  export const HashLink: React.ForwardRefExoticComponent<
    HashLinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  
  export const NavHashLink: React.ForwardRefExoticComponent<
    HashLinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
}