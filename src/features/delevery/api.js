import API from "../../utils/axiosClient";

export const getAssignedOrdersApi = () => API.get("/delivery/assigned");

export const markOrderPickedApi = (id) => API.patch(`/delivery/${id}/pick`, {});

export const markOrderDeliveredApi = (id) =>
  API.patch(`/delivery/${id}/delivered`, {});

export const updateLocationApi = ({ orderId, coordinates }) =>
  API.patch(`/delivery/${orderId}/location`, {
    lat: coordinates[1],
    lng: coordinates[0],
  });
