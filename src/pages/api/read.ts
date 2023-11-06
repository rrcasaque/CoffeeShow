import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './create';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        const listItems = await readItem();
        return res.status(200).json(listItems);
      } catch (error) {
        res.status(500).json({ error: 'erro inesperado' });
      }
      break;
    default:
      res.status(501).json({ error: 'método não implementado' });
      break;
  }
}

const readItem = async () => {
  try {
    await client.connect();
    return await client.db('coffeeShowDB').collection('items').find().toArray();
  } catch (error) {
    return error;
  }
};
