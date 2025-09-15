import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";

export default function TopItemsReport({ report }) {
  if (!report?.success) {
    return <Text color="red.500">Failed to load report</Text>;
  }

  return (
    <Box p={4}  borderRadius="md" boxShadow="sm" borderWidth="1px" borderColor={'gray.700'} bg={'transparent'} color={'gray.200'}>
      <Heading size="md" mb={4}>
        Top Items Report
      </Heading>

      {report.data.length === 0 ? (
        <Text>No items sold yet.</Text>
      ) : (
        <Table variant="simple" size="sm">
          <Thead bg="gray.100">
            <Tr>
              <Th>Item</Th>
              <Th isNumeric>Sold</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report.data.map((item, index) => (
              <Tr key={index}>
                <Td>{item.item}</Td>
                <Td isNumeric>{item.sold}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
