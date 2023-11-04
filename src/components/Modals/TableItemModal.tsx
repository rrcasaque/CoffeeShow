import { Item } from '@/models/Item';
import {
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface TableItemModalPorps {
  items: Item[];
  modalType: 'update' | 'delete';
}

export const TableItemModal = (props: TableItemModalPorps) => {
  return (
    <ModalContent minW="1000px">
      <ModalHeader>Itens cadastrados</ModalHeader>
      <ModalCloseButton />
      <ModalBody w="full" flexDirection="column">
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="center">Nome</Th>
              <Th textAlign="center">Descrição</Th>
              <Th textAlign="center">Preço</Th>
              <Th textAlign="center">Imagem</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.items.map((item) => {
              return (
                <Tr key={item._id}>
                  <Td textAlign="center">{item.name}</Td>
                  <Td textAlign="center">{item.description}</Td>
                  <Td textAlign="center">{item.price}</Td>
                  <Td>
                    <Box
                      backgroundImage={item.image}
                      w="50"
                      h="50"
                      backgroundSize="cover"
                      backgroundPosition="center"
                    />
                  </Td>
                  <Td>
                    <Text
                      _hover={{ cursor: 'pointer' }}
                      onClick={() => {}}
                      bg={
                        props.modalType === 'delete' ? 'red.400' : 'yellow.800'
                      }
                      fontSize="16px"
                      align="center"
                      py="4px"
                      borderRadius="8px"
                      color="white"
                    >
                      {props.modalType === 'delete' ? 'Deletar' : 'Editar'}
                    </Text>
                  </Td>
                </Tr>
              );
            })}
            <Tr>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </ModalBody>
    </ModalContent>
  );
};
