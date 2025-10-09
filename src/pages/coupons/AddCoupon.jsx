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
      bg={"whiteAlpha.200"}
      borderRadius="xl"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.15)"
      shadow="md"
      backdropFilter="blur(10px)"
      mt={8}

    >


      <VStack spacing={6} align="stretch" w="full" bg={"transparent"}>
        <CreateCouponForm


        />
      </VStack>
    </Box>
  );
};

export default AddCoupon;
