import { Item } from '@/models/Item';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './create';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      const { itemName, ItemDescription, ItemPrice, ItemImage, ItemID } =
        req.body;
      if (!itemName || !ItemDescription || !ItemPrice || !ItemID)
        return res
          .status(400)
          .json({ message: 'Parâmetros obrigatórios não informados!' });
      try {
        await updateItem(
          {
            itemName,
            ItemDescription,
            ItemPrice,
            ItemImage,
          },
          ItemID
        );
        res.status(200).json({
          message: 'item editado com sucesso!',
          item: {
            name: itemName,
            description: ItemDescription,
            price: ItemPrice,
            image: ItemImage,
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
        { _id: Object(itemID) },
        {
          name: item.itemName,
          description: item.ItemDescription,
          image: item.ItemImage,
          price: item.ItemPrice,
        }
      );
  } catch (error) {
    return error;
  }
};
