import styled from '@emotion/styled';
import Image from 'next/image';
import { SwapCardPropsType } from './SwapCard.types';

const SwapCard: React.FC<SwapCardPropsType> = () => {
  const tokenName = 'BOKI';
  const tokenAddress = '0x123123123123123123213';
  return (
    <Container>
      <ItemContainer>
        <Wrapper>
          <SwapItem>
            <TokenTextContainer>
              <TokenNameBox>{tokenName}</TokenNameBox>
              <AddressBox>{tokenAddress}</AddressBox>
            </TokenTextContainer>
            <TokenImageBox>
              <Image
                src="/dummy/dummy1.png"
                alt="swap icon"
                width="200px"
                height="200px"
              />
            </TokenImageBox>
          </SwapItem>
        </Wrapper>
        <WrapperCenter>
          <Image
            src="/imgs/swap.png"
            alt="swap icon"
            width="100%"
            height="100%"
            style={{
              backgroundColor: 'white',
              borderRadius: '100%',
            }}
          />
        </WrapperCenter>
        <Wrapper>
          <SwapItem>
            <TokenNameBox>{tokenName}</TokenNameBox>
            <AddressBox>{tokenAddress}</AddressBox>
            <TokenImageBox>
              <Image
                src="/dummy/dummy2.png"
                alt="swap icon"
                width="200px"
                height="200px"
              />
            </TokenImageBox>
          </SwapItem>
        </Wrapper>
      </ItemContainer>
      <SwapButton>SWAP</SwapButton>
    </Container>
  );
};

export default SwapCard;

const Container = styled.div`
  border-bottom: 1px solid #333;
  padding: 10px 0;
`;
const ItemContainer = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  width: 100%;
`;
const WrapperCenter = styled.div`
  width: 100%;
  height: 100%;
  max-width: 50px;
  max-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 720px) {
    max-width: 40px;
    max-height: 40px;
  }
  @media screen and (max-width: 540px) {
    max-width: 30px;
    max-height: 30px;
  }
`;

const SwapItem = styled.div`
  min-width: 200px;
  margin: 0 auto;
  padding: 10px 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const TokenImageBox = styled.div`
  max-width: 200px;
  max-height: 200px;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 720px) {
    max-width: 150px;
    max-height: 150px;
  }
  @media screen and (max-width: 540px) {
    max-width: 100px;
    max-height: 100px;
  }
`;
const TokenTextContainer = styled.div`
  max-height: 100px;
  height: 100%;
  width: 100%;
  padding: 3px 0;
`;
const TokenNameBox = styled.h3`
  font-size: 20px;
  margin: 0px;

  @media screen and (max-width: 720px) {
    font-size: 17px;
  }
  @media screen and (max-width: 540px) {
    font-size: 15px;
  }
`;

const AddressBox = styled.p`
  font-size: 13px;
  margin: 0px;

  @media screen and (max-width: 540px) {
    font-size: 10px;
  }
`;

const SwapButton = styled.div`
  border: 1px solid red;
  border-radius: 8px;
  text-align: center;
  max-width: 150px;
  width: 100%;
  padding: 8px 10px;
  cursor: pointer;
  margin: 0 auto;

  :hover {
    background-color: red;
  }
  @media screen and (max-width: 720px) {
    font-size: 17px;
    max-width: 100px;
    padding: 5px 10px;
  }
  @media screen and (max-width: 540px) {
    font-size: 12px;
    max-width: 90px;
  }
`;
