import { Box, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";

export default function DeliveryPerformanceReport({ report }) {
  if (!report?.success) {
    return <Text color="red.500">Failed to load delivery performance report</Text>;
  }

  const data = report.data;

  return (
    <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg" bg="transparent" color="gray.200" borderColor={'gray.700'}>
      <Heading size="md" mb={4}>Delivery Performance Report</Heading>
      <Text fontSize="sm" color="gray.600" mb={4}>{report.message}</Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Stat>
          <StatLabel>Average Delivery Time</StatLabel>
          <StatNumber>{data.avgDeliveryTime}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>On-Time Deliveries</StatLabel>
          <StatNumber>{data.onTimeDeliveries}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Late Deliveries</StatLabel>
          <StatNumber>{data.lateDeliveries}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Success Rate</StatLabel>
          <StatNumber>{data.deliverySuccessRate}</StatNumber>
          <StatHelpText>Percentage of orders delivered successfully</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}
