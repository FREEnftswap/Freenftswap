import React from 'react';
import type { NextPage } from 'next';
import { SwapList } from '../components';
import { firebaseReader } from '../utils/Handler/firebaseHandler';
import axios from 'axios';

const Home: NextPage = ({ data }: any | undefined) => {
  console.log(data);

  return (
    <div>
      <SwapList />
    </div>
  );
};

export async function getStaticProps() {
  const data = await firebaseReader();

  if (data)
    return {
      props: { data },
    };
  else return { props: { data } };
}

export default Home;
