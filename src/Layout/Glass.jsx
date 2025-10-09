

"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const move = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 200px 0; }
`;

const Banner = () => {

  const bgColor = useColorModeValue("#000", "#000");
  return (
    <Box
      as="section"
      position="relative"
      w="100%"
      h="100%"
      bg={bgColor}
      color="white"
      overflow="hidden"
    >
      {/* 🔮 Neon Glow Background Shapes */}
      <MotionBox
        position="absolute"
        top="1%"
        left="12%"
        w="200px"
        h="200px"
        bg="blue"
        borderRadius="full"
        filter="blur(60px)"
        opacity={0.25}
        animate={{ x: [0, 1400, 0, 0], y: [0, -0, 20, 0] }}
        transition={{
          duration: 100,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        zIndex={0}
      />

      <MotionBox
        position="absolute"
        top="30%"
        left="55%"
        w="150px"
        h="150px"
        bg="chakra-inverse-text._dark"
        borderRadius="full"
        filter="blur(70px)"
        opacity={0.2}
        animate={{ x: [0, -40, 40, 0], y: [0, 40, -20, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        zIndex={0}
      />

      <MotionBox
        position="absolute"
        bottom="10%"
        right="-2%"
        w="150px"
        h="150px"
        bg="purple"
        borderRadius="full"
        filter="blur(60px)"
        opacity={0.3}
        animate={{ x: [0, 20, -20, 0], y: [0, -30, 30, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        zIndex={0}
      />
      <MotionBox
        position="absolute"
        bottom="8%"
        left="15%"
        w="150px"
        h="150px"
        bg="red"
        borderRadius="full"
        filter="blur(60px)"
        opacity={0.3}
        animate={{ x: [0, 10, -10, 0], y: [0, -350, 200, 0] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        zIndex={0}
      />
    </Box>
  );
};

export default Banner;
