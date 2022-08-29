import { BigNumber, ethers } from 'ethers';
import getProvider from './getProvider';
import Addresses from './Addresses';

async function sendContract(param: any, method: string) {
  const provider = await getProvider();
  const wallet = new ethers.Wallet(Addresses.privateKey);
  const walletSigner = wallet.connect(provider);

  const CONTRACT = new ethers.Contract(
    Addresses.ContractAddress,
    Addresses.ABI,
    walletSigner,
  );

  const nonce = await provider.getTransactionCount(Addresses.from, 'pending');

  const estimationGas = await provider
    .getGasPrice()
    .then((currentGasPrice: BigNumber) => {
      return ethers.utils.hexlify(parseInt(`${currentGasPrice}`));
    });

  const baseTxn = {
    gasLimit: 300000,
    gasPrice: estimationGas,
    nonce: nonce,
  };

  const contractTx: object = await CONTRACT[method](...param, baseTxn);
  await wallet.signTransaction(contractTx);

  return contractTx;
}

export default sendContract;
