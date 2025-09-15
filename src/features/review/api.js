import API from "../../utils/axiosClient";

export const replyToReview = (id, data) =>
  API.patch(`/review/${id}/reply`, data);

export const deleteReview = (id) =>
  API.delete(`/review/${id}`);

export const fetchReviews = (page, limit) =>
  API.get(`/review`, { params: { page, limit } });


