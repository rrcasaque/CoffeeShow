import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

export const Sidebar = () => {
  return (
    <Flex
      minH="100vh"
      bg="#d9caad"
      w="320px"
      direction="column"
      justify="flex-start"
      align="center"
      position="fixed"
    >
      <Image src={'/logo.png'} alt={''} width={250} height={250} />
      <Flex
        direction="column"
        color="#ffffff"
        fontSize="20px"
        w="full"
        h="180px"
        justify="space-around"
      >
        <Flex
          _hover={{ cursor: 'pointer', filter: 'brightness(1.5)' }}
          bg="#3a2215"
          mx="20px"
          pl="20px"
          py="4px"
          borderRadius="14px"
          align="center"
        >
          <PlusSquareIcon />
          <Text ml="12px">Adicionar Item</Text>
        </Flex>
        <Flex
          _hover={{ cursor: 'pointer', filter: 'brightness(1.5)' }}
          bg="#3a2215"
          mx="20px"
          pl="20px"
          py="4px"
          borderRadius="14px"
          align="center"
        >
          <EditIcon />
          <Text ml="12px">Editar Item</Text>
        </Flex>
        <Flex
          _hover={{ cursor: 'pointer', filter: 'brightness(1.5)' }}
          bg="#3a2215"
          mx="20px"
          pl="20px"
          py="4px"
          borderRadius="14px"
          align="center"
        >
          <DeleteIcon />
          <Text ml="12px">Remover Item</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
