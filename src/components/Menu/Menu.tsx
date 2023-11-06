import { useItemStore } from '@/context/ItemStore';
import { Flex } from '@chakra-ui/react';
import { ItemCard } from '../ItemCard/ItemCard';

export const Menu = () => {
  const { items } = useItemStore();
  return (
    <Flex
      minH="100vh"
      w="full"
      ml="320px"
      wrap="wrap"
      justify="center"
      backgroundImage='/rusticWoodBackground.png'
    >
      {items.map((item) => {
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
