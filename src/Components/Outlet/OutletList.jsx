import {
  Badge,
  Box,
  Button,
  Divider,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllOutlets } from "../../features/outlet/action";
import { setOutletPage } from "../../features/outlet/slice";
import Pagination from "../common/Pagination";

const OutletList = ({ outlets, pagination }) => {

  const navigate = useNavigate()
  if (!outlets || outlets.length === 0) {
    return (
      <Box p={6} textAlign="center" color="gray.500">
        No outlets available
      </Box>
    );
  }

  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={{ base: 6, md: 8 }} mb={8}>
      {outlets.map((outlet) => (
        <GridItem
          key={outlet._id}
          border=".5px solid "
          borderColor={'gray.600'}
          borderRadius="xl"
          shadow="md"
          p={5}
          bg="blackAlpha.300"
        >
          <VStack align="start" spacing={3}>
            <HStack justify="space-between" w="full">
              <Text fontSize="lg" fontWeight="bold" color={"#f80"}>
                {outlet.name}
              </Text>
              <Badge colorScheme={outlet.active ? "green" : "red"}>
                {outlet.active ? "Active" : "Inactive"}
              </Badge>
            </HStack>

            <Text fontSize="sm" color="gray.500">
              Code: {outlet.code}
            </Text>

            <Text fontSize="sm" color="gray.500">
              Phone: {outlet.phone}
            </Text>

            <Text fontSize="sm" color="gray.500">
              GSTIN: {outlet.gstIN}
            </Text>

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="bold">
                Opening Hours
              </Text>
              <Text fontSize="sm">
                {outlet.openingHours.open} - {outlet.openingHours.close}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Weekly Off:{" "}
                {outlet.openingHours.weeklyOff.length > 0
                  ? outlet.openingHours.weeklyOff.join(", ")
                  : "None"}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="bold">
                Delivery Config
              </Text>
              <Text fontSize="sm">Fixed: ₹{outlet.deliveryConfig.fixed}</Text>
              <Text fontSize="sm">Per Km: ₹{outlet.deliveryConfig.perKm}</Text>
              <Text fontSize="sm">
                Free Above: ₹{outlet.deliveryConfig.freeAbove}
              </Text>
            </Box>
          </VStack>


          <Button
            leftIcon={<MdEdit />}
            size={"md"}
            mt={4}
            variant={"outline"}
            minW={"full"}
            onClick={() => navigate(`/outlet/edit/${outlet._id}`)}
          >
            Edit
          </Button>
        </GridItem>
      ))}

      <Pagination

        pagination={pagination}
        fetchAction={getAllOutlets}
        setPageAction={setOutletPage}

      />
    </SimpleGrid>
  );
};

export default OutletList;
