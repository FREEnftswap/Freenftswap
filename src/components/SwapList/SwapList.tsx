import SwapCard from '../SwapCard';
import { SwapListPropsType } from './SwapList.types';

const SwapList: React.FC<SwapListPropsType> = ({ dataList }) => {
  return (
    <>
      {dataList.map((data: any, i: number) => (
        <SwapCard key={i} data={data} />
      ))}
    </>
  );
};

export default SwapList;
