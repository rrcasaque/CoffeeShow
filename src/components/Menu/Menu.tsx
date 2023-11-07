import { useItemStore } from '@/context/ItemStore';
import { Flex, Spinner } from '@chakra-ui/react';
import { ItemCard } from '../ItemCard/ItemCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Item } from '@/models/Item';

export const Menu = () => {
  const [item, setItem] = useState<Item[]>();
  const items = useItemStore().items;

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/read', {
        timeout: 10000,
      });
      useItemStore.setState({ items: response.data });
      setItem(response.data);
    })();
  }, []);

  return (
    <Flex
      minH="100vh"
      w="full"
      ml="320px"
      wrap="wrap"
      justify="center"
      align={item ? 'flex-start' : 'center'}
      backgroundImage="/rusticWoodBackground.png"
    >
      {item ? (
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
