import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  assignOrderToDelivery,
  deleteCancelledOrder,
  updateOrderStatus,
} from "../../features/orders/orderAction";
import { makeOrderSelectLoader } from "../../features/orders/orderSelector";
import { getDeliveryPersons } from "../../features/users/UserAction";
import { selectDeliveryPersonList } from "../../features/users/userSelector";
import AssignOrderModel from "../Modals/AssignOrderModel";
import UpdateOrderStatusDialog from "../Modals/UpdateOrderStatusDialog";
import UserContact from "../UserContact";
import DeleteConfirmationModal from "../common/DeleteConfirmation";

const OrderList = ({ items }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const deliveryPersons = useSelector(selectDeliveryPersonList);

  const isUpdatingOrderStatus = useSelector(makeOrderSelectLoader("updateStatus"));
  const isDeletingOrder = useSelector(makeOrderSelectLoader("deleteOrder"));

  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null)
  const {
    isOpen: isOpenAssign,
    onOpen: onOpenAssign,
    onClose: onCloseAssign,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  // open update status modal
  const handleOpenUpdateStatusModal = (id) => {
    setOrderId(id);
    onOpen();
  };
  //open assign order modal
  const handleOpenAssignModal = (order) => {
    if (order?.currentOrderStatus === "ASSIGNED") {
      toast.error(
        <span>
          Order Already Assigned to <b>{order?.delivery?.assignedTo?.name}</b>
        </span>
      );
      return;
    }
    setOrderId(order._id)

    onOpenAssign();
    dispatch(getDeliveryPersons());
  };

  // open delete confirmation order modal
  const handleOpenDeleteOrderModal = (order) => {
    setOrder(order);
    onOpenDelete();
  };

  // Ye function backend ko status update request bhejta hai
  const handleUpdateStatus = (status) => {
    const data = { orderId, status };
    dispatch(updateOrderStatus(data));
  };

  // Ye function ek delivery person ko current order assign karta hai
  const handleAssignOrder = (deliveryPersonId) => {
    dispatch(assignOrderToDelivery({ orderId, deliveryPersonId }))
  }
  //Ye function order ko delete karta hai (sirf cancelled orders allowed)
  const handleDeleteOrder = () => {
    dispatch(deleteCancelledOrder(order._id));

  };
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {items.map((order) => (
          <Box
            key={order._id + order.name}
            borderWidth="1px"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            h="600px"
            border=".5px solid "
            borderColor={"gray.600"}
            borderRadius="xl"
            shadow="md"
            p={5}
            bg="blackAlpha.300"
          >
            {/* User Info */}
            <Stack spacing={0}>
              <Text fontSize="lg" fontWeight="bold">
                🆔{order.orderNo}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                👤 {order.user?.name}
              </Text>
              <UserContact phoneNumber={order.user?.phone} />
              <Text fontSize="sm" color="gray.400">
                Ordered at: {new Date(order.createdAt).toLocaleString()}
              </Text>
            </Stack>
            {/* Address */}
            <Box mt={2}>
              <Text fontWeight="bold" fontSize={"md"}>
                📍Address{" "}
              </Text>
              <Text fontSize="sm">
                {order.address?.label} - {order.address?.addressLine}
              </Text>
            </Box>
            {/* Status & Payment */}
            <Flex gap={4} wrap="wrap">
              <Badge
                colorScheme={order.status === "confirmed" ? "green" : "orange"}
              >
                {order.currentOrderStatus}
              </Badge>
              <Badge colorScheme="blue">
                {order.payment.gateway === "NONE"
                  ? "COD"
                  : order.payment.gateway}
              </Badge>
              <Badge colorScheme="purple">₹{order.charges?.grandTotal}</Badge>
            </Flex>
            {/* Items */}
            <Box>
              <Text fontWeight="bold" mb={2} fontSize={"md"}>
                🧾 Items:
              </Text>
              <SimpleGrid height={'75px'} width={'full'} overflowX={'hidden'} sx={{
                /* Scrollbar width */
                "&::-webkit-scrollbar": {
                  width: "6px",   // thin scrollbar
                },
                /* Track */
                "&::-webkit-scrollbar-track": {
                  background: "transparent", // ya "rgba(255,255,255,0.05)" for subtle bg
                },
                /* Thumb */
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(255,255,255,0.3)", // lightweight color
                  borderRadius: "8px",
                },
                /* Thumb hover */
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "rgba(255,255,255,0.5)",
                },
              }} >
                {order.items.map((itemWrap) => (
                  <Flex key={itemWrap._id} gap={3} mb={3} align="center">
                    <Image
                      src={itemWrap?.item?.image}
                      alt={itemWrap?.item?.name}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Box width={'full'} >
                      <Text fontWeight="semibold" fontSize={"sm"}  >
                        {itemWrap.item?.name}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        Qty: {itemWrap?.qty} | ₹{itemWrap.unitPrice}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>

            <Divider />

            <Box>
              <HStack justify={"space-between"}>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  Sub Total{" "}
                </Text>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  {" "}
                  ₹{order?.charges?.subTotal || 0}
                </Text>
              </HStack>
              <HStack justify={"space-between"}>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  Discount{" "}
                </Text>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  {" "}
                  ₹{order?.charges?.discount || 0}
                </Text>
              </HStack>
              <HStack justify={"space-between"}>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  Tax{" "}
                </Text>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  {" "}
                  ₹{parseInt(order?.charges?.tax || 0)}
                </Text>
              </HStack>
              <HStack justify={"space-between"}>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  Delivery Fee{" "}
                </Text>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  {" "}
                  ₹{order?.charges?.deliveryFee || 0}
                </Text>
              </HStack>

              <HStack justify={"space-between"}>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  Grand Total{" "}
                </Text>
                <Text mt={2} fontWeight="bold" fontSize={"sm"}>
                  {" "}
                  ₹{order?.charges?.grandTotal || "NA1"}
                </Text>
              </HStack>
            </Box>
            {/* Action Buttons */}
            <Flex justify={'space-between'} wrap="wrap" gap={1}>
              <Button
                size="sm"
                colorScheme="teal"
                isLoading={isUpdatingOrderStatus}
                loadingText="Updating..."
                onClick={() => handleOpenUpdateStatusModal(order._id)}

              >
                Update Status
              </Button>

              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleOpenAssignModal(order)}
              >
                Assign
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleOpenDeleteOrderModal(order)}
                isLoading={isDeletingOrder}
                loadingText="Deleting..."
              >
                Delete
              </Button>
            </Flex>
          </Box>
        ))}

        {orderId && (
          <UpdateOrderStatusDialog
            isOpen={isOpen}
            onClose={onClose}
            currentStatus={items.find((order) => order._id === orderId)?.currentOrderStatus}
            onUpdate={handleUpdateStatus}
          />
        )}

        <AssignOrderModel
          isOpen={isOpenAssign}
          onClose={onCloseAssign}
          deliveryPersons={deliveryPersons}
          handleConfirmAssign={deliveryPersonId => handleAssignOrder(deliveryPersonId)}
        />

        <DeleteConfirmationModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          onDelete={handleDeleteOrder}
          entityName={order?.orderNo}
          entityLabel={"Order"}
        />
      </SimpleGrid>
    </Box>
  );
};

export default OrderList;
