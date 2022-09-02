import { ItemType } from '@opensea/seaport-js/lib/constants';
import { ethers } from 'ethers';
import getSeaport from './getSeaport';

const seaportOrder = async (offerer: string, fulfiller: string) => {
  const seaport = await getSeaport();

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

  const order = await executeAllActions();

  const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
    order,
    accountAddress: fulfiller,
    recipientAddress: offerer,
  });

  const transaction = await executeAllFulfillActions();
  return transaction;
};

export default seaportOrder;
