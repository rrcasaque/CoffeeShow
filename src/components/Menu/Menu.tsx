import { useItemStore } from '@/context/ItemStore';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ItemCard } from '../ItemCard/ItemCard';
import { Item } from '@/models/Item';

export const Menu = () => {
  const [itemsList, setItemsList] = useState<Item[]>();

  useEffect(() => {
    (async () => {
      const itemList = await axios.get('/api/read');
      setItemsList(itemList.data);
      useItemStore.setState({ items: itemList.data });
    })();
  }, []);

  return (
    <Flex
      minH="100vh"
      w="full"
      ml="320px"
      wrap="wrap"
      justify="space-around"
      // bg="#3a2215"
      backgroundImage="https://www.creativefabrica.com/wp-content/uploads/2023/10/01/Rustic-Wood-Background-Seamless-Pattern-Graphics-80558264-3-580x435.png"
    >
      {itemsList &&
        itemsList.map((item) => {
          return (
            <ItemCard
              key={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
    </Flex>
  );
};
