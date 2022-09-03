import { Seaport } from '@opensea/seaport-js';
import { ethers } from 'ethers';
import Addresses from '../Addresses';
import getProvider from '../getProvider';

const getSeaport = async () => {
  const provider = await getProvider();
  const signer = new ethers.Wallet(Addresses.privateKey, provider);

  return new Seaport(signer, {
    overrides: { contractAddress: '0x5C829805796843A285C0cb875E34BB67Abb99B22' },
  });
};

export default getSeaport;
