import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
} from "@chakra-ui/react";

const CategoryListSkeleton = () => {
  return (
    <Box p={6}>
      <Table variant="simple" bg="transparent">
        <Thead>
          <Tr>
            <Th>Order</Th>
            <Th>Name</Th>
            <Th>Slug</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[1, 2, 3, 4, 5,6,7,8,9].map((i) => (
            <Tr key={i}>
              <Td>
                <Skeleton height="20px" width="40px" />
              </Td>
              <Td>
                <Skeleton height="20px" width="100px" />
              </Td>
              <Td>
                <Skeleton height="20px" width="120px" />
              </Td>
              <Td>
                <Skeleton height="20px" width="70px" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CategoryListSkeleton;
