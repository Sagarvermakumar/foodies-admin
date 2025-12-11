import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/common/Loader.jsx";
import { logoutUser } from "./features/auth/authAction.js";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import axiosClient from "./utils/axiosClient.js";

// Public pages
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword.jsx"));
const LoginWithOTP = lazy(() => import("./pages/auth/LoginWithOTP.jsx"));
const Unauthorized = lazy(() => import("./Components/common/Unauthorized.jsx"));
const PageNotFound = lazy(() => import("./Components/common/PageNotFound.jsx"));

// Admin Layout + Dashboard
const AdminLayout = lazy(() => import("./Layout/Admin.jsx"));
const DashboardAdmin = lazy(() => import("./pages/Dashboard.jsx"));

// User pages
const Users = lazy(() => import("./pages/Users.jsx"));
const UserDetails = lazy(() => import("./pages/UserDetails.jsx"));

// Categories
const Categories = lazy(() => import("./pages/categories/Categories.jsx"));
const AddCategories = lazy(() => import("./pages/categories/AddCategories.jsx"));

// Items
const Items = lazy(() => import("./pages/item/Items.jsx"));
const AddItem = lazy(() => import("./pages/item/AddItem.jsx"));

// Orders + Delivery
const AllOrders = lazy(() => import("./pages/Orders.jsx"));
const AssignedDeliveries = lazy(() => import("./pages/delivery/AssignedDeliveries.jsx"));

// Coupons
const Coupon = lazy(() => import("./pages/coupons/Coupons.jsx"));
const AddCoupon = lazy(() => import("./pages/coupons/AddCoupon.jsx"));

// Outlets
const Outlets = lazy(() => import("./pages/outlet/Outlets.jsx"));
const OutletCreate = lazy(() => import("./pages/outlet/AddOutlet.jsx"));

// Review
const Review = lazy(() => import("./pages/reviews/Review.jsx"));

// Notifications
const AllNotification = lazy(() => import("./pages/Notifications/AllNotification.jsx"));
const SendNotification = lazy(() => import("./pages/Notifications/SendNotification.jsx"));

// Profile
const Profile = lazy(() => import("./pages/Profile.jsx"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axiosClient.get(`/auth/me?role=SUPER_ADMIN`, {
          withCredentials: true,
        });

        const userRole = data?.user.role;

        // If CUSTOMER tries to access admin -> logout
        if (userRole === "CUSTOMER") {
          dispatch(logoutUser());
        }

      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, [dispatch]);

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


          {/* Protected Admin Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                allowedRoles={["SUPER_ADMIN", "MANAGER", "STAFF", "DELIVERY"]}
              >
                <AdminLayout />
              </ProtectedRoute>
            }
          >

            {/* ADMIN HOME (Dashboard) */}
            <Route
              index
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
                  <DashboardAdmin />
                </ProtectedRoute>
              }
            />

            {/* OUTLETS */}
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

            {/* ORDERS */}
            <Route
              path="orders"
              element={
                <ProtectedRoute allowedRoles={["STAFF", "MANAGER", "SUPER_ADMIN"]}>
                  <AllOrders />
                </ProtectedRoute>
              }
            />

            {/* CATEGORIES */}
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

            {/* ITEMS */}
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

            {/* COUPONS */}
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

            {/* USERS */}
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

            {/* DELIVERY */}
            <Route
              path="delivery"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "DELIVERY"]}>
                  <AssignedDeliveries />
                </ProtectedRoute>
              }
            />

            {/* REVIEW */}
            <Route
              path="review/:name/:id"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                  <Review />
                </ProtectedRoute>
              }
            />

            {/* NOTIFICATIONS */}
            <Route
              path="notification-send"
              element={
                <ProtectedRoute
                  allowedRoles={["SUPER_ADMIN", "MANAGER", "STAFF", "DELIVERY"]}
                >
                  <SendNotification />
                </ProtectedRoute>
              }
            />

            {/* PROFILE */}
            <Route
              path="profile"
              element={
                <ProtectedRoute
                  allowedRoles={["SUPER_ADMIN", "MANAGER", "STAFF", "DELIVERY"]}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
