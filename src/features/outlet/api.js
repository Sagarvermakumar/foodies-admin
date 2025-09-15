import API from "../../utils/axiosClient";

export const getAllOutletsApi = (filter) =>
  API.get("/outlet", {
    params: {
      query:filter?.query,
      page:filter?.page,
      limit:filter?.limit,
    },
  });

export const createOutletApi = (data) => API.post("/outlet", data);

export const updateOutletApi = (id, data) => API.patch(`/outlet/${id}/update`, data);

export const getOutletConfigApi = (id) => API.get(`/outlet/${id}/config`);
export const getOutletDetailsApi = id=> API.get(`/outlet/${id}/details`)



// remains : outlet config 
