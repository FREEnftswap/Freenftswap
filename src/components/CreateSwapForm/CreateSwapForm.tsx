import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { haveCreateSwapState, wantCreateSwapState } from '../../Atoms';
import { useInput, useSelect } from '../../hooks';
import { CreateSwapFormPropsType } from './CreateSwapForm.types';

const CreateSwapForm: React.FC<CreateSwapFormPropsType> = ({ category }) => {
  const [selectValue, handleSelect] = useSelect('matic');
  const [inputValue1, handleInput1] = useInput('');
  const [inputValue2, handleInput2] = useInput('');

  const [haveCreateSwap, setHaveCreateSwap] = useRecoilState(haveCreateSwapState);
  const [wantCreateSwap, setWantCreateSwap] = useRecoilState(wantCreateSwapState);

  useEffect(() => {
    if (category === 'have' && selectValue && selectValue === 'matic') {
      setHaveCreateSwap(() => [selectValue, inputValue1]);
    } else if (category === 'have' && selectValue) {
      setHaveCreateSwap(() => [selectValue, inputValue1, inputValue2]);
    } else {
      setWantCreateSwap([selectValue, inputValue1, inputValue2]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue1, inputValue2, selectValue]);

  useEffect(() => {
    handleInput1('');
    handleInput2('');

    if (category === 'have' && selectValue) {
      setHaveCreateSwap(() => []);
    } else {
      setWantCreateSwap([]);
    }
  }, [selectValue]);

  useEffect(() => {
    console.log(haveCreateSwap, wantCreateSwap);
    console.log(selectValue);
  }, [haveCreateSwap, wantCreateSwap]);

  return (
    <>
      <SelectContainer>
        <select onChange={handleSelect} value={selectValue}>
          <option key="matic" value="matic">
            matic
          </option>
          <option key="erc20" value="erc20">
            ERC20
          </option>
          <option key="erc721" value="erc721">
            ERC721
          </option>
        </select>
      </SelectContainer>
      <Contents>
        {selectValue === 'erc20' ? (
          <ERC20>
            <div>
              {/* contract Address */}
              <p>address</p>
              <input onChange={handleInput1} value={inputValue1} />
            </div>
            <div>
              <p>amount</p>
              <input onChange={handleInput2} value={inputValue2} />
            </div>
          </ERC20>
        ) : selectValue === 'erc721' ? (
          <ERC721>
            <div>
              {/* contract Address */}
              <p>address</p>
              <input onChange={handleInput1} value={inputValue1} />
            </div>
            <div>
              {/* token ID */}
              <p>ID</p>
              <input onChange={handleInput2} value={inputValue2} />
            </div>
          </ERC721>
        ) : (
          <Matic>
            <div>
              <p>amount</p>
              <input onChange={handleInput1} value={inputValue1} />
            </div>
          </Matic>
        )}
      </Contents>
    </>
  );
};

export default CreateSwapForm;

const SelectContainer = styled.div`
  select {
    padding: 5px 15px;
  }
`;

const Contents = styled.div``;

const ERC20 = styled.div`
  display: flex;
  div {
    margin: 5px;
    input {
      padding: 5px;
    }
  }
`;
const ERC721 = styled.div`
  display: flex;
  div {
    margin: 5px;
    input {
      padding: 5px;
    }
  }
`;
const Matic = styled.div`
  display: flex;
  div {
    margin: 5px;
    input {
      padding: 5px;
    }
  }
`;
