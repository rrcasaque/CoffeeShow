import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TableItemModal } from '../Modals/TableItemModal';
import { CustomModal } from '../Modals/CustomModal';
import { CreateOrUpdateModal } from '../Modals/CreateOrUpdateModal';

export const Sidebar = () => {
  const [modal, setModal] = useState<JSX.Element>(<></>);
  const [sizeImage, setSizeImage] = useState(250);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (window.innerWidth < 768) setSizeImage(150);
  }, []);

  return (
    <Flex
      minH={{ md: '100vh', lg: '100vh' }}
      h={{ base: '210px', sm: '210px' }}
      bg="#d9caad"
      w={{ sm: '100vw', md: '320px', lg: '320px' }}
      direction="column"
      justify="flex-start"
      align="center"
      position={{ sm: 'relative', md: 'fixed', lg: 'fixed' }}
    >
      <Image src={'/logo.png'} alt={''} width={sizeImage} height={sizeImage} />
      <Flex
        direction={{ base: 'row', sm: 'row', md: 'column', lg: 'column' }}
        color="#ffffff"
        fontSize="20px"
        w="full"
        h={{ base: '45px', sm: '45px', md: '180px', lg: '180px' }}
        justify="space-around"
      >
        <Flex
          _hover={{ cursor: 'pointer', filter: 'brightness(1.5)' }}
          bg="#3a2215"
          mx={{ base: '0', sm: '0', md: '20px', lg: '20px' }}
          pl={{ base: '0', sm: '0', md: '20px', lg: '20px' }}
          py={{ base: '0', sm: '0', md: '4px', lg: '4px' }}
          borderRadius="14px"
          align="center"
          justify={{
            base: 'center',
            sm: 'center',
            md: 'flex-start',
            lg: 'flex-start',
          }}
          w={{ base: '90px', sm: '90px', md: '280px', lg: '280px' }}
          maxH={{ base: '45px', sm: '45px', md: '100px', lg: '100px' }}
          id="create"
          onClick={(e) => {
            changeModal(e.currentTarget.id, setModal, onOpen, onClose);
          }}
        >
          <PlusSquareIcon />
          {sizeImage === 250 && <Text ml="12px">Adicionar Item</Text>}
        </Flex>
        <Flex
          _hover={{ cursor: 'pointer', filter: 'brightness(1.5)' }}
          bg="#3a2215"
          mx={{ base: '0', sm: '0', md: '20px', lg: '20px' }}
          pl={{ base: '0', sm: '0', md: '20px', lg: '20px' }}
          py={{ base: '0', sm: '0', md: '4px', lg: '4px' }}
          borderRadius="14px"
          align="center"
          justify={{
            base: 'center',
            sm: 'center',
            md: 'flex-start',
            lg: 'flex-start',
          }}
          w={{ base: '90px', sm: '90px', md: '280px', lg: '280px' }}
          maxH={{ base: '45px', sm: '45px', md: '100px', lg: '100px' }}
          id="update"
          onClick={(e) => {
            changeModal(e.currentTarget.id, setModal, onOpen, onClose);
          }}
        >
          <EditIcon />
          {sizeImage === 250 && <Text ml="12px">Editar Item</Text>}
        </Flex>
        <Flex
          _hover={{ cursor: 'pointer', filter: 'brightness(1.5)' }}
          bg="#3a2215"
          mx={{ base: '0', sm: '0', md: '20px', lg: '20px' }}
          pl={{ base: '0', sm: '0', md: '20px', lg: '20px' }}
          py={{ base: '0', sm: '0', md: '4px', lg: '4px' }}
          borderRadius="14px"
          align="center"
          justify={{
            base: 'center',
            sm: 'center',
            md: 'flex-start',
            lg: 'flex-start',
          }}
          w={{ base: '90px', sm: '90px', md: '280px', lg: '280px' }}
          maxH={{ base: '45px', sm: '45px', md: '100px', lg: '100px' }}
          id="delete"
          onClick={(e) => {
            changeModal(e.currentTarget.id, setModal, onOpen, onClose);
          }}
        >
          <DeleteIcon />
          {sizeImage === 250 && <Text ml="12px">Remover Item</Text>}
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
  onOpen: () => void,
  onClose: () => void
) => {
  onOpen();
  switch (id) {
    case 'create':
      setModal(<CreateOrUpdateModal onClose={onClose} />);
      break;
    case 'update':
      setModal(<TableItemModal modalType={'update'} />);
      break;
    case 'delete':
      setModal(<TableItemModal modalType={'delete'} />);
      break;
  }
};
