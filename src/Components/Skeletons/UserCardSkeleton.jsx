import { Box, Skeleton, SkeletonText, HStack, VStack } from "@chakra-ui/react";

const UserCardSkeleton = () => {
  return (
    <Box
      w="full"
      bg="blackAlpha.800"
      borderRadius="md"
      p={6}
      borderLeft="6px solid"
      borderColor="#ff0080"
      boxShadow="md"
    >
      <HStack spacing={4} align="start">
        <Skeleton boxSize="50px" borderRadius="full" />
        <VStack align="start" spacing={2} flex="1">
          <Skeleton height="12px" width="80%" />
          <Skeleton height="10px" width="60%" />
          <Skeleton height="10px" width="40%" />
          <HStack spacing={2}>
            <Skeleton height="20px" width="50px" borderRadius="md" />
            <Skeleton height="20px" width="70px" borderRadius="md" />
            <Skeleton height="20px" width="60px" borderRadius="md" />
          </HStack>
        </VStack>
        <Skeleton boxSize="20px" borderRadius="md" />
      </HStack>
    </Box>
  );
};

export default UserCardSkeleton;
