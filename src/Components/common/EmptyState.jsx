import { Box, Button, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { Inbox } from "lucide-react"; // Better empty state icon
import { useNavigate } from "react-router-dom";

const EmptyState = ({
  label = "Page",
  redirectUrl = "/",
  subLabel,
  btnLabel = "Go Back",
  icon = Inbox,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="70vh"
      px={{ base: 4, md: 0 }}
    >
      <Box
        bg="blackAlpha.300"
        borderRadius="xl"
        p={{ base: 6, md: 10 }}
        textAlign="center"
        boxShadow="xl"
        maxW={{ base: "90%", md: "400px" }}
        w="full"
        border="1px solid"
        borderColor="gray.700"
      >
        <VStack spacing={{ base: 4, md: 6 }}>
          <Icon
            as={icon}
            boxSize={{ base: 12, md: 16 }}
            color="purple.400"
            aria-hidden
          />
          <Heading fontSize={{ base: "xl", md: "2xl" }} color="whiteAlpha.900">
            {label} Not Found
          </Heading>
          {subLabel && (
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="gray.400"
              px={{ base: 2, md: 0 }}
            >
              {subLabel}
            </Text>
          )}
          <Button
            variant="outline"
            size={{ base: "sm", md: "md" }}
            onClick={() => navigate(redirectUrl)}
          >
            {btnLabel}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default EmptyState;
