// features/review/reviewSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { replyToReviewAction } from "./action";

// Async Thunk


const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],      // list of reviews
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearReviewState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reply to Review
      .addCase(replyToReviewAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(replyToReviewAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        const updatedReview = action.payload;
        state.reviews = state.reviews.map((review) =>
          review._id === updatedReview._id ? updatedReview : review
        );
      })
      .addCase(replyToReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
