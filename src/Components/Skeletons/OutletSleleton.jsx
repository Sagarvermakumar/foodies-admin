import { Box, GridItem, VStack, HStack, Badge, Divider, SimpleGrid, Skeleton, SkeletonText } from "@chakra-ui/react";

const OutletSkeleton = () => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={{ base: 6, md: 8 }} mb={8}>
      {Array(6).fill(0).map((_, i) => (
        <GridItem
          key={i}
          borderWidth="1px"
          borderRadius="xl"
          shadow="md"
          p={5}
          bg="whiteAlpha.50"
        >
          <VStack align="start" spacing={3} w="full">
            <HStack justify="space-between" w="full">
              <Skeleton height="20px" width="60%" />
              <Skeleton height="20px" width="50px" borderRadius="md" />
            </HStack>

            <SkeletonText noOfLines={1} spacing="2" width="40%" />
            <SkeletonText noOfLines={1} spacing="2" width="60%" />
            <SkeletonText noOfLines={1} spacing="2" width="50%" />

            <Divider />

            <Box w="full">
              <Skeleton height="16px" width="30%" mb={2} />
              <SkeletonText noOfLines={1} spacing="2" width="70%" />
              <SkeletonText noOfLines={1} spacing="2" width="50%" />
            </Box>

            <Box w="full">
              <Skeleton height="16px" width="40%" mb={2} />
              <SkeletonText noOfLines={3} spacing="2" width="80%" />
            </Box>
          </VStack>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default OutletSkeleton;
