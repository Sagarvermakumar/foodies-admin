import {
  Box,
  Heading,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpLoginForm from "../../Components/form/auth/OtpLoginForm";
import { loginWithOtp, otpVerification } from "../../features/auth/authAction";
import { selectAuthUser, selectForgetPasswordLoading, selectIsOtpSend } from "../../features/auth/authSelector";
import { getRouteByRole } from "../../utils/getRoutesByRole";

const LoginWithOTP = () => {
  const navigate = useNavigate()

  const user = useSelector(selectAuthUser)
  const isOtpSend = useSelector(selectIsOtpSend)
  const loading = useSelector(selectForgetPasswordLoading)
  const dispatch = useDispatch()

  const handleSendOTP = async ({ emailOrPhone }) => {
    dispatch(loginWithOtp({ emailOrPhone }))

  };

  const handleVerifyOTP = async (values) => {
    dispatch(otpVerification({ email: values.emailOrPhone, otp: values.otp }))




  };

  useEffect(() => {
    if (user?.role) {
      navigate(getRouteByRole(user.role));
    }
  }, [user, navigate]);


  return (

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
      >
        <VStack spacing={6} align="stretch">
          <Heading size="lg" textAlign="center">
            Login with OTP
          </Heading>
          <Text textAlign="center">
            Enter your email or phone number to receive OTP
          </Text>

          <OtpLoginForm
            onSubmitSendOTP={data => handleSendOTP(data)}
            onSubmitVerifyOTP={data => handleVerifyOTP(data)}
            loading={loading}
            otpSent={isOtpSend}

          />
        </VStack>
      </Stack>
    </Box>

  );
};

export default LoginWithOTP;
