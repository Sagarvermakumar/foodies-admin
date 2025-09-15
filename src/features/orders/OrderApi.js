import API from "../../utils/axiosClient";

//get all orders
export const getAllOrdersApi = ({ search, status, date }) =>
  API.get("/order/all", {
    params: {
      status,
      date,
      query: search,
    },
  });

// get  orders details
export const getOrderByIDApi = (id) => API.get(`/order/${id}`);

// update order status
export const updateOrderStatusApi = ({ orderId, status }) =>
  API.patch(`/order/${orderId}/status`, { status });

// assign order
export const assignOrderToDeliveryApi = (orderId,deliveryPersonId) =>
  API.patch(`/order/${orderId}/assign`,{deliveryPersonId});

//generate order invoice
export const generateOrderInvoice = (id) => API.patch(`/order/${id}/invoice`);

// process refund if order place and not delivered
export const processRefundApi = (id) => API.post(`/order/${id}/refund`);

//delete Cancelled order
export const deleteCancelledOrderApi = (id) =>
  API.delete(`/order/${id}/delete`);


// remains  : generateOrderInvoice and processRefund 