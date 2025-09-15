import {
  Box,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResetPasswordForm from "../../Components/form/auth/ResetPasswordForm";
import GlassLayout from "../../Layout/Glass";
import { resetPassword } from "../../features/auth/authAction";
import { selectIsPasswordResetSuccess, selectResetPasswordLoading } from "../../features/auth/authSelector";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const loading = useSelector(selectResetPasswordLoading)
  const isPasswordResetSuccess = useSelector(selectIsPasswordResetSuccess)

  const token = searchParams.get("token"); // token from URL
  const handleResetPassword = async ({ password }) => {

    dispatch(resetPassword({ newPassword: password, token }));


  };
  useEffect(() => {
    if (isPasswordResetSuccess) {
      navigate('/login')
    }
  }, [isPasswordResetSuccess, dispatch, navigate])

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

        >
          <Heading size="lg" textAlign="center">
            Reset Password
          </Heading>
          <Text textAlign="center">
            Enter your new password to reset it securely. </Text>

          <ResetPasswordForm loading={loading} onSubmit={data => handleResetPassword(data)} />
        </Stack>
      </Box>
    </GlassLayout>
  );
};

export default ResetPassword;
