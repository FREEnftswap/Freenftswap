import styled from '@emotion/styled';
import { ethers } from 'ethers';
import { useRecoilState } from 'recoil';
import { isCreateSwapModalState, walletAddressState } from '../../Atoms';
import { NavbarPropsType } from './Navbar.types';
declare global {
  interface Window {
    ethereum?: any;
  }
}
const Navbar: React.FC<NavbarPropsType> = () => {
  const [walletAddress, setWalletAddress] = useRecoilState(walletAddressState);

  const [isCreateSwapModal, setIsCreateSwapModal] =
    useRecoilState(isCreateSwapModalState);

  const createSwapModalHandler = () => {
    setIsCreateSwapModal(true);
  };

  const walletConnectHandler = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      // console.log('Account:');
      setWalletAddress(account);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <h1>Free Nft Swap</h1>
          <ButtonContainer>
            {walletAddress ? (
              <CreateSwapItem onClick={createSwapModalHandler}>
                <span>Create Swap</span>
              </CreateSwapItem>
            ) : (
              <CreateSwapItemDisAble>
                <span>Create Swap</span>
              </CreateSwapItemDisAble>
            )}
            <ConnectWallet onClick={walletConnectHandler}>
              <span>{walletAddress ? <>{walletAddress}</> : 'Wallet Connect'}</span>
            </ConnectWallet>
          </ButtonContainer>
        </Wrapper>
      </Container>
      <div style={{ height: '68px' }} />
    </>
  );
};

export default Navbar;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0px 20px;
  font-size: 12px;
  font-weight: 300;
  z-index: 1000000;
  background-color: #000;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  h1 {
    font-style: italic;
    margin: 0;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 20px;
`;

const ConnectWallet = styled.div`
  border: 1px solid red;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 38px;
  cursor: pointer;

  span {
    text-align: center;
  }
`;

const CreateSwapItem = styled.div`
  border: 1px solid #ddd022;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 38px;
  cursor: pointer;

  span {
    text-align: center;
  }
`;

const CreateSwapItemDisAble = styled.div`
  border: 1px solid #ddd022;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 38px;
  cursor: not-allowed;
  color: #8d8d8d;
  background-color: #232323;

  span {
    text-align: center;
  }
`;
