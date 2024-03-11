import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { PropsWithChildren, RefObject, forwardRef } from 'react';

type LinkProps = MuiLinkProps & NextLinkProps;

const LinkBehavior = forwardRef<HTMLAnchorElement, NextLinkProps>((props, ref) => <NextLink {...props} ref={ref} />);
LinkBehavior.displayName = 'LinkBehavior';

export const Link = ({ children, ...props }: LinkProps) => {
  return (
    <MuiLink {...props} component={LinkBehavior}>
      {children}
    </MuiLink>
  );
};
