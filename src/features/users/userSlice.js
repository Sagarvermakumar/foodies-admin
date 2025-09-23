import { createSlice } from '@reduxjs/toolkit'
import {
  blockUser,
  deleteUserProfile,
  getAllUsers,
  getDeliveryPersons,
  getUserById,
  unblockUser,
  updateAvatar,
  updateProfileDetails,
  updateUserRole,
} from './UserAction'

const initialState = {
  usersList: null,
  userDetails: null,
  deliveryPersonList: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
    hasNextPage: false,
    hasPrevPage: false > 1,
  },
  loading: {
    role: false,
    userDetails: false,
    users: false,
    userStatus: false,
    updateProfile: false,
    updateAvatar: false,
    deleteUser: false,
    deliveryPerson: false,
  },
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserAvatar(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          avatar: {
            public_id: action.payload.user.avatar.public_id,
            url: action.payload.user.avatar.url,
          },
        }
      }
    },
    setUserPage : (state,action)=>{
      state.pagination.page = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // update profile details
      .addCase(updateProfileDetails.pending, (state) => {
        state.loading.updateProfile = true
        state.error = null
      })
      .addCase(updateProfileDetails.fulfilled, (state, action) => {
        state.loading.updateProfile = false
        state.user = action.payload.user
      })
      .addCase(updateProfileDetails.rejected, (state, action) => {
        state.loading.updateProfile = false
        state.error = action.payload
      })
      // update avatar
      .addCase(updateAvatar.pending, (state) => {
        state.loading.updateAvatar = true
        state.error = null
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading.updateAvatar = false
        const updatedAvatar = {
          public_id: action.payload.user.avatar.public_id,
          url: action.payload.user.avatar.url,
        }

        // Update state.user
        if (state.user) {
          state.user.avatar = updatedAvatar
        }

        // Also update userDetails if it exists
        if (state.userDetails) {
          state.userDetails.avatar = updatedAvatar
        }
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading.updateAvatar = false
        state.error = action.payload
      })
      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading.users = true
        state.error = null
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading.users = false
        state.usersList = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading.users = false
        state.error = action.payload
      })
      // get user by ID
      .addCase(getUserById.pending, (state) => {
        state.loading.userDetails = true
        state.error = null
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading.userDetails = false
        state.userDetails = action.payload.data
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading.userDetails = false
        state.error = action.payload
      })
      // block user
      .addCase(blockUser.pending, (state) => {
        state.loading.userStatus = true
        state.error = null
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading.userStatus = false
        state.userDetails = {
          ...state.userDetails,
          ...action.payload.user,
          status: 'blocked',
        }
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading.userStatus = false
        state.error = action.payload
      })
      // unblock user
      .addCase(unblockUser.pending, (state) => {
        state.loading.userStatus = true
        state.error = null
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.loading.userStatus = false
        state.userDetails = {
          ...state.userDetails,
          ...action.payload.user,
          status: 'active',
        }
      })
      .addCase(unblockUser.rejected, (state, action) => {
        state.loading.userStatus = false
        state.error = action.payload
      })
      // update user role
      .addCase(updateUserRole.pending, (state) => {
        state.loading.role = true
        state.error = null
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading.role = false
        const updatedUsers = state.usersList.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user
        )
        state.usersList = updatedUsers
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading.role = false
        state.error = action.payload
      })
      // delete user profile
      .addCase(deleteUserProfile.pending, (state) => {
        state.loading.deleteUser = true
        state.error = null
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        state.deleteUser = false
        state.usersList = state.usersList.filter(
          (user) => user._id !== action.payload.user._id
        )
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.loading.deleteUser = false
        state.error = action.payload
      })
      // delivery person
      .addCase(getDeliveryPersons.pending, (state) => {
        state.loading.deliveryPerson = true
        state.error = null
      })
      .addCase(getDeliveryPersons.fulfilled, (state, action) => {
        state.loading.deliveryPerson = false
        state.deliveryPersonList = action.payload.data
      })
      .addCase(getDeliveryPersons.rejected, (state, action) => {
        state.loading.deliveryPerson = false
        state.error = action.payload
      })
  },
})

export const { updateUserAvatar, setUserPage } = userSlice.actions

export default userSlice.reducer
