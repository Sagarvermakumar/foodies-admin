

export const selectAssignedDeliveryList = state=> state.delivery.assignedOrdersList;

export const makeDeliveryLoadingSelector = key => state => state.delivery.loading[key];

export const selectPagination = state => state.delivery.pagination;

export const selectDeliveryError  = state => state.delivery.error;