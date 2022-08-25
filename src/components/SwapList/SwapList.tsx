import SwapCard from '../SwapCard';
import { SwapListPropsType } from './SwapList.types';

const SwapList: React.FC<SwapListPropsType> = () => {
  return (
    <div>
      <SwapCard />
      <SwapCard />
      <SwapCard />
      <SwapCard />
      <SwapCard />
      <SwapCard />
      <SwapCard />
      <SwapCard />
    </div>
  );
};

export default SwapList;
