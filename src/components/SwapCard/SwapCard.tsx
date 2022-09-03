import styled from '@emotion/styled';
import { Seaport } from '@opensea/seaport-js';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import getNftMetadata from '../../utils/web3/getNFTmetadata';
import { SwapCardPropsType } from './SwapCard.types';
import { toast, ToastContainer } from 'react-toastify';

const SwapCard: React.FC<SwapCardPropsType> = ({ data }) => {
  const [have, setHave] = useState<any>({});
  const [want, setWant] = useState<any>({});
  const [order, setOrder] = useState<any>({});

  useEffect(() => {
    (async () => {
      if (data.have.type === 'erc721') {
        setHave(await getNftMetadata(data.have.address, data.have.id));
      }
      if (data.want.type === 'erc721') {
        setWant(await getNftMetadata(data.want.address, data.want.id));
      }
    })();
    if (have.rawMetadata) {
      // console.log('\n\n !!!');
      console.log(have);
    }

    setOrder(data.order);
  }, [data]);

  useEffect(() => {
    console.log(data);
  }, [have, want]);

  const seaportOrderSwap = async (_data: any) => {
    console.log('_data : ', _data);
    const fulfiller = _data.walletAddress;

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const address = accounts[0];
    const offerer = address;
    console.log(fulfiller, offerer);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(address);

    const seaport = new Seaport(signer, {
      overrides: { contractAddress: '0x5C829805796843A285C0cb875E34BB67Abb99B22' },
    });
    const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
      order,
      accountAddress: fulfiller,
      recipientAddress: offerer,
    });
    const transaction = await executeAllFulfillActions();
    console.log('transaction result : ', transaction);
    if (transaction) {
      notify();
    }
  };
  const notify = () =>
    toast('🦄 swap success', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  return (
    <Container>
      <ItemContainer>
        <Wrapper>
          <SwapItem>
            <TokenTextContainer>
              <TokenNameBox>
                {have.title} #{have.tokenId}
              </TokenNameBox>
              <AddressBox>{have.contract?.address}</AddressBox>
            </TokenTextContainer>
            <TokenImageBox>
              {have.rawMetadata?.image ? (
                <img
                  src={`https://ipfs.io/ipfs/${have.rawMetadata?.image.replace(
                    'ipfs:/',
                    '',
                  )}`}
                  alt="swap icon"
                  width="200px"
                  height="200px"
                />
              ) : (
                <div
                  style={{ width: '200px', height: '200px', backgroundColor: 'grey' }}
                />
              )}
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
        {data.want.type ? (
          <Wrapper>
            <SwapItem>
              <TokenTextContainer>
                <TokenNameBox>matic</TokenNameBox>
                <AddressBox>{data.want.amount} matic</AddressBox>
              </TokenTextContainer>
              <TokenImageBox>
                <Image
                  src="/imgs/matic.png"
                  alt="swap icon"
                  width="200px"
                  height="200px"
                />
              </TokenImageBox>
            </SwapItem>
          </Wrapper>
        ) : (
          <Wrapper>
            <SwapItem>
              <TokenTextContainer>
                <TokenNameBox>
                  {data.want.title} #{data.want.tokenId}
                </TokenNameBox>
                <AddressBox>{want.contract?.address}</AddressBox>
              </TokenTextContainer>
              <TokenImageBox>
                {want.rawMetadata?.image ? (
                  <>
                    <img
                      src={`https://ipfs.io/ipfs/${want.rawMetadata?.image.replace(
                        'ipfs:/',
                        '',
                      )}`}
                      alt="swap icon"
                      width="200px"
                      height="200px"
                    />
                  </>
                ) : null}
              </TokenImageBox>
            </SwapItem>
          </Wrapper>
        )}
      </ItemContainer>
      <SwapButton
        onClick={() => {
          seaportOrderSwap(data);
        }}
      >
        SWAP
      </SwapButton>
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
