import { Box, VStack } from "@chakra-ui/react";
import CreateCouponForm from "../../Components/form/CreateCouponForm";

const AddCoupon = () => {


  return (
    <Box
      maxW={{ base: "full", md: "6xl" }}
      w="full"
      p={{ base: 4, lg: 6 }}
      // mt={4}
      mx="auto"
      bg={"blackAlpha.600"}
      borderRadius="xl"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.15)"
      borderWidth="1px"
      borderColor={"gray.700"}
      shadow="md"
      backdropFilter="blur(10px)"

    >


      <VStack spacing={6} align="stretch" w="full" bg={"transparent"}>
        <CreateCouponForm
       

        />
      </VStack>
    </Box>
  );
};

export default AddCoupon;
