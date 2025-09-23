import {
  Box,
  Center,
  HStack,
  Stack,
  Text
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import Header from "../../Components/common/Heading";
import LoginForm from "../../Components/form/auth/LoginForm";
import GlassLayout from "../../Layout/Glass";
import { login } from "../../features/auth/authAction";
import { selectAuthError, selectIsAuthenticated, selectLoginLoading } from "../../features/auth/authSelector";
import { saveUserRole } from "../../utils/authHelper.js";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectLoginLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);
  const handleLogin = async (data) => {

    try {
      await dispatch(login(data)).unwrap();
      saveUserRole(data.role);
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
          <Header
            title="Login As Admin"
            subtitle="Welcome back! Please login to your account."
          />

          <LoginForm loading={isLoading} onSubmit={value => handleLogin(value)} />

          <HStack justify="space-between" mt={2}>
            <Link as={RouterLink} to="/forget-password" color="teal.500">
              Forgot Password?
            </Link>

            <Link as={RouterLink} to="/login-otp" color="teal.500">
              Login with OTP
            </Link>
          </HStack>
          <Center>{error && <Text color="red.300">{error}</Text>}</Center>
        </Stack>
      </Box>
    </GlassLayout>
  );
};

export default Login;
