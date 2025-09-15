import {
  Box,
  Button,
  GridItem,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../../Components/common/EmptyState";
import Header from "../../Components/common/Heading";
import OutletList from "../../Components/Outlet/OutletList";
import OutletSkeleton from "../../Components/Skeletons/OutletSleleton";
import { getAllOutlets } from "../../features/outlet/action";
import {
  selectOutletList,
  selectOutletLoading,
  selectPagination,
} from "../../features/outlet/selector";
import { MdAddBusiness } from "react-icons/md";
import CreateNew from "../../Components/common/CreateNew";
import { setPagination } from "../../features/orders/orderSlice";
import Pagination from "../../Components/common/Pagination";

const Outlets = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const isLoadingOutlets = useSelector(selectOutletLoading("getAll"));
  const data = useSelector(selectOutletList);
  const pagination = useSelector(selectPagination);

  const filter = useMemo(() => ({ query, limit, page }), [query, limit, page]);

  useEffect(() => {
    dispatch(getAllOutlets(filter));
  }, [dispatch, filter]);



  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      setQuery(value);
      setPage(1);
    }, 500);

    setTypingTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  return (
    <Box>
      <Stack
        justify={{ base: "start", lg: "space-between" }}
        align={{ base: "start", lg: "center" }}
        direction={{ base: "column", lg: "row" }}
      >
        <Header
          title="Outlets"
          subtitle="Add, edit, or manage all available outlets"
        />

        <Input
          placeholder="Search by name or number..."
          value={searchText}
          onChange={handleChange}
          mb={{ base: 4, md: 0 }}
          w={{ base: "full", md: "300px" }}

        />
      </Stack>

      <Box flex="1" overflowY="auto">
        {isLoadingOutlets ? (
          <OutletSkeleton />
        ) : data && data.length !== 0 ? (
          <>
            <OutletList outlets={data} pagination={pagination} />

          </>
        ) : (
          <CreateNew
            label="Outlet Not Exist"
            subLabel=" Setup your first outlet to start managing orders and deliveries."
            btnLabel="Create"
            redirectUrl="/outlet/add"
          />
        )}
      </Box>
    </Box>
  );
};

export default Outlets;
