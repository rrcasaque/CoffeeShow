import { useItemStore } from '@/context/ItemStore';
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

interface DeleteModalProps {
  id: string;
  onClose: () => void;
}

export const DeleteModal = (props: DeleteModalProps) => {
  const toast = useToast();
  return (
    <ModalContent minW="380px">
      <ModalHeader>Confirmação de exclusão</ModalHeader>
      <ModalCloseButton />
      <ModalBody w="full" flexDirection="column">
        <Flex direction="column">
          <Text>Tem certeza que deseja excluir o item?</Text>
          <Button
            color="#ffffff"
            bg="red.400"
            w="80px"
            alignSelf="flex-end"
            mt="12px"
            onClick={async () => {
              try {
                await axios.delete('/api/delete', {
                  data: {
                    itemID: props.id,
                    timeout: 10000,
                  },
                });
                const updatedList = useItemStore
                  .getState()
                  .items.filter((item) => {
                    if (item._id !== props.id) return item;
                  });
                useItemStore.setState({ items: updatedList });
                props.onClose();
              } catch (e) {
                toast({
                  title: 'Erro ao deletar item',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
              }
              toast({
                title: 'Item deletado com sucesso!',
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            }}
          >
            Excluir
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};
