import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { SwapList } from '../components';
import { firebaseReader } from '../utils/Handler/firebaseHandler';
import seaportOrder from '../utils/web3/seaport/seaportOrder';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { ethers } from 'ethers';
import { Seaport } from '@opensea/seaport-js';
import { Signer } from '@opensea/seaport-js/lib/types';

const Home: NextPage = ({ dataList }: any | undefined) => {
  const onTest = async () => {
    const result = await seaportOrder(
      '0x3af0A1d2c053ca2e6072015EdB44Bc57db63a9c6',
      '0x6053858641cc482Ba3cf07a4Ce94c6CD4aF56473',
    );
    console.log('\n\n\nresult', result, '\n\n\n');
  };

  // let provider: ethers.providers.JsonRpcProvider | Signer;

  // (async () => {
  //   if (typeof window) {
  //     console.log('hello');
  //     // window.ethereum
  //     //   .enable()
  //     //   .then((provider = new ethers.providers.Web3Provider(window.ethereum)));
  //   }
  // })();

  const seaportOrders = async () => {
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

    console.log('1', accounts);
    const seaport = new Seaport(signer, {
      overrides: { contractAddress: '0x5C829805796843A285C0cb875E34BB67Abb99B22' },
    });
    console.log('2');
    const { executeAllActions } = await seaport.createOrder(
      {
        offer: [
          // offer가 줄 값
          {
            itemType: ItemType.ERC721,
            token: '0xb64f5b6b38a5707413ECEE860aC354e06Ca4F315',
            identifier: '1',
          },
        ],
        consideration: [
          // offer가 원하는 바꾸려는 값
          {
            amount: ethers.utils.parseEther('0.1').toString(),
            recipient: offerer,
          },
        ],
      },
      offerer,
    );
    console.log('3');
    const order = await executeAllActions();
    console.log('4');
    const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
      order,
      accountAddress: fulfiller,
      recipientAddress: offerer,
    });
    console.log('5');
    const transaction = await executeAllFulfillActions();
    console.log('6', transaction);
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <button onClick={onTest}>test test test</button>
      </div>
      <div style={{ padding: '20px' }}>
        <button onClick={seaportOrders}>tes222st2222</button>
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
