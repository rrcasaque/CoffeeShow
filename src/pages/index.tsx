import { useItemStore } from '@/context/ItemStore';
import { MainPage } from '@/modules/MainPage';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async () => {
  const listItems = await axios.get('http://localhost:3000/api/read');
  return {
    props: {
      listItems: listItems.data,
    },
  };
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  useItemStore.setState({ items: props.listItems });
  return (
    <ChakraProvider>
      <MainPage />
    </ChakraProvider>
  );
}
