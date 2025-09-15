import { isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit'
import { Slide, toast } from 'react-toastify'

const apiNotificationMiddleware = () => (next) => (action) => {
  // Agar API call fail hui
  if (isRejectedWithValue(action)) {
    const message = action.payload || 'Something went wrong!'

    toast.error(message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Slide,
    })
  }

  // Agar API call success hui
  if (isFulfilled(action)) {
    const message =
      action.payload?.message || action.meta?.arg?.successMessage || null

    if (message) {
      toast.success(message, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      })
    }
  }

  return next(action)
}

export default apiNotificationMiddleware
