import { InitPropsType } from './Init.types';
import styled from '@emotion/styled';

const Init: React.FC<InitPropsType> = ({ children }) => {
  return (
    <div>
      <Text>{children}</Text>
    </div>
  );
};

export default Init;

const Text = styled.h1`
  font-size: 30px;
`;
