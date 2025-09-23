import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/common/Loader.jsx";
import { fetchProfile } from "./features/auth/authAction.js";
import { selectAuthUser, selectIsAuthenticated } from "./features/auth/authSelector.js";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";


const AddCoupon = lazy(() => import("./pages/coupons/AddCoupon.jsx"));
const Coupon = lazy(() => import("./pages/coupons/Coupons.jsx"));
const AssignedDeliveries = lazy(() =>
  import("./pages/delivery/AssignedDeliveries.jsx")
);
// public pages
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword.jsx"));
const LoginWithOTP = lazy(() => import("./pages/auth/LoginWithOTP.jsx"));

//admin pages
const AdminLayout = lazy(() => import("./Layout/Admin.jsx"));
const DashboardAdmin = lazy(() => import("./pages/Dashboard.jsx"));
// Lazy imports

const Profile = lazy(() => import("./pages/Profile.jsx"));
const AllNotification = lazy(() => import("./pages/Notifications/AllNotification.jsx"));
const SendNotification = lazy(() => import("./pages/Notifications/SendNotification.jsx"));
const Users = lazy(() => import("./pages/Users.jsx"));
const UserDetails = lazy(() => import("./pages/UserDetails.jsx"));
const AllOrders = lazy(() => import("./pages/Orders.jsx"));

const Categories = lazy(() => import("./pages/categories/Categories.jsx"));
const AddCategories = lazy(() =>
  import("./pages/categories/AddCategories.jsx")
);
const Items = lazy(() => import("./pages/item/Items.jsx"));
const AddItem = lazy(() => import("./pages/item/AddItem.jsx"));
const OutletCreate = lazy(() => import("./pages/outlet/AddOutlet.jsx"));
const Outlets = lazy(() => import("./pages/outlet/Outlets.jsx"));
const Report = lazy(() => import("./pages/Reports/Report.jsx"));
const Review = lazy(() => import("./pages/reviews/Review.jsx"));

//common routes
const PageNotFound = lazy(() => import("./Components/common/PageNotFound.jsx"));
const Unauthorized = lazy(() => import("./Components/common/Unauthorized.jsx"));

const App = () => {
  // const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const userRole = user?.role || "SUPER_ADMIN";

  useEffect(() => {
    dispatch(fetchProfile(userRole));
  }, [dispatch, isAuthenticated, userRole]);


  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/login-otp" element={<LoginWithOTP />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes with Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "SUPER_ADMIN",
                  "MANAGER",
                  "STAFF",
                  "DELIVERY",
                  "CUSTOMER",
                ]}
              >
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* SUPER_ADMIN, MANAGER */}

            {/* SUPER_ADMIN only */}
            <Route index element={<DashboardAdmin />} />
            {/* <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="outlet"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <Outlets />
                </ProtectedRoute>
              }
            />
            <Route
              path="outlet/add"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <OutletCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="outlet/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <OutletCreate />
                </ProtectedRoute>
              }
            />

            {/* STAFF, MANAGER, SUPER_ADMIN */}
            <Route
              path="orders"
              element={
                <ProtectedRoute
                  allowedRoles={["STAFF", "MANAGER", "SUPER_ADMIN"]}
                >
                  <AllOrders />
                </ProtectedRoute>
              }
            />

            {/* Categories (SUPER_ADMIN, MANAGER) */}
            <Route
              path="category"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="category/add"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
                  <AddCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="category/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
                  <AddCategories />
                </ProtectedRoute>
              }
            />

            {/* Items (SUPER_ADMIN, MANAGER) */}
            <Route
              path="item"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
                  <Items />
                </ProtectedRoute>
              }
            />
            <Route
              path="item/add"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
                  <AddItem />
                </ProtectedRoute>
              }
            />
            <Route
              path="item/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
                  <AddItem />
                </ProtectedRoute>
              }
            />

            {/* Coupons (SUPER_ADMIN only) */}
            <Route
              path="coupon"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <Coupon />
                </ProtectedRoute>
              }
            />
            <Route
              path="coupon/add"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <AddCoupon />
                </ProtectedRoute>
              }
            />
            <Route
              path="coupon/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <AddCoupon />
                </ProtectedRoute>
              }
            />

            {/* Users (SUPER_ADMIN, MANAGER) */}
            <Route
              path="users"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:id"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER", "DELIVERY"]}>
                  <UserDetails />
                </ProtectedRoute>
              }
            />

            {/* Delivery (DELIVERY + SUPER_ADMIN) */}
            <Route
              path="delivery"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "DELIVERY"]}>
                  <AssignedDeliveries />
                </ProtectedRoute>
              }
            />

            {/* Reports (SUPER_ADMIN only) */}
            <Route
              path="report"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <Report />
                </ProtectedRoute>
              }
            />
            {/* Review (SUPER_ADMIN only) */}
            <Route
              path="review/:name/:id"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <Review />
                </ProtectedRoute>
              }
            />

            {/* Notification (sabko allow) */}
            <Route
              path="notification-send"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "SUPER_ADMIN",
                    "MANAGER",
                    "STAFF",
                    "DELIVERY",
                    "CUSTOMER",
                  ]}
                >
                  <SendNotification />
                </ProtectedRoute>
              }
            />

            {/* Profile (sabko allow) */}
            <Route
              path="profile"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "SUPER_ADMIN",
                    "MANAGER",
                    "STAFF",
                    "DELIVERY",
                    "CUSTOMER",
                  ]}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router >
  );
};

export const server = `http://localhost:4000`;
export default App;
