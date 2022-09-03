import type { NextApiRequest, NextApiResponse } from 'next';
import sendContract from '../../utils/web3/sendContract';

type Data = {
  result?: any;
  error?: any;
};

export default async function SBTmint(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {} = req.body;
  const params = ['', ''];

  let result;

  try {
    result = await sendContract('fulfillOrder', params);
    res.status(200).json({ result: result });
  } catch (err: any) {
    console.log('error', err);
    res.status(200).json({ error: err, result: result });
  }
}
