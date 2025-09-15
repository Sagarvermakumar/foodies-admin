import {
  Badge,
  Box,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDeleteForever, MdEditDocument, MdOpenInNew } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUserProfile, getAllUsers } from "../../features/users/UserAction";
import { setUserPage } from "../../features/users/userSlice";
import DeleteConfirmationModal from "../common/DeleteConfirmation";
import Pagination from "../common/Pagination";

const UserList = ({ usersList, pagination }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const handleRoleUpdate = () => {
    toast.error("⚠️ Role edit feature is currently unavailable. ");
  };


  // open delete user confirmation modal
  const handleOpenDeleteModal = (userDetails) => {
    setUser(userDetails);
    onOpen();
  };


  // send request in backend to delete user
  const handleDeleteProfile = () => {
    dispatch(deleteUserProfile(user._id));
  };
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={{ base: 6, md: 8 }} mb={8}>
      {usersList.map((user) => (
        <Box
          key={user._id}
          bg="blackAlpha.300"
          p={6}
          borderLeft="4px solid"
          borderTopLeftRadius={"base"}
          borderBottomLeftRadius={"base"}
          borderColor={user.role === "Admin" ? "#f80" : "#ff0080"}
          boxShadow={"dark-lg"}
        >
          <Flex justify="space-between" align="center" mb={1}>
            <Text fontWeight="bold" fontSize="lg">
              {user.name}
            </Text>
            <Flex gap={2}>
              <Tooltip label="Change Role" hasArrow>
                <IconButton
                  icon={<MdEditDocument size={"18px"} />}
                  size="sm"
                  variant={"outline"}
                  onClick={handleRoleUpdate}
                  aria-label="Edit Role"
                />
              </Tooltip>
              <Tooltip label={`${user?.name}'s Delete Profile`} hasArrow>
                <IconButton
                  icon={<MdDeleteForever size={"18px"} />}
                  size="sm"
                  variant={"outline"}
                  onClick={() => handleOpenDeleteModal(user)}
                  aria-label="Edit Role"
                />
              </Tooltip>
              <Link to={`/users/${user._id}`} key={user._id}>
                <Tooltip label="View Details" fontSize="md">
                  <IconButton
                    icon={<MdOpenInNew size={"18px"} />}
                    size="sm"
                    aria-label="Edit"
                    variant={"outline"}
                  />
                </Tooltip>
              </Link>
            </Flex>
          </Flex>

          <Text fontSize="sm" color="gray.400" mb={1}>
            {user.email}
          </Text>
          <Text fontSize="sm" mb={3}>
            📞 {user.phone}
          </Text>

          <Flex gap={2} wrap="wrap">
            <Badge colorScheme={user.role === "Admin" ? "purple" : "blue"}>
              {user.role}
            </Badge>
            <Badge colorScheme={user.status === "active" ? "green" : "red"}>
              {user.status}
            </Badge>
            <Badge colorScheme={user.isVerified ? "green" : "yellow"}>
              {user.isVerified ? "Verified" : "Not Verified"}
            </Badge>
          </Flex>
        </Box>
      ))}

      <Pagination pagination={pagination} setPageAction={setUserPage} fetchAction={getAllUsers} />
      {user && (
        <DeleteConfirmationModal
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleDeleteProfile}
          entityLabel="user"
          entityName={user?.name}
        />
      )}
    </SimpleGrid>
  );
};

export default UserList;
