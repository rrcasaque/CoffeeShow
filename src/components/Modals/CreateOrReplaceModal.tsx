/* eslint-disable react-hooks/exhaustive-deps */
import { Item } from '@/models/Item';
import {
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Spinner } from '@chakra-ui/spinner';

import { createOrReplaceSchema } from './CreateOrReplaceSchema';

interface CreateOrUpdateModalProps {
  btnFunction: () => void;
  itemSelected?: Item;
}

export const CreateOrUpdateModal = (props: CreateOrUpdateModalProps) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [fileError, setFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createOrReplaceSchema) });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const { name, description, price, image } = data;
    //await signIn(name, description, price, image);
    setIsLoading(false);
  };

  useEffect(() => {
    if (props.itemSelected) {
      setItemName(props.itemSelected.name);
      setItemDescription(props.itemSelected.description);
      setItemPrice(props.itemSelected.price.toString());
      setItemImage(props.itemSelected.image);
      if(props.itemSelected.image === '')
      {
        setFileError(true);
      }
    }
  }, []);


  return (
    <ModalContent minW="800px">
      <ModalHeader>
        {props.itemSelected ? 'Editar Registro' : 'Criar Registro'}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody w="full" flexDirection="column">
        <Flex
          onSubmit={handleSubmit(onSubmit)}
          w="full"
          as="form"
          direction="column"
          align="end"
          justify="center"
        >
          <Flex
            w="full"
            direction="row"
            wrap="wrap"
            align="center"
            justify="center"
          >
            <VStack>
              <FormControl isInvalid={!!errors.name?.message}>
                <FormLabel>Item</FormLabel>
                <Input
                  w="400px"
                  marginTop='1'
                  {...register('name')}
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.currentTarget.value);
                  }}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description?.message}>
                <FormLabel>Descrição</FormLabel>
                <Input
                  w="400px"
                  marginTop='1'
                  {...register('description')}
                  value={itemDescription}
                  onChange={(e) => {
                    setItemDescription(e.currentTarget.value);
                  }}
                />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.price?.message}>
                <FormLabel>Preço</FormLabel>
                <Input
                  type='number'
                  w="400px"
                  marginTop='1'
                  {...register('price')}
                  value={itemPrice}
                  onChange={(e) => {
                    setItemPrice(e.currentTarget.value);
                  }}
                />
                <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={fileError}>
                <FormLabel>Foto</FormLabel>
                <Input
                  type='file'
                  w="400px"
                  marginTop='1'
                  {...register('image')}
                  value={itemImage}
                  onChange={(e) => {
                    setItemImage(e.currentTarget.value);
                    setFileError(false);
                  }}
                />
                <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
              </FormControl>
              </VStack>
          </Flex>
          <Button type="submit" colorScheme="blue" onClick={props.btnFunction} marginTop="4" disabled={isLoading}>
            {isLoading ? <Spinner /> : props.itemSelected ? 'Editar' : 'Criar'}
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};
