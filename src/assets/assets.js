import { LucideTypeOutline } from "lucide-react";
import {
  FaBell,
  FaChartBar,
  FaClipboardList,
  FaPlusCircle,
  FaTags,
  FaThList,
  FaTruck,
  FaUserCircle,
  FaUsers,
  FaUtensils
} from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import logo from "./logo.png";

// Grouped sidebar items
const sidebarMenus = [
  {
    section: "Overview",
    links: [
      { 
        name: "Dashboard", 
        icon: FiHome, 
        path: "/", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
      { 
        name: "Orders", 
        icon: FaClipboardList, 
        path: "/orders", 
        roles: ["SUPER_ADMIN", "MANAGER", "STAFF"] 
      },
    ],
  },
  {
    section: "Management",
    links: [
      { 
        name: "Outlet", 
        icon: LucideTypeOutline, 
        path: "/outlet", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
      { 
        name: "Menus", 
        icon: FaUtensils, 
        path: "/item", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
      { 
        name: "Categories", 
        icon: FaThList, 
        path: "/category", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
      { 
        name: "Coupons", 
        icon: FaTags, 
        path: "/coupon", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
      { 
        name: "Users", 
        icon: FaUsers, 
        path: "/users", 
        roles: ["SUPER_ADMIN"] 
      },
      { 
        name: "Delivery", 
        icon: FaTruck, 
        path: "/delivery", 
        roles: ["DELIVERY"] 
      },
    ],
  },
  {
    section: "Add New",
    links: [
      { 
        name: "Add Outlet", 
        icon: FaPlusCircle, 
        path: "/outlet/add", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
      { 
        name: "Add Menu", 
        icon: FaPlusCircle, 
        path: "/item/add", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
      { 
        name: "Add Category", 
        icon: FaPlusCircle, 
        path: "/category/add", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
      { 
        name: "Add Coupon", 
        icon: FaPlusCircle, 
        path: "/coupon/add", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
    ],
  },
  {
    section: "Analytics",
    links: [

      { 
        name: "Reports", 
        icon: FaChartBar, 
        path: "/report", 
        roles: ["SUPER_ADMIN", "MANAGER"] 
      },
    ],
  },
  {
    section: "Settings",
    links: [
      { 
        name: "Notifications", 
        icon: FaBell, 
        path: "/notification-send", 
        roles: ["SUPER_ADMIN", "MANAGER", "STAFF", "DELIVERY", "CUSTOMER"] 
      },
      { 
        name: "Profile", 
        icon: FaUserCircle, 
        path: "/profile", 
        roles: ["SUPER_ADMIN", "MANAGER", "STAFF", "DELIVERY", "CUSTOMER"] 
      },
    ],
  },
];

export const ORDER_STATUS = [
  "PLACED",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "PICKED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
  "COMPLETE",
];
export { logo, sidebarMenus };

