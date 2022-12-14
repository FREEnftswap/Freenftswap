import { dbService } from '../FB';
import { addDoc, collection } from 'firebase/firestore';

export async function firebaseCreator(
  walletAddress: string,
  haveData: any,
  wantData: any,
  order: any,
) {
  console.log('firebase data post : ', {
    walletAddress: walletAddress,
    have: haveData,
    want: wantData,
    order: order,
    createAt: Date.now(),
  });
  const docRef = await addDoc(collection(dbService, 'swapList'), {
    walletAddress: walletAddress,
    have: haveData,
    want: wantData,
    order: order,
    createAt: Date.now(),
  });

  console.log('Document written with ID: ', docRef.id);
}

export async function firebaseReader() {
  const readValue = await dbService.collection('swapList').get();

  const data: any[] = [];

  readValue.forEach((document: { data: () => any }) => {
    data.push(document.data());
  });
  return data;
}
