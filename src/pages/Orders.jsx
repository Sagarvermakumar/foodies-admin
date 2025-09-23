import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from '../Components/common/EmptyState';
import FilterBar from "../Components/common/FilterBar";
import Header from "../Components/common/Heading";
import Pagination from "../Components/common/Pagination";
import OrderList from "../Components/Lists/OrderList";
import OrdersSkeleton from "../Components/Skeletons/OrdersSkeleton";
import { getAllOrders } from "../features/orders/orderAction";
import {
  makeOrderSelectLoader,
  selectOrders,
  selectPagination
} from "../features/orders/orderSelector";
import { setOrderPage } from "../features/orders/orderSlice";
const Orders = () => {
  const dispatch = useDispatch();


  const orderList = useSelector(selectOrders);
  const isLoadingAllOrders = useSelector(makeOrderSelectLoader("allOrders"));
  const pagination = useSelector(selectPagination);
  const today = new Date().toISOString().split("T")[0];


  const [filter, setFilter] = useState({
    search: "",
    status: "",
    date: today,
  });

  const filteredItems = orderList?.filter((item) => {
    const name = item?.name?.toLowerCase() || "";
    const desc = item?.description?.toLowerCase() || "";
    const search = filter?.search?.toLowerCase() || "";

    return name.includes(search) || desc.includes(search);
  });


  useEffect(() => {
    dispatch(getAllOrders(filter));
  }, [dispatch, filter]);


  if (!orderList) return <EmptyState
    label="Orders"
    subLabel="Maybe Orders deleted or does not exist."
    redirectUrl="/profile"
  />
  return (
    <Box>
      {/* Header + Date Picker */}

      <Header
        title={"Customer Orders"}
        subtitle={"Track, manage, and update all food orders"}
      />

      <FilterBar onFilter={(val) => setFilter(val)} today={today} />

      {/* Orders List or Skeleton */}
      <Box flex="1" overflowX="auto">
        {isLoadingAllOrders ? (
          <OrdersSkeleton />
        ) : orderList && orderList?.length > 0 ? (
          <>
            <OrderList items={filteredItems} />


            <Box>
              <Pagination
                pagination={pagination}
                setPageAction={getAllOrders}
                fetchAction={setOrderPage}
              />
            </Box>
          </>
        ) : (

          <Box textAlign="center" py={20}>
            <Heading size="lg" color="gray.500" mb={4}>
              Order not found
            </Heading>
            <Text color="gray.600" mb={8}>
              The order you're looking for doesn't exist or has been removed.
            </Text>
          </Box>
        )}
      </Box>

    </Box>
  );
};

export default Orders;
