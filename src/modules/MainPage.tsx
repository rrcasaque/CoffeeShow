import { Menu } from '@/components/Menu/Menu';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/react';

export const MainPage = () => {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Menu />
    </Flex>
  );
};
