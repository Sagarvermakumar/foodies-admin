import {
  Box,
  Center,
  Stack,
  Text
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/common/Heading";
import LoginForm from "../../Components/form/auth/LoginForm";
import { login } from "../../features/auth/authAction";
import { selectAuthError, selectIsAuthenticated, selectLoginLoading } from "../../features/auth/authSelector";
import { saveUserRole } from "../../utils/authHelper.js";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleRedirectMap = {
    SUPER_ADMIN: "/",
    MANAGER: "/",
    STAFF: "/orders",
    DELIVERY: "/delivery",
    CUSTOMER: "/customer"
  };
  const isLoading = useSelector(selectLoginLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);
  const handleLogin = async (data) => {

    try {
      await dispatch(login(data)).unwrap();
      saveUserRole(data.role);
      const role = data.role;
      const redirectPath = roleRedirectMap[role] || "/login";
      navigate(redirectPath, { replace: true });
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


        <Center>{error && <Text color="red.300">{error}</Text>}</Center>
      </Stack>
    </Box>

  );
};

export default Login;
