import { createSlice } from '@reduxjs/toolkit'
import {
  createOutlet,
  getAllOutlets,
  getOutletConfig,
  getOutletDetails,
  updateOutlet,
} from './action'

const initialState = {
  outletList: null,
  outletConfig: null,
  outletDetails: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
    hasNextPage: false,
    hasPrevPage: false > 1,
  },
  loading: {
    getAll: false,
    createNew: false,
    updateOne: false,
    config: false,
    details: false,
  },
  error: null,
}

export const outletSlice = createSlice({
  name: 'outlet',
  initialState,
  reducers: {

    setOutletDetails: (state) => {
      state.outletDetails = null
    },
    setOutletPage: (state, action) => {
      state.pagination.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // get all outlets
      .addCase(getAllOutlets.pending, (state) => {
        state.loading.getAll = true
      })
      .addCase(getAllOutlets.fulfilled, (state, action) => {
        state.loading.getAll = false
        state.outletList = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(getAllOutlets.rejected, (state, action) => {
        ;(state.loading.getAll = false), (state.error = action.payload)
        state.outletList = null
      })
      // create new outlet
      .addCase(createOutlet.pending, (state) => {
        state.loading.createNew = true
      })
      .addCase(createOutlet.fulfilled, (state) => {
        state.loading.createNew = false
      })
      .addCase(createOutlet.rejected, (state, action) => {
        ;(state.loading.createNew = false), (state.error = action.payload)
      })
      .addCase(updateOutlet.pending, (state) => {
        state.loading.updateOne = true
      })
      .addCase(updateOutlet.fulfilled, (state, action) => {
        state.loading.updateOne = false
        const updatedOutlet = action.payload.data
        state.outletList = state.outletList.map((outlet) => {
          outlet._id === updatedOutlet._id ? updatedOutlet : outlet
        })
      })
      .addCase(updateOutlet.rejected, (state, action) => {
        ;(state.loading.updateOne = false), (state.error = action.payload)
      })
      //get outlet config
      .addCase(getOutletConfig.pending, (state) => {
        state.loading.config = true
      })
      .addCase(getOutletConfig.fulfilled, (state, action) => {
        state.loading.config = false
        state.outletConfig = action.payload.data
      })
      .addCase(getOutletConfig.rejected, (state, action) => {
        state.loading.config = false
        state.outletConfig = null
        state.error = action.payload
      })
      //get outlet config
      .addCase(getOutletDetails.pending, (state) => {
        state.loading.details = true
      })
      .addCase(getOutletDetails.fulfilled, (state, action) => {
        state.loading.details = false
        state.outletDetails = action.payload.data
      })
      .addCase(getOutletDetails.rejected, (state, action) => {
        state.loading.details = false
        state.outletConfig = null
        state.error = action.payload
      })
  },
})

export const { setOutletDetails, setOutletPage } = outletSlice.actions
export default outletSlice.reducer
