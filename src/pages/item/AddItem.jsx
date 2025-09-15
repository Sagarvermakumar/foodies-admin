import {
  Box
} from "@chakra-ui/react";
import AddItemForm from "../../Components/form/AddItemForm";
const AddItem = () => {
  
  return (
    <Box
      maxW={{ base: "full", md: "6xl" }}
      w="full"
      p={{ base: 4, lg: 6 }}
      mt={4}
      mx="auto"
      bg={"blackAlpha.600"}
      borderRadius="xl"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.15)"
    >

      <AddItemForm />
    </Box>
  );
};

export default AddItem;




