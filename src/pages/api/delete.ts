import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './create';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'DELETE':
      try {
        const { itemID } = req.body;
        if (!itemID)
          return res
            .status(400)
            .json({ message: 'Parâmetro obrigatório não informados!' });
        await deleteItem(itemID);
        res.status(200).json({ message: 'item deletado com sucesso!' });
      } catch (error) {
        res.status(400).json({ error: 'erro inesperado' });
      }
      break;
    default:
      res.status(501).json({ error: 'método não implementado' });
      break;
  }
}

const deleteItem = async (itemID: string) => {
  try {
    await client.connect();
    await client
      .db('coffeeShowDB')
      .collection('items')
      .deleteOne({ _id: new ObjectId(itemID) });
  } catch (error) {
    return error;
  }
};
