import { Box, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Review = () => {
  const { name, id } = useParams();

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="transparent"
      px={4}
    >
      <VStack
        spacing={4}
        bg="#000"
        p={8}
        rounded="2xl"
        shadow="lg"
        textAlign="center"
      >
        <Text fontSize="2xl" fontWeight="bold" color="teal.600">
          Review Feature Coming Soon 🚀
        </Text>
        <Text fontSize="lg" color="gray.700">
          Thanks for checking the <b>{name}</b> feature!
        </Text>

        <Text fontSize="md" color="gray.500">
          Your review ID is: <b>{id}</b>
        </Text>
        <Text fontSize="sm" color="gray.400">
          This feature will be available in future updates. Stay tuned!
        </Text>
      </VStack>
    </Box>
  );
};

export default Review;
