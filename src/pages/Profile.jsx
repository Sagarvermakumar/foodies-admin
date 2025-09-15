import {
  Box,
  Button,
  Stack,
  Text
} from "@chakra-ui/react";
import { FaList } from "react-icons/fa6";
import { MdAddHome, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import UserDetailsCard from "../Components/UserDetailsCard.jsx";
import { logoutUser } from "../features/auth/authAction.js";


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);

  // Function to handle logout
  const handleLogout = () => {

    dispatch(logoutUser());

  }
  return (
    <Box
      mt={4}
    >
      {user ? (
        <>

          <UserDetailsCard user={user} />

          <Box
            w="100%"
            maxW="6xl"
            mx="auto"
            borderWidth="1px"
            borderColor="gray.800"
            rounded="xl"
            shadow="md"
            p={{ base: 6, lg: 8 }}
          >

            <Stack spacing={3} flexDir={{ base: "column", lg: "row" }} mb={{ sm: 4, md: 0 }} >


              {
                user?.role === "SUPER_ADMIN" && <Button
                  leftIcon={<MdAddHome />}
                  size="sm"
                  mt={3}
                  onClick={() => navigate('/item/add')}
                >
                  Create Menu
                </Button>
              }
              <Button
                leftIcon={<FaList />}
                size="sm"
                mt={3}
                onClick={() => navigate('/orders')}
              >
                View Orders
              </Button>
              <Button
                leftIcon={<MdLogout />}
                colorScheme="blue"
                size="sm"
                mt={3}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Stack>
          </Box>

        </>
      ) : (
        <Box textAlign="center" p={4}>
          <Text fontSize="xl" color="gray.500">Loading User Details...</Text>
        </Box>
      )}
    </Box>
  );
};





export default Profile;
