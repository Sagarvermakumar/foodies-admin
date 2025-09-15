import { createAsyncThunk } from "@reduxjs/toolkit";
import { replyToReview } from "./api";

export const replyToReviewAction = createAsyncThunk(
  "review/replyToReview",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await replyToReview(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reply to review"
      );
    }
  }
);