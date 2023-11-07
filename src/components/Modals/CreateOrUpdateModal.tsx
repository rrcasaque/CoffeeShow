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
  Box,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Spinner } from '@chakra-ui/spinner';

import { CreateOrUpdateSchema } from './CreateOrUpdateSchema';
import axios from 'axios';
import { convertToBase64 } from '@/utils/convert/convertToBase64';
import { useItemStore } from '@/context/ItemStore';

interface CreateOrUpdateModalProps {
  onClose: () => void;
  itemSelected?: Item;
}

export const CreateOrUpdateModal = (props: CreateOrUpdateModalProps) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState<File>();
  const [fileError, setFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const items = useItemStore().items;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateOrUpdateSchema),
    defaultValues: props.itemSelected && {
      name: 'a',
      description: 'a',
      price: '0',
      image: 'a',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const { name, description, price } = data;
    if (props.itemSelected) {
      try {
        const base64 = !props.itemSelected
          ? await convertToBase64(itemImage as File)
          : itemImage && (await convertToBase64(itemImage as File));
        await axios.put('/api/update', {
          itemID: props.itemSelected._id,
          itemName: itemName,
          itemDescription: itemDescription,
          itemPrice: parseFloat(itemPrice),
          itemImage: base64 ? 'data:image/jpeg;base64,' + base64 : base64,
          timeout: 10000,
        });
        let itemList = items;
        if (props.itemSelected) {
          itemList = itemList.map((item) => {
            if (item._id !== props.itemSelected?._id) return item;
            else {
              return {
                _id: props.itemSelected && props.itemSelected._id,
                name: itemName,
                description: itemDescription,
                price: parseFloat(itemPrice),
                image: base64
                  ? 'data:image/jpeg;base64,' + base64
                  : props.itemSelected
                  ? props.itemSelected.image
                  : '',
              };
            }
          });
          useItemStore.setState({ items: itemList });
        }
        props.onClose();
        toast({
          title: 'Item alterado com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        props.onClose();
        toast({
          title: 'Erro ao alterar item',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        const base64 = await convertToBase64(itemImage as File);
        const insertedItem = await axios.post('/api/create', {
          itemName: name,
          itemDescription: description,
          itemPrice: parseFloat(price),
          itemImage: 'data:image/jpeg;base64,' + base64,
          timeout: 10000,
        });

        console.log({
          itemName: name,
          itemDescription: description,
          itemPrice: parseFloat(price),
          itemImage: 'data:image/jpeg;base64,' + base64,
        });

        const itemList = items;
        itemList.push({
          _id: insertedItem.data.item._id,
          name: name,
          description: description,
          price: parseFloat(price),
          image: 'data:image/jpeg;base64,' + base64,
        });
        useItemStore.setState({ items: itemList });
        props.onClose();
        toast({
          title: 'Item adicionado com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        props.onClose();
        toast({
          title: 'Erro ao adicionar item',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (props.itemSelected) {
      setItemName(props.itemSelected.name);
      setItemDescription(props.itemSelected.description);
      setItemPrice(props.itemSelected.price.toString());
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
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(() => {
              if ((!itemImage && !props.itemSelected) || fileError)
                setFileError(true);
              else
                onSubmit({
                  name: itemName,
                  price: itemPrice,
                  description: itemDescription,
                });
            })();
          }}
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
              <FormControl
                isInvalid={!!errors.name?.message && itemName.length === 0}
              >
                <FormLabel>Item</FormLabel>
                <Input
                  w="400px"
                  marginTop="1"
                  {...register('name')}
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.currentTarget.value);
                  }}
                />
                <FormErrorMessage mt="0">
                  {errors.name?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description?.message}>
                <FormLabel>Descrição</FormLabel>
                <Input
                  w="400px"
                  marginTop="1"
                  {...register('description')}
                  value={itemDescription}
                  onChange={(e) => {
                    setItemDescription(e.currentTarget.value);
                  }}
                />
                <FormErrorMessage mt="0">
                  {errors.description?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.price?.message}>
                <FormLabel>Preço</FormLabel>
                <Input
                  type="number"
                  w="400px"
                  marginTop="1"
                  {...register('price')}
                  value={itemPrice}
                  onChange={(e) => {
                    setItemPrice(e.currentTarget.value);
                  }}
                />
                <FormErrorMessage mt="0">
                  {errors.price?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={fileError}
                display="flex"
                flexDirection="column"
              >
                <FormLabel>Foto</FormLabel>
                {props.itemSelected && (
                  <Box
                    alignSelf="center"
                    backgroundImage={props.itemSelected.image}
                    backgroundPosition="center center"
                    backgroundSize="cover"
                    height="120px"
                    w="160px"
                  />
                )}
                <Input
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  w="400px"
                  marginTop="1"
                  {...register('image')}
                  onChange={(e) => {
                    setItemImage(
                      e.currentTarget.files && e.currentTarget.files[0]
                        ? e.currentTarget.files[0]
                        : undefined
                    );
                    const smallFile = (+e.currentTarget.files[0].size) <= (50 * 1024); // 50kB
                    e.currentTarget.files && smallFile
                      ? setFileError(false)
                      : setFileError(true);
                  }}
                />
                <FormErrorMessage mt="0">
                  {fileError && !props.itemSelected && itemImage
                    ? 'A foto deve ser menor que 50kB'
                    : 'A foto é obrigatória'}
                  {fileError &&
                    props.itemSelected &&
                    'A foto deve ser menor que 50kB'}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </Flex>
          <Button
            type="submit"
            colorScheme="blue"
            onClick={() => {}}
            marginTop="4"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : props.itemSelected ? 'Editar' : 'Criar'}
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};
