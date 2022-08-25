import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  haveCreateSwapState,
  isCreateSwapModalState,
  wantCreateSwapState,
} from '../../Atoms';
import CreateSwapForm from '../CreateSwapForm';
import { CreateSwapModalPropsType } from './CreateSwapModal.types';

const CreateSwapModal: React.FC<CreateSwapModalPropsType> = () => {
  const [isCreateSwapModal, setIsCreateSwapModal] =
    useRecoilState(isCreateSwapModalState);

  const [haveCreateSwap, setHaveCreateSwap] = useRecoilState(haveCreateSwapState);

  const [wantCreateSwap, setWantCreateSwap] = useRecoilState(wantCreateSwapState);

  const createSwapModalHandler = () => {
    setIsCreateSwapModal(false);
  };

  const formSubmit = () => {
    alert(haveCreateSwap);
    alert(wantCreateSwap);
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
