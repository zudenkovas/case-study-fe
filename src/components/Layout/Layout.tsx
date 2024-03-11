import { Header } from '@/components/Header';
import { Container, styled } from '@mui/material';
import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren<{
  headerContent?: React.ReactNode;
}>;

const HeaderContentWrapper = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const MainContainer = styled(Container)`
  padding-top: 70px;
`;

export const Layout = ({ headerContent, children }: LayoutProps) => {
  return (
    <>
      <Header>
        <HeaderContentWrapper>{headerContent}</HeaderContentWrapper>
      </Header>

      <main>
        <MainContainer maxWidth="md">{children}</MainContainer>
      </main>
    </>
  );
};
