export const selectCouponList = (state) => state.coupon.couponList;

export const MakeCouponLoadingSelector = (key) => (state) =>
  state.coupon.loading[key];

export const selectCouponPagination = (state) => state.coupon.pagination;

export const newCoupon = (state) => state.coupon.newCoupon;


export const selectCurrentCoupon = (state) => state.coupon.currentCoupon;


export const selectCouponsError = state => state.coupon.error
