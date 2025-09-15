    import React from "react";
import {
  SimpleGrid,
  Box,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Flex,
  Divider,
  Button,
} from "@chakra-ui/react";

const OrdersSkeleton = () => {
  const skeletonItems = Array(6).fill(null); 

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} mt={4} spacing={6}>
      {skeletonItems.map((_, idx) => (
        <Box
          key={idx}
          borderWidth="1px"
          borderRadius="lg"
          p={5}
          boxShadow="lg"
          bg="whiteAlpha.100"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minHeight="550px"
        >
          {/* User Info */}
          <Skeleton height="20px" width="70%" mb={2} /> {/* Name */}
          <Skeleton height="16px" width="50%" mb={4} /> {/* Phone */}

          {/* Address */}
          <Skeleton height="16px" width="40%" mb={1} /> {/* Address label */}
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="3" />

          {/* Status & Payment */}
          <Flex gap={4} mt={3} wrap="wrap">
            <Skeleton height="20px" width="60px" borderRadius="full" />
            <Skeleton height="20px" width="60px" borderRadius="full" />
            <Skeleton height="20px" width="60px" borderRadius="full" />
          </Flex>

          <Skeleton height="14px" width="80%" mt={3} /> {/* Ordered at */}
          <Skeleton height="14px" width="80%" mt={1} /> {/* Delivery by */}

          {/* Items */}
          <Box mt={4}>
            <Skeleton height="16px" width="30%" mb={2} /> {/* Items title */}
            {[...Array(2)].map((__, itemIdx) => (
              <Flex key={itemIdx} gap={3} mb={3} align="center">
                <SkeletonCircle size="12" />
                <Box flex="1">
                  <Skeleton height="14px" width="60%" mb={1} />
                  <Skeleton height="12px" width="40%" />
                </Box>
              </Flex>
            ))}
          </Box>

          <Divider mt={3} />

          <Skeleton height="18px" width="40%" mt={2} /> {/* Total */}

          {/* Action Buttons */}
          <Flex mt={4} justify="space-between" wrap="wrap" gap={3}>
            <Skeleton height="32px" width="100px" borderRadius="md" />
            <Skeleton height="32px" width="100px" borderRadius="md" />
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default OrdersSkeleton;
