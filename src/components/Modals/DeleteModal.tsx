import { useItemStore } from '@/context/ItemStore';
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';

interface DeleteModalProps {
  id: string;
  onClose: () => void;
}

export const DeleteModal = (props: DeleteModalProps) => {
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
              await axios.delete('/api/delete', {
                data: {
                  itemID: props.id,
                },
              });
              const updatedList = useItemStore
                .getState()
                .items.filter((item) => {
                  if (item._id !== props.id) return item;
                });
              useItemStore.setState({ items: updatedList });
              props.onClose();
            }}
          >
            Excluir
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};
