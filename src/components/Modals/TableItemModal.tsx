import {
  Box,
  Flex,
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
  useDisclosure,
} from '@chakra-ui/react';
import { CustomModal } from './CustomModal';
import { DeleteModal } from './DeleteModal';
import { useState } from 'react';
import { useItemStore } from '@/context/ItemStore';
import { CreateOrUpdateModal } from './CreateOrUpdateModal';

interface TableItemModalPorps {
  modalType: 'update' | 'delete';
}

export const TableItemModal = (props: TableItemModalPorps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState('');
  const [modal, setModal] = useState<JSX.Element>(<></>);

  const itemsList = useItemStore.getState().items;

  return (
    <ModalContent
      w={{ base: '95vw', sm: '95vw' }}
      minW={{ md: '1000px', lg: '1000px', xl: '1000px' }}
      whiteSpace={{ base: 'nowrap', sm: 'nowrap', md: 'normal', lg: 'normal' }}
      overflow={{ base: 'auto', sm: 'auto', md: 'visible', lg: 'visible' }}
    >
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
            {itemsList.map((item) => {
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
                      id={item._id}
                      _hover={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        onOpen();
                        props.modalType === 'delete'
                          ? setModal(
                              <DeleteModal
                                id={e.currentTarget.id}
                                onClose={onClose}
                              />
                            )
                          : setModal(
                              <CreateOrUpdateModal
                                itemSelected={{
                                  name: item.name,
                                  price: item.price,
                                  description: item.description,
                                  image: item.image,
                                  _id: item._id,
                                }}
                                onClose={onClose}
                              />
                            );
                      }}
                      bg={props.modalType === 'delete' ? 'red.400' : 'blue.500'}
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
        <CustomModal isOpen={isOpen} onClose={onClose}>
          {modal}
        </CustomModal>
      </ModalBody>
    </ModalContent>
  );
};
