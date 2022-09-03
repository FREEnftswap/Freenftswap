import { ethers } from 'ethers';
import Addresses from './Addresses';

async function getProvider() {
  return new ethers.providers.JsonRpcProvider(Addresses.RPC_URL);
}

export default getProvider;

// const seaportOrders = async () => {
//   const fulfiller = '0x3af0A1d2c053ca2e6072015EdB44Bc57db63a9c6';
//   const offerer = '0x6053858641cc482Ba3cf07a4Ce94c6CD4aF56473';

//   const accounts = await window.ethereum.request({
//     method: 'eth_requestAccounts',
//   });

//   const address = accounts[0];
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const signature = await signer.signMessage(address);
//   console.log(signer);

//   console.log('1', accounts);
//   const seaport = new Seaport(signer, {
//     overrides: { contractAddress: '0x5C829805796843A285C0cb875E34BB67Abb99B22' },
//   });
//   console.log('2');
//   const { executeAllActions } = await seaport.createOrder(
//     {
//       offer: [
//         // offer가 줄 값
//         {
//           itemType: ItemType.ERC721,
//           token: '0xb64f5b6b38a5707413ECEE860aC354e06Ca4F315',
//           identifier: '2',
//         },
//       ],
//       consideration: [
//         // offer가 원하는 바꾸려는 값
//         {
//           amount: ethers.utils.parseEther('0.1').toString(),
//           recipient: offerer,
//         },
//       ],
//     },
//     offerer,
//   );

//   console.log('3');
//   const order = await executeAllActions();
//   console.log('4');
//   const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
//     order,
//     accountAddress: fulfiller,
//     recipientAddress: offerer,
//   });
//   console.log('5');
//   const transaction = await executeAllFulfillActions();
//   console.log('6', transaction);
// };
