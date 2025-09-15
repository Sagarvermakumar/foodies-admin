import { X } from "lucide-react";
import API from "../../utils/axiosClient";

export const getSalesReportApi = (range) =>
  API.get("/report/sales", {
    params: { range },
  });

export const getTopItemsReportApi = (limit) =>
  API.get("/report/top-items", {
    params: { limit },
  });

export const getCustomerReportApi = (xDaysAgo) => API.get("/report/customers",{
    params:{xDaysAgo}
});

export const getDeliveryPerformanceReportApi = () =>
  API.get("/report/delivery-performance");

export const exportReportCSVApi = () => API.get("/report/export.csv");

export const statsApi = () => API.get("/report/stats");

export const orderReportApi = (lastXDaysAgo) =>
  API.get("/report/order", {
    params: {lastXDaysAgo: lastXDaysAgo },
  });
