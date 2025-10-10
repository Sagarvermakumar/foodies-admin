import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  assignOrderToDeliveryApi,
  deleteCancelledOrderApi,
  getAllOrdersApi,
  getOrderByIDApi,
  processRefundApi,
  updateOrderStatusApi,
} from './OrderApi'

// get all orders
export const getAllOrders = createAsyncThunk(
  '/orders/all',
  async (filters, thunkAPI) => {
    try {
      const res = await getAllOrdersApi(filters)
      return res.data
    } catch (error) {
      console.error(`Failed to fetch Orders ${error.message}`)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed To Fetch Orders'
      )
    }
  }
)

// get Order by ID
export const getOrderByID = createAsyncThunk(
  '/order/details',
  async (id, thunkAPI) => {
    try {
      const res = await getOrderByIDApi(id)
      return res.data
    } catch (error) {
      console.error(`Failed to fetch Order Derails ${error.message}`)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed To Fetch Order details'
      )
    }
  }
)

// update order status
export const updateOrderStatus = createAsyncThunk(
  '/order/update-status',
  async (data, thunkAPI) => {
    try {
      const res = await updateOrderStatusApi(data)
      toast.success(res.data.message || 'Status Updated!')
      return res.data
    } catch (error) {
      console.error(`Failed to update Order status ${error}`)
      toast.error(
        error.response?.data.message || 'Failed To Update Order Status'
      )
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed To Update Order Status'
      )
    }
  }
)

// assign order
export const assignOrderToDelivery = createAsyncThunk(
  '/order/assign',
  async ({ orderId, deliveryPersonId }, thunkAPI) => {
    try {
      const res = await assignOrderToDeliveryApi(orderId, deliveryPersonId)
      toast.success(res.data?.message || 'Order Assign Failed')
      return res.data
    } catch (error) {
      console.error(`Failed to assign  Order ${error.message}`)
      toast.error(error.response?.data.message || 'Failed To assign Order')
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed To assign Order'
      )
    }
  }
)
// process refund
export const processRefund = createAsyncThunk(
  '/order/refund',
  async (id, thunkAPI) => {
    try {
      const res = await processRefundApi(id)
      return res.data
    } catch (error) {
      console.error(`Failed to refund ${error.message}`)
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed To refund'
      )
    }
  }
)
// process refund
export const deleteCancelledOrder = createAsyncThunk(
  '/order/delete',
  async (id, thunkAPI) => {
    try {
      const res = await deleteCancelledOrderApi(id)
      toast.success(res.data?.message || "Deleted!")
      return res.data
    } catch (error) {
      console.error(`Failed to delete  Order ${error.message}`);
      toast.error(   error.response?.data.message || 'Failed To Delete  Order')
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed To Delete  Order'
      )
    }
  }
)
