import {
    Box,
    Heading,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ForgetPasswordForm from "../../Components/form/auth/ForgetPasswordForm";
import { forgetPassword } from "../../features/auth/authAction";
import { selectForgetPasswordLoading } from "../../features/auth/authSelector";
import GlassLayout from "../../Layout/Glass";

const ForgotPassword = () => {

    const loading = useSelector(selectForgetPasswordLoading);
    const dispatch = useDispatch()

    const handleForgetPassword = async (values) => {
        dispatch(forgetPassword(values))

    }

    return (
        <GlassLayout>
            <Box
                w="100%"
                minH="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={{ base: 4, md: 8 }}
            >
                <Stack
                    w="100%"
                    maxW="550px"
                    borderRadius="md"
                    boxShadow="dark-lg"
                    p={{ base: 6, md: 8 }}
                    spacing={4}
                // bg="blackAlpha.500"
                >
                    <VStack spacing={6} align="stretch">
                        <Heading size="lg" textAlign="center">
                            Forgot Password
                        </Heading>
                        <Text textAlign="center">
                            Enter your registered email to receive password reset
                            Link.
                        </Text>

                        <ForgetPasswordForm loading={loading} onSubmit={(values) => handleForgetPassword(values)} />

                    </VStack>
                </Stack>
            </Box>
        </GlassLayout>
    );
};

export default ForgotPassword;
