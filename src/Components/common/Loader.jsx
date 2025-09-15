// src/components/Loader.jsx
import { Box, Center, Flex, Spinner, Text, useColorMode, VStack } from "@chakra-ui/react";
import GlassLayout from "../../Layout/Glass";
import Sidebar from "../Global/Sidebar";

const Loader = () => {
  const { colorMode } = useColorMode();
  return (

    <Flex minH="100vh" w="100vw" overflow="hidden" className="sidebar" mb={8} >
      {/* Sidebar */}
      <Sidebar>
        {/* Background Glass (fixed) */}
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100%"
          h="100%"
          zIndex={-1}
          ml={{ base: 0, md: 72 }}
          bg={colorMode === "dark" ? "#000" : "transparent"}
        >
          <GlassLayout />
        </Box>

        {/* Main Content area */}
        <Box
          flex="1"
          h="100vh"
          px={{ base: 4, md: 4, lg: 8 }}
          overflowY="auto"
          mt={4}
          pb={{ sm: 28, md: 16, lg: 8 }}
        >
          <Center minH="100vh">
            <VStack spacing={6}>
              {/* Logo SVG */}
              <Box boxSize="60px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  color="#E53E3E"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 4.13 5 11 7 13 2-2 7-8.87 7-13 0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
                </svg>
              </Box>

              {/* App Title */}
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="red.500"
                fontFamily="'Poppins', sans-serif"
              >
                Zayka Express
              </Text>

              {/* Spinner */}
              <Spinner size="xl" thickness="4px" color="red.500" />
            </VStack>
          </Center>
        </Box>
      </Sidebar>
    </Flex>



  );
};

export default Loader;
