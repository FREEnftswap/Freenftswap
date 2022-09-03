import React from 'react';
import type { NextPage } from 'next';
import { SwapList } from '../components';
import { firebaseReader } from '../utils/Handler/firebaseHandler';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { ethers } from 'ethers';
import { Seaport } from '@opensea/seaport-js';
import { ToastContainer } from 'react-toastify';

const Home: NextPage = ({ dataList }: any | undefined) => {
  let signer: any;
  const setSigner = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const address = accounts[0];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    const signature = await signer.signMessage(address);
    console.log(signer, signature);
  };
  let order: any;

  const seaportCreateOrder = async () => {
    const fulfiller = '0x3af0A1d2c053ca2e6072015EdB44Bc57db63a9c6';
    const offerer = '0x6053858641cc482Ba3cf07a4Ce94c6CD4aF56473';
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const seaport = new Seaport(signer, {
      overrides: { contractAddress: '0x5C829805796843A285C0cb875E34BB67Abb99B22' },
    });

    const { executeAllActions } = await seaport.createOrder({
      offer: [
        {
          itemType: ItemType.ERC721,
          token: '0xb64f5b6b38a5707413ECEE860aC354e06Ca4F315',
          identifier: '4',
        },
      ],
      consideration: [
        {
          amount: ethers.utils.parseEther('0.02').toString(),
          recipient: fulfiller,
        },
      ],
    });
    console.log('1');
    order = await executeAllActions();
  };

  const seaportOrderSwap = async () => {
    const fulfiller = '0x3af0A1d2c053ca2e6072015EdB44Bc57db63a9c6';
    const offerer = '0x6053858641cc482Ba3cf07a4Ce94c6CD4aF56473';

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const address = accounts[0];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(address);
    console.log(signer);

    console.log('1b', accounts);
    const seaport = new Seaport(signer, {
      overrides: { contractAddress: '0x5C829805796843A285C0cb875E34BB67Abb99B22' },
    });

    console.log('5b');
    const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
      order,
      accountAddress: fulfiller,
      recipientAddress: offerer,
    });
    console.log('5a');
    const transaction = await executeAllFulfillActions();
    console.log('6a', transaction);
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <button onClick={setSigner}>sign</button>
      </div>
      <div style={{ padding: '20px' }}>
        <button onClick={seaportCreateOrder}>aaaaaaaa</button>
      </div>
      <div style={{ padding: '20px' }}>
        <button onClick={seaportOrderSwap}>aaaaaaaa</button>
      </div>

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
