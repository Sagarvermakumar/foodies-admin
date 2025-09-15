import { createSlice } from '@reduxjs/toolkit'
import {
  assignOrderToDelivery,
  deleteCancelledOrder,
  getAllOrders,
  updateOrderStatus,
} from './orderAction'

const initialState = {
  orderList: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
    hasNextPage: false,
    hasPrevPage: false > 1,
  },

  loading: {
    allOrders: false,
    updateStatus: false,
    deleteOrder: false,
    assign: false,
  },
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPagination: (state, action) => {
      return { ...state, ...action.payload.pagination }
    },
    setOrderPage: (state, action) => {
      state.pagination.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // all orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading.allOrders = true
        state.error = null
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading.allOrders = false
        state.orderList = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading.allOrders = false
        state.error = action.payload
      })

      // update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading.updateStatus = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading.updateStatus = false
        state.orderList = state.orderList.map((order) =>
          order._id === action.payload.data._id ? action.payload.data : order
        )
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading.updateStatus = false
        state.error = action.payload
      })
      // delete cancelled order
      .addCase(deleteCancelledOrder.pending, (state) => {
        state.loading.deleteOrder = true
        state.error = null
      })
      .addCase(deleteCancelledOrder.fulfilled, (state, action) => {
        state.loading.deleteOrder = false
        console.log(action.payload.orderId)
        state.orderList = state.orderList.filter(
          (order) => order._id !== action.payload.orderId
        ) 
      })
      .addCase(deleteCancelledOrder.rejected, (state, action) => {
        state.loading.deleteOrder = false
        state.error = action.payload
      })

      //assignOrderToDelivery
      .addCase(assignOrderToDelivery.pending, (state, action) => {
        state.loading.assign = false
        state.error = action.payload
      })
      .addCase(assignOrderToDelivery.fulfilled, (state, action) => {
        state.loading.deleteOrder = false
        const updatedOrder = action.payload.data
        state.orderList = state.orderList.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      })
      .addCase(assignOrderToDelivery.rejected, (state, action) => {
        state.loading.deleteOrder = false
        state.error = action.payload
      })
  },
})

export const { setPagination, setOrderPage } = orderSlice.actions

export default orderSlice.reducer
