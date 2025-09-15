// utils/orderHelpers.js

// 1. Get label for order status
export const getOrderStatusLabel = (status) => {
  switch (status) {
    case "PLACED":
      return "Placed";
    case "PREPARING":
      return "Preparing";
    case "OUT_FOR_DELIVERY":
      return "Out for Delivery";
    case "DELIVERED":
      return "Delivered";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "Unknown";
  }
};

// 2. Get Chakra UI badge color scheme for status
export const getStatusColor = (status) => {
  switch (status) {
    case "PLACED":
      return "blue";
    case "PREPARING":
      return "yellow";
    case "OUT_FOR_DELIVERY":
      return "purple";
    case "DELIVERED":
      return "green";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};

// 3. Check if order is cancellable
export const isCancellable = (status) => {
  return ["PLACED", "PREPARING"].includes(status);
};
