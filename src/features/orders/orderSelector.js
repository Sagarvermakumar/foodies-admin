
export const selectOrders = state=> state.order.orderList;

export const makeOrderSelectLoader = key => state => state.order.loading[key];

export const selectPagination = state=> state.order.pagination

export const error = state=> state.order.error;

