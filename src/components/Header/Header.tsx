'use client';
import { PropsWithChildren } from 'react';
import { AppBar, styled } from '@mui/material';
import { Container } from '@/components/Container';

const HeaderContainer = styled(Container)`
  padding: 10px 0;
`;

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <AppBar>
      <HeaderContainer maxWidth="md">{children}</HeaderContainer>
    </AppBar>
  );
};
