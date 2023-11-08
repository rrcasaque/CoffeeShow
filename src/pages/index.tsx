import { useItemStore } from '@/context/ItemStore';
import { MainPage } from '@/modules/MainPage';
import { ChakraProvider } from '@chakra-ui/react';

// export const getServerSideProps = async () => {
//   const listItems = await axios.get('https://coffee-show.vercel.app/api/read');
//   return {
//     props: {
//       listItems: listItems.data,
//     },
//   };
// };

export default function Home(
  // props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // useItemStore.setState({ items: props.listItems });
  return (
    <ChakraProvider>
      <MainPage />
    </ChakraProvider>
  );
}

//Trying to understand the language and code......