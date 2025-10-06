import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Global/Sidebar.jsx';
import GlassLayout from './Glass.jsx';

const Admin = () => {
  // const { colorMode } = useColorMode();
  return (
    <Flex minH="100vh" maxW="99vw" overflow="hidden" className="sidebar" >
      {/* Sidebar */}
      <Sidebar>
        {/* Background Glass (fixed) */}
        <Box
          position="fixed"
          top={0}
          left={0}
          maxW={'8xl'}
          h="100%"
          zIndex={-1}
          ml={{ base: 0, md: 72 }}
        >
          <GlassLayout />
        </Box>

        {/* Main Content area */}
        <Box flex="1" minH="100vh" px={{ base: 4, md: 4, lg: 8 }} bg={"#0000003c"} overflowY="auto" pb={{ sm: 28, md: 16, lg: 8 }}>
          <Outlet />
        </Box>
      </Sidebar>
    </Flex>
  );
};

export default Admin;
