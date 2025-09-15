import { Box, Text, VStack, Card, CardBody } from "@chakra-ui/react";

export default function SalesReport({ report }) {
  if (!report?.data) {
    return <Text>No report data available</Text>;
  }

  return (
    <Card maxW="sm" shadow="md" borderWidth="1px" borderColor={'gray.700'} bg={'transparent'} color={'gray.200'} >
      <CardBody bg={'transparent'} >
        <VStack spacing={3} align="start">
          <Text fontSize="lg" fontWeight="bold " color={'brand.900'} >
            Sales Report
          </Text>
          <Text>Date: {report.data.date}</Text>
          <Text>Total Orders: {report.data.totalOrders}</Text>
          <Text>Total Sales: ₹{report.data.totalSales}</Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
