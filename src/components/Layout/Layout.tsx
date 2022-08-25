import styled from '@emotion/styled';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { LayoutPropsType } from './Layout.types';

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>{children}</Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 123px);
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 840px;
  padding: 20px;
`;
