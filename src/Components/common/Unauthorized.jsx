import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GlassLayout from "../../Layout/Glass";
import Sidebar from "../Global/Sidebar";

const Unauthorized = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const handleBackToHome = () => {
    // Navigate to the home page or any other page
    if (user.role === "Admin") {
      navigate("/admin");
    } else if (user.role === "Vendor") {
      navigate("/vendor");
    }
  };

  return (
    <Flex h="100vh" w="100vw" overflow="hidden" className="sidebar">
      {/* Sidebar */}
      <Sidebar>
        {/* Background Glass (fixed) */}
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100"
          h="100%"
          zIndex={-1}
          ml={72}
          bg={"blackAlpha.600"}
        >
          <GlassLayout />
        </Box>

        {/* Main Content area */}
        <Box
          flex="1"
          h="100vh"
          px={{ base: 4, md: 4, lg: 8 }}
          overflowY="auto"
          mt={4}
          pb={{ sm: 28, md: 16, lg: 8 }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir={"column"}
            p={8}
            bg={"transparent"}
            // mx={4}
            bgGradient={"linear(145deg, #13131333, #10101029)"}
            boxShadow={" 5px 5px 9px #0a0a0a,      -5px -5px 9px #1a1a1a"}
            borderRadius={"8px"}
            gap={8}
          >
            {/* Warning Icon */}
            {/* <MediaError/> */}
            <MdOutlineErrorOutline size={65} />
            {/* Heading */}
            <Heading size="lg" color="gray.100">
              Unauthorized Access
            </Heading>

            {/* Description */}
            <Text color="gray.600" fontSize="md">
              Access Denied! Only Admin Can Access This Route 🙏
            </Text>

            {/* Go to Home Button */}
            <Button
              variant="solid"
              onClick={handleBackToHome}
            >
              Go to Home
            </Button>
          </Box>
        </Box>
      </Sidebar>
    </Flex>
  );
};

export default Unauthorized;
