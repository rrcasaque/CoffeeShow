import { Box, Flex, Text } from '@chakra-ui/react';

interface ItemCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

export const ItemCard = (props: ItemCardProps) => {
  return (
    <Flex
      bg="#ebdfcf"
      justify="space-evenly"
      align="center"
      h="284px"
      w="280px"
      direction="column"
      borderRadius="18px"
      m="12px"
    >
      <Box
        mt="8px"
        borderRadius="18px"
        w="95%"
        backgroundImage={props.image}
        height="200px"
        backgroundPosition="center"
        backgroundSize="cover"
      />
      <Flex direction="column" justify="space-around" h="72px">
        <Text align="center">{props.name}</Text>
        <Text align="center">R$ {props.price.toLocaleString()}</Text>
        <Text align="center">{props.description}</Text>
      </Flex>
    </Flex>
  );
};
