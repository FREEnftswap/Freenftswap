import React from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import {
  haveCreateSwapState,
  isCreateSwapModalState,
  walletAddressState,
  wantCreateSwapState,
} from '../../Atoms';
import CreateSwapForm from '../CreateSwapForm';
import { CreateSwapModalPropsType } from './CreateSwapModal.types';
import { firebaseCreator } from '../../utils/Handler/firebaseHandler';
import { dbService } from '../../utils/FB';
import { ethers } from 'ethers';
import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';

const CreateSwapModal: React.FC<CreateSwapModalPropsType> = () => {
  const [walletAddress] = useRecoilState(walletAddressState);

  const [isCreateSwapModal, setIsCreateSwapModal] =
    useRecoilState(isCreateSwapModalState);

  const [haveCreateSwap, setHaveCreateSwap] = useRecoilState(haveCreateSwapState);
  const [wantCreateSwap, setWantCreateSwap] = useRecoilState(wantCreateSwapState);

  const createSwapModalHandler = () => {
    setIsCreateSwapModal(false);
  };

  const setSigner = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const fulfillerAddress = accounts[0];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(fulfillerAddress);
    console.log(signature);
    return { signer, fulfillerAddress };
  };

  const seaportCreateOrder = async () => {
    const { signer, fulfillerAddress }: any = await setSigner();
    const fulfiller = fulfillerAddress;

    const seaport = new Seaport(signer, {
      overrides: { contractAddress: '0x5C829805796843A285C0cb875E34BB67Abb99B22' },
    });
    console.log('haveCreateSwap : ', haveCreateSwap);

    let offerData: any;
    let considerationData: any;
    if (haveCreateSwap[0] === 'erc721') {
      offerData = [
        {
          itemType: ItemType.ERC721,
          token: haveCreateSwap[1],
          identifier: haveCreateSwap[2],
        },
      ];
    } else if (haveCreateSwap[0] === 'matic') {
      offerData = [
        {
          amount: ethers.utils.parseEther(haveCreateSwap[1]).toString(),
          recipient: fulfiller,
        },
      ];
    }

    if (wantCreateSwap[0] === 'erc721') {
      considerationData = [
        {
          itemType: ItemType.ERC721,
          token: wantCreateSwap[1],
          identifier: wantCreateSwap[2],
        },
      ];
    } else if (wantCreateSwap[0] === 'matic') {
      considerationData = [
        {
          amount: ethers.utils.parseEther(wantCreateSwap[1]).toString(),
          recipient: fulfiller,
        },
      ];
    }

    console.log('order value', {
      offer: [...offerData],
      consideration: [...considerationData],
    });

    const { executeAllActions } = await seaport.createOrder({
      offer: [...offerData],
      consideration: [...considerationData],
    });

    const order = await executeAllActions();
    return order;
  };

  const formSubmit = async () => {
    const { haveData, wantData } = await createDataHandler();
    const order = await seaportCreateOrder();
    await firebaseCreator(walletAddress, haveData, wantData, order);
    createSwapModalHandler();
  };

  const createDataHandler = async () => {
    let haveData;
    let wantData;
    if (haveCreateSwap[0] === 'matic') {
      haveData = {
        type: haveCreateSwap[0],
        amount: haveCreateSwap[1],
      };
    } else if (haveCreateSwap[0] === 'erc20') {
      haveData = {
        type: haveCreateSwap[0],
        address: haveCreateSwap[1],
        amount: haveCreateSwap[2],
      };
    } else if (haveCreateSwap[0] === 'erc721') {
      haveData = {
        type: haveCreateSwap[0],
        address: haveCreateSwap[1],
        id: haveCreateSwap[2],
      };
    }

    if (wantCreateSwap[0] === 'matic') {
      wantData = {
        type: wantCreateSwap[0],
        amount: wantCreateSwap[1],
      };
    } else if (wantCreateSwap[0] === 'erc20') {
      wantData = {
        type: wantCreateSwap[0],
        address: wantCreateSwap[1],
        amount: wantCreateSwap[2],
      };
    } else if (haveCreateSwap[0] === 'erc721') {
      wantData = {
        type: wantCreateSwap[0],
        address: wantCreateSwap[1],
        id: wantCreateSwap[2],
      };
    }

    return { haveData, wantData };
  };

  return (
    <Container>
      <Wrapper>
        <HeadContainer>
          <h2>CREATE SWAP</h2>
          <div onClick={createSwapModalHandler}>
            <span>X</span>
          </div>
        </HeadContainer>
        <FormContainer>
          <Card>
            <Title>HAVE</Title>
            <CreateSwapForm category="have" />
          </Card>
          <hr style={{ borderColor: '#6d6d6d' }} />
          <Card>
            <Title>WANT</Title>
            <CreateSwapForm category="want" />
          </Card>
          <Button onClick={formSubmit}>Submit</Button>
        </FormContainer>
      </Wrapper>
    </Container>
  );
};

export default CreateSwapModal;

const Container = styled.div`
  z-index: 1000000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 1000px;

  background-color: #323232;
  border-radius: 20px;
  padding: 20px;
`;
const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    font-size: 25px;
    margin-top: 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }
`;

const FormContainer = styled.div``;
const Card = styled.div`
  margin-bottom: 50px;
`;
const Title = styled.h3``;
const Button = styled.div`
  width: calc(100% - 40px);
  position: absolute;
  bottom: 20px;
  border: 1px solid red;
  border-radius: 8px;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;

  :hover {
    background-color: red;
  }
`;
