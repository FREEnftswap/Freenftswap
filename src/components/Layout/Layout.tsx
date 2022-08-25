import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { isCreateSwapModalState } from '../../Atoms';
import CreateSwapModal from '../CreateSwapModal';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { LayoutPropsType } from './Layout.types';

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  const [isCreateSwapModal] = useRecoilState(isCreateSwapModalState);
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>{children}</Wrapper>
      </Container>
      <Footer />
      {isCreateSwapModal ? <CreateSwapModal /> : null}
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
  max-width: 1240px;
  padding: 20px;
`;
