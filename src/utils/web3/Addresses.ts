interface AddressesTypes {
  ContractAddress: string;
  RPC_URL: string;
  ABI: any;
  from: string;
  privateKey: string;
}
const RPC_URL_KEY = process.env.NEXT_PUBLIC_RPC_URL_KEY;

const Addresses: AddressesTypes = {
  ContractAddress: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || '',
  RPC_URL: `https://polygon-mumbai.g.alchemy.com/v2/${RPC_URL_KEY}`,
  ABI: require(`../../ABI/ABI.json`),
  from: process.env.NEXT_PUBLIC_FROM_ADDRESS || '',
  privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY || '',
};

export default Addresses;
