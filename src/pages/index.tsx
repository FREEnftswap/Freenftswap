import React from 'react';
import type { NextPage } from 'next';
import { SwapList } from '../components';
import { firebaseReader } from '../utils/Handler/firebaseHandler';

const Home: NextPage = ({ dataList }: any | undefined) => {
  return (
    <>
      <SwapList dataList={dataList} />
    </>
  );
};

export async function getStaticProps() {
  const dataList = await firebaseReader();

  if (dataList)
    return {
      props: { dataList },
    };
  else return { props: { dataList } };
}

export default Home;
