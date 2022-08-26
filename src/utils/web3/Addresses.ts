interface AddressesTypes {
  ContractAddress: string;
  RPC_URL: string;
  ABI: any;
  from: string;
  privateKey: string;
}

const Addresses: AddressesTypes = {
  ContractAddress: process.env.CONTACT_ADDRESS || '',
  RPC_URL: process.env.RPC_URL || '',
  ABI: require(`../../ABI/abi.json`),
  from: process.env.FROM_ADDRESS || '',
  privateKey: process.env.PRIVATE_KEY || '',
};

export default Addresses;
