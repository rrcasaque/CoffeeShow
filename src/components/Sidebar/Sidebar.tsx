import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { TableItemModal } from '../Modals/TableItemModal';
import { CustomModal } from '../Modals/CustomModal';
import { useItemStore } from '@/context/ItemStore';

export const Sidebar = () => {
  const [modal, setModal] = useState<JSX.Element>(<></>);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          id="create"
          onClick={(e) => {
            changeModal(e.currentTarget.id, setModal, onOpen);
          }}
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
          id="update"
          onClick={(e) => {
            changeModal(e.currentTarget.id, setModal, onOpen);
          }}
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
          id="delete"
          onClick={(e) => {
            changeModal(e.currentTarget.id, setModal, onOpen);
          }}
        >
          <DeleteIcon />
          <Text ml="12px">Remover Item</Text>
        </Flex>
      </Flex>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        {modal}
      </CustomModal>
    </Flex>
  );
};

const changeModal = (
  id: string,
  setModal: React.Dispatch<React.SetStateAction<JSX.Element>>,
  onOpen: () => void
) => {
  onOpen();
  switch (id) {
    case 'create':
      setModal(<TableItemModal items={[]} modalType={'delete'} />);
      break;
    case 'update':
      setModal(
        <TableItemModal
          items={useItemStore.getState().items}
          modalType={'update'}
        />
      );
      break;
    case 'delete':
      setModal(
        <TableItemModal
          items={useItemStore.getState().items}
          modalType={'delete'}
        />
      );
      break;
  }
};
