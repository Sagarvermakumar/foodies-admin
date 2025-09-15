export const roleRoutes = {
  DELIVERY: "/delivery",
  CUSTOMER: "/profile",
  STAFF: "/profile",
  MANAGER: "/profile",
  SUPER_ADMIN: "/",
};

// utils function
export const getRouteByRole = (role) => {
  console.log("user role : ",role)
  return roleRoutes[role] || "/profile" 
};
