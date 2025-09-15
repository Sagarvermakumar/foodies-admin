import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CouponList from "../../Components/Lists/CouponList";
import CategoryListSkeleton from "../../Components/Skeletons/CategoryListSkeleton ";
import EmptyState from "../../Components/common/EmptyState";
import Header from "../../Components/common/Heading";
import { getAllCoupons } from "../../features/coupon/couponAction";
import {
  MakeCouponLoadingSelector,
  selectCouponList,
  selectCouponsError
} from "../../features/coupon/couponSelector";

const Coupons = () => {
  const dispatch = useDispatch();
  const couponList = useSelector(selectCouponList);
  const error = useSelector(selectCouponsError);

  console.log("Couon error : ", error)
  const isLoadingCoupon = useSelector(MakeCouponLoadingSelector("get"));
  console.log({ couponList })
  useEffect(() => {
    dispatch(getAllCoupons({ query: "", page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <Box>
      {/* Header + Date Picker */}

      <Header
        title={"Manage Coupons"}
        subtitle={"Track, manage, and update all coupons"}
      />

      {/* Orders List or Skeleton */}
      <Box flex="1" overflowX="auto">
        {isLoadingCoupon ? (
          <CategoryListSkeleton />
        ) : couponList && couponList?.length > 0 ? (

          <CouponList coupons={couponList} />

        ) : (
          <EmptyState
            label="Coupon"
            subLabel="Maybe coupon deleted or does not exist."
          />
        )}
      </Box>
    </Box>
  );
};

export default Coupons;
