"use client";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const UserDetailsCardSkeleton = () => {
  return (
    <Container minW="80vw" p={0}>
      <Box
        minW="100%"
        mx="auto"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
        border={"1px solid"}
        borderColor={"rgba(31, 38, 135, 0.18)"}
        p={{ base: 6, lg: 8 }}
        bg="rgba(22, 8, 8, 0.25)"
      >
        {/* Top Section */}
        <Flex direction={["column", "row"]} alignItems="center" mb={6} gap={4}>
          <SkeletonCircle size="24" />
          <Box flex="1">
            <Skeleton height="20px" mb={2} width="60%" />
            <Skeleton height="15px" width="40%" />
          </Box>
        </Flex>

        {/* Badges */}
        <Stack direction="row" spacing={3} mb={4}>
          <Skeleton height="25px" width="70px" borderRadius="md" />
          <Skeleton height="25px" width="70px" borderRadius="md" />
          <Skeleton height="25px" width="90px" borderRadius="md" />
        </Stack>

        <Divider my={3} />

        {/* User Info */}
        <Stack spacing={2} mb={3}>
          <Skeleton height="15px" width="50%" />
          <Skeleton height="15px" width="50%" />
          <Skeleton height="15px" width="50%" />
          <Skeleton height="15px" width="60%" />
        </Stack>

        <Divider my={3} />

        {/* Address Section */}
        <Box>
          <Skeleton height="20px" width="40%" mb={2} />
          {[1, 2].map((_, i) => (
            <Box
              key={i}
              fontSize="md"
              p={3}
              mb={3}
              bg="transparent"
              borderRadius="md"
              boxShadow="md"
            >
              <HStack mb={4}>
                <Skeleton height="25px" width="100px" borderRadius="md" />
                <Skeleton height="15px" width="50%" />
              </HStack>
              <SkeletonText mt="2" noOfLines={5} spacing="2" />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default UserDetailsCardSkeleton;
