import {
  Box,
  Input,
  SimpleGrid,
  Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'react-responsive-pagination/themes/classic-light-dark.css';
import EmptyState from "../Components/common/EmptyState";
import Header from "../Components/common/Heading";
import UserList from "../Components/Lists/UserList";
import UserCardSkeleton from "../Components/Skeletons/UserCardSkeleton";

import { getAllUsers, getDeliveryPersons } from "../features/users/UserAction";
import {
  makeLoadingSelector,
  selectUserList,
  selectUserPagination
} from "../features/users/userSelector";

const Users = () => {
  const dispatch = useDispatch();
  const userList = useSelector(selectUserList);
  const pagination = useSelector(selectUserPagination);
  const isLoadingUsers = useSelector(makeLoadingSelector("users"));
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    dispatch(
      getAllUsers({
        query,
        page,
        limit: 10,
        role: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      })
    );
  }, [dispatch, query, page]);

  const handleChange = (e) => {
    const value = e.target.value;

    setSearchText(value);

    // debounce for server
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setQuery(value);
      }, 500)
    );

    setPage(1);
  };
  useEffect(() => {
    dispatch(getDeliveryPersons())
  }, [dispatch]);






  return (
    <Box p={0}>
      <Stack
        justify={{ sm: "start", md: "start", lg: "space-between" }}
        alignItems={{ base: "start", md: "start", lg: "center" }}
        flexDir={{ base: "column", md: "column", lg: "row" }}
      >
        <Header
          title={"User Management"}
          subtitle={"View, block, or manage all registered users"}
        />
        <Input
          isRequired
          placeholder="Search By name, Email or Number.."
          type={"text"}
          value={searchText}
          onChange={handleChange}
          mb={6}
          w={{ base: "full", md: "full", lg: "220px" }}

        />
      </Stack>

      {/* User List */}
      <Box flex="1" overflowY="auto">
        {isLoadingUsers ? (
          <SimpleGrid columns={[1, 1, 2, 3]} spacing={{ base: 8, md: 6 }}>
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <UserCardSkeleton key={i + 1} />
              ))}
          </SimpleGrid>
        ) : userList && userList?.length > 0 ? (
          <>
            <UserList usersList={userList} pagination={pagination} />

            {/* Pagination Controls */}

          </>
        ) : (
          <EmptyState
            label="User"
            subLabel="Maybe the User was deleted or does not exist."
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;
