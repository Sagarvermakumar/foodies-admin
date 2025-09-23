
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../../Components/common/EmptyState";
import Header from "../../Components/common/Heading";
import AssignedDeliveryList from "../../Components/Lists/AssignedDeliveryList";
import UserCardSkeleton from "../../Components/Skeletons/UserCardSkeleton";
import { getAssignedOrders } from "../../features/delevery/action";
import {
  makeDeliveryLoadingSelector,
  selectAssignedDeliveryList,
  selectDeliveryError,
} from "../../features/delevery/selector";

const AssignedDeliveries = () => {
  const dispatch = useDispatch();

  const assignedDeliveriesList = useSelector(selectAssignedDeliveryList);
  const error = useSelector(selectDeliveryError)
  const isLoadingAssignedDeliveriesList = useSelector(
    makeDeliveryLoadingSelector("getAssignedOrders")
  );



  useEffect(() => {
    dispatch(getAssignedOrders());
  }, [dispatch]);

  return (
    <Box pb={32}>
      <Header
        title={"Assigned Deliveries"}
        subtitle={"View, block, or manage all assigned deliveries"}
      />

      {/* User List */}
      <Box flex="1" overflowY="auto">
        {isLoadingAssignedDeliveriesList ? (
          <SimpleGrid columns={[1, 1, 2, 3]} spacing={{ base: 8, md: 6 }}>
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <UserCardSkeleton key={i} />
              ))}
          </SimpleGrid>
        ) : assignedDeliveriesList && assignedDeliveriesList?.length > 0 ? (
          <>
            <AssignedDeliveryList orders={assignedDeliveriesList} />

            {/* Pagination Controls */}
          </>
        ) : (
          <EmptyState
            label="Assigned Deliveries"
            subLabel={error || "Maybe the delivery was not assigned yet."}
            redirectUrl="/profile"
          />
        )}
      </Box>
    </Box>
  );
};

export default AssignedDeliveries;
