import { Modal, ModalOverlay } from "@chakra-ui/react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomModal = (props: CustomModalProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      {props.children}
    </Modal>
  );
};