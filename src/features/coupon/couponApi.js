import API from "../../utils/axiosClient";

export const getAllCouponsApi = (query,page,limit) => API.get("/coupon",{
    params:  {
      query,
      page,
      limit,
    }
  });

export const createCouponApi = (data) => API.post("/coupon", data);

export const updateCouponApi = (id, data) => API.patch(`/coupon/${id}`, data);

export const deleteCouponApi = (id) => API.delete(`/coupon/${id}`);

export const getCouponByIdApi = (id) => API.get(`/coupon/${id}`);
