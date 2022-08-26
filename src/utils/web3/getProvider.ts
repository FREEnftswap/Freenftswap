import { ethers } from 'ethers';
import Addresses from './Addresses';

async function getProvider() {
  return new ethers.providers.JsonRpcProvider(Addresses.RPC_URL);
}

export default getProvider;
