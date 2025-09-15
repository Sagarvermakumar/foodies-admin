

export const selectUserList = state=> state.user.usersList

export const selectUserDetails = state=> state.user.userDetails
export const selectUserPagination = state=> state.user.pagination

export const makeLoadingSelector = (key)=>  state=> state.user.loading[key]

export const selectDeliveryPersonList = state=> state.user.deliveryPersonList

export const selectError = state=> state.user.error
