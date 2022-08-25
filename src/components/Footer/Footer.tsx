import styled from '@emotion/styled';
import { FooterPropsType } from './Footer.types';

const Footer: React.FC<FooterPropsType> = () => {
  return (
    <Container>
      <Wrapper>
        <span>© 2022</span>
        <a href="https://github.com/FREEnftswap" target="_blank" rel="noreferrer">
          FreenftSwap
        </a>
      </Wrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 12px;
  font-weight: 300;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1240px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 5px;
  a {
    text-decoration: underline;
    color: #3a95ff;
  }
`;
