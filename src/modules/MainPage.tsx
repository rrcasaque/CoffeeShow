import { Menu } from '@/components/Menu/Menu';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/react';

export const MainPage = () => {
  return (
    <Flex minH="100vh" w="100vw" direction={{ base: 'column', sm: 'column' }}>
      <Sidebar />
      <Menu />
    </Flex>
  );
};
