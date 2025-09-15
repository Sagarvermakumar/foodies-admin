import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Components/common/Loader";
import {
  selectAuthUser,
  selectIsAuthenticated,
  selectProfileLoading,
} from "../features/auth/authSelector";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectProfileLoading);
  const user = useSelector(selectAuthUser);
  const userRole = user?.role;

  if (loading?.profile) {
    return <Loader />;
  }



  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userRole || (allowedRoles && !allowedRoles.includes(userRole))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
