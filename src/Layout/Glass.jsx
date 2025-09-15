"use client";

import { Box, Container } from "@chakra-ui/react";

const GlassLayout = ({ children }) => {
  return (
    <Box
      position="sticky"
      w="100%"
      minH="100vh"
      overflow="hidden"
      bg={"#0000000a"}
    >
      {/* 🔮 Neon Glow Shapes */}
      {/* 🔮 Neon Glow Shapes */}
      <Box
        position="absolute"
        top="80px"
        left="5%"
        w="300px"
        h="400px"
        bg="#ff0081"
        borderRadius="50%"
        filter="blur(140px)"
        opacity={0.1}
        zIndex={0}
      />

      <Box
        position="absolute"
        bottom="-10%"
        right="0px"
        w="450px"
        h="250px"
        bg="rgba(255, 0, 0, 0.75)"
        borderRadius="full"
        filter="blur(110px)"
        opacity={0.2}
        zIndex={0}
      />

      <Box
        position="absolute"
        top="0%"
        right="0px"
        w="480px"
        h="200px"
        bg="#8a2be2"
        borderRadius="50%"
        filter="blur(160px)"
        opacity={0.4}
        zIndex={0}
        display={{ sm: "none", md: "block" }}
      />

      <Box
        position="absolute"
        bottom="60px"
        left="5%"
        w="350px"
        h="180px"
        bg="rgba(255, 17, 0, 0.41)"
        borderRadius="50%"
        filter="blur(150px)"
        opacity={0.1}
        zIndex={0}
        display={{ sm: "none", md: "block" }}
      />

      {/* 🌫️ Glass Container */}
      <Container
        zIndex={1}
        minW={{ base: "100vw", md: "calc(100vw - 288px)" }}
        minH="100vh"
        backdropFilter="blur(30px) saturate(200%)"
        overflowY="auto"
        bg={"#0000000a"}
      >
        {children}
      </Container>
    </Box>
  );
};

export default GlassLayout;
