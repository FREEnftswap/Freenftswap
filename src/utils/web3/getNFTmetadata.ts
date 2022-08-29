import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.RPC_URL_KEY,
  network: Network.MATIC_MUMBAI,
};

async function getNftMetadata(contractAddress: string, tokenId: string) {
  const alchemy = new Alchemy(settings);

  const res = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
  console.log('get metadata ', contractAddress, tokenId, res);
  return res;
}

export default getNftMetadata;
