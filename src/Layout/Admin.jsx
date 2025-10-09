import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Global/Sidebar.jsx";
import Banner from "./Glass.jsx";

const Admin = () => {
  return (
    <Flex minH="100vh" maxW="100vw" overflow="hidden" position="relative">
      {/* 🔹 Global Background Banner (for whole layout) */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        zIndex={-1}
        pointerEvents={'none'}
      >
        <Banner />
      </Box>

      {/* 🔹 Sidebar + Content */}
      <Sidebar>
        <Box
          flex="1"
          minH="100vh"
          px={{ base: 4, md: 4, lg: 8 }}
          bg="transparent"
          overflowY="auto"
          pb={{ sm: 28, md: 16, lg: 8 }}
        >
          <Outlet />
        </Box>
      </Sidebar>
    </Flex>
  );
};

export default Admin;
