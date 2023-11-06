import { useItemStore } from '@/context/ItemStore';
import { Flex, Spinner } from '@chakra-ui/react';
import { ItemCard } from '../ItemCard/ItemCard';
import { useEffect, useState } from 'react';
import { Item } from '@/models/Item';
import axios from 'axios';

export const Menu = () => {
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/read');
      setItems(response.data);
    })();
  }, []);

  return (
    <Flex
      minH="100vh"
      w="full"
      ml="320px"
      wrap="wrap"
      justify="center"
      align={items ? 'flex-start' : 'center'}
      backgroundImage="/rusticWoodBackground.png"
    >
      {items ? (
        items.map((item) => {
          return (
            <ItemCard
              key={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })
      ) : (
        <Spinner
          boxSize="100px"
          thickness="5px"
          speed="0.65s"
          stroke="2"
          color="white"
        />
      )}
    </Flex>
  );
};
