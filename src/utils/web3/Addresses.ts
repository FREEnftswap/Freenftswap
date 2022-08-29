interface AddressesTypes {
  ContractAddress: string;
  RPC_URL: string;
  ABI: any;
  from: string;
  privateKey: string;
}
const RPC_URL_KEY = process.env.RPC_URL_KEY;

https: const Addresses: AddressesTypes = {
  ContractAddress: process.env.CONTACT_ADDRESS || '',
  RPC_URL: `https://polygon-mumbai.g.alchemy.com/v2/${RPC_URL_KEY}`,
  ABI: require(`../../ABI/abi.json`),
  from: process.env.FROM_ADDRESS || '',
  privateKey: process.env.PRIVATE_KEY || '',
};

export default Addresses;
