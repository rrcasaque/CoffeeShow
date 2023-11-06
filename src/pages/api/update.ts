import { Item } from '@/models/Item';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './create';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      const { itemName, itemDescription, itemPrice, itemImage, itemID } =
        req.body;
      if (!itemName || !itemDescription || !itemPrice || !itemID)
        return res
          .status(400)
          .json({ message: 'Parâmetros obrigatórios não informados!' });
      try {
        await updateItem(
          {
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            image: itemImage,
          },
          itemID
        );
        res.status(200).json({
          message: 'item editado com sucesso!',
          item: {
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            image: itemImage,
          },
        });
      } catch (error) {
        res.status(500).json({ error: 'erro inesperado' });
      }
      break;
    default:
      res.status(501).json({ error: 'método não implementado' });
      break;
  }
}

const updateItem = async (item: Item, itemID: string) => {
  try {
    await client.connect();
    await client
      .db('coffeeShowDB')
      .collection('items')
      .updateOne(
        { _id: new ObjectId(itemID) },
        {
          $set: {
            name: item.name,
            description: item.description,
            image: item.image,
            price: item.price,
          },
        }
      );
  } catch (error) {
    return error;
  }
};
