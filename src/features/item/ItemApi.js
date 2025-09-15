import API from "../../utils/axiosClient";

export const getItemDetailsApi = (id) =>
  API.get(`/item/details/${id}`);


export const createItemApi = (data) =>
  API.post(`/item/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });



export const getAllItemsApi = (filters) =>
  API.get("/item/all", {
    params: {
      page:filters.page,
      
    },
  });


export const editItemApi = (id, data) =>
  API.put(`/item/update/${id}`, data);

export const toggleItemAvailabilityApi = (itemId) =>
  API.patch(`/item/toggle/${itemId}`);


export const updateStockThresholdApi = (id,lowStockThreshold) => API.patch(`/item/stock/${id}`,{
  lowStockThreshold
});


export const deleteItemApi = (id) => API.delete(`/item/delete/${id}`);





