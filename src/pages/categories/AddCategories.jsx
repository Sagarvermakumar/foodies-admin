import { Box } from '@chakra-ui/react'
import CreateCategoryForm from '../../Components/form/CreateCategoryForm'

const AddCategories = () => {
  return (
    <Box
      maxW={{ base: "full", md: "6xl" }}
      w="full"
      p={{ base: 4, lg: 6 }}
      mt={4}
      mx="auto"
      bg={"whiteAlpha.200"}
      borderRadius="xl"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.15)"
    >

      <CreateCategoryForm />
    </Box>
  )
}

export default AddCategories