"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";
import { MapPinIcon, Undo } from 'lucide-react';
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { blockUser, unblockUser } from "../features/users/UserAction";
import ProfilePictureUpdater from "./ProfilePictureUpdater";
import UserContact from "./UserContact";

const UserDetailsCard = ({ user }) => {
  const dispatch = useDispatch()
  const { userDetails, isLoadingChangeUserStatus } = useSelector((state) => state.user);

  // open user location in maps
  const openInGoogleMaps = (location) => {
    console.log(location)
    if (location && location.length > 0) {
      const [lat, long] = location
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
      window.open(url, '_blank');
    } else {
      toast.error('No address found for this user.');
    }
  };





  // block and active user status
  const handdleBlockUser = () => {
    console.log("s")
    if (userDetails.status === 'active') {
      dispatch(blockUser(userDetails._id));
    } else {
      dispatch(unblockUser(userDetails._id));

    }
  };
  return (
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
      {/* Profile Header */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        mb={6}
        gap={6}
      >
        {user.role !== "CUSTOMER" ? (
          <ProfilePictureUpdater
            name={user?.name}
            avatar={user?.avatar?.url}
            id={user._id}
          />
        ) : (
          <Avatar
            src={user.avatar?.url}
            name={user.name}
            size="2xl"
            border="3px solid"
            borderColor="brand.500"
          />
        )}

        <Box textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="2xl" fontWeight="bold">
            {user.name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {user.email}
          </Text>
          <UserContact phoneNumber={user.phone} />
        </Box>
      </Flex>

      {/* Badges */}
      <Stack
        direction="row"
        spacing={3}
        mb={6}
        justify={{ base: "center", md: "flex-start" }}
      >
        <Badge
          px={4}
          py={1}
          rounded="md"
          fontSize="0.9em"
          colorScheme={user.role === "Admin" ? "purple" : "blue"}
        >
          {user.role.toUpperCase()}
        </Badge>
        <Badge
          px={4}
          py={1}
          rounded="md"
          fontSize="0.9em"
          colorScheme={user.status === "active" ? "green" : "red"}
        >
          {user.status}
        </Badge>
        <Badge
          px={4}
          py={1}
          rounded="md"
          fontSize="0.9em"
          colorScheme={user.isVerified ? "green" : "yellow"}
        >
          {user.isVerified ? "Verified" : "Not Verified"}
        </Badge>
      </Stack>

      <Divider my={4} />

      {/* User Details */}
      <Stack spacing={2} mb={4} fontSize="sm">
        <Text>
          <b>Referral Code:</b> {user.referralCode}
        </Text>
        <Text>
          <b>Referred By:</b> {user.referredBy || "N/A"}
        </Text>
        <Text>
          <b>Wallet Balance:</b> ₹{user.walletBalance}
        </Text>
        <Text>
          <b>Created At:</b> {new Date(user.createdAt).toLocaleString()}
        </Text>
        <Text>
          <b>Last Updated:</b> {new Date(user.updatedAt).toLocaleString()}
        </Text>
      </Stack>

      <Divider my={4} />

      {/* Address */}
      <Box>
        <Text fontWeight="bold" fontSize="lg" mb={3}>
          📍 Address Details
        </Text>
        {user.address && user.address.length > 0 ? (
          <SimpleGrid columns={[1, 1, 2, 3]} spacing={{ base: 8, md: 6 }}>{
            user.address.map((addr, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderColor={'gray.800'}
                rounded="lg"
                mb={4}
                shadow="sm"
                bg="blackAlpha.200"
              >
                <HStack mb={3} justify="space-between">
                  <Text fontWeight="semibold">🏷️ {addr.label}</Text>
                  {addr.isDefaultAddress && (
                    <Badge
                      px={3}
                      py={1}
                      rounded="md"
                      colorScheme="green"
                      fontSize="0.8em"
                    >
                      Default
                    </Badge>
                  )}
                </HStack>

                <Stack spacing={1} fontSize="sm">
                  <Text>
                    <b>Address:</b> {addr.addressLine}
                  </Text>
                  <Text>

                    <b>Added On:</b>{" "}
                    {new Date(addr.createdAt).toLocaleDateString()}
                  </Text>
                  <Button
                    mt={4}
                    leftIcon={<FaMapMarkedAlt />}
                    size="sm"
                    variant={'outline'}
                    width={'fit-content'}
                    onClick={() => openInGoogleMaps(addr?.location?.coordinates)}
                  >
                    Open Location in Map
                  </Button>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Card bg={'transparent'}>
            <CardBody textAlign="center">
              <Icon as={MapPinIcon} boxSize={16} color="gray.400" />
              <Heading size="lg" color="gray.500" mb={4}>
                No addresses yet
              </Heading>
              <Text color="gray.600" mb={8}>
                Add your first delivery address to get started with ordering.
              </Text>

            </CardBody>
          </Card>
        )}
      </Box>

      <Button
        leftIcon={
          user?.status === 'active' ? <MdBlockFlipped /> : <Undo />
        }
        size="sm"
        isLoading={isLoadingChangeUserStatus}
        onClick={handdleBlockUser}
      >
        {user?.status === 'active' ? 'Block' : 'Unblock'} User
      </Button>

    </Box>
  );
};

export default UserDetailsCard;
