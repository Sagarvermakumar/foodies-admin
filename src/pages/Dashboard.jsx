import {
  Box,
  Center,
  HStack,
  SimpleGrid,
  Spinner,
  Stat,
  StatHelpText,
  Text,
  VStack
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Header from "../Components/common/Heading";
import CountStat from "../Components/CountStat";
import GrowthChart from "../Components/GrowthChart";
import { fetchStats } from "../features/report/reportAction";
import {
  makeErrorSelector,
  makeLoadingSelector,
  makeReportSelector,
} from "../features/report/reportSelector";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const stats = useSelector(makeReportSelector("stats"));
  const statsLoading = useSelector(makeLoadingSelector("stats"));
  const statsError = useSelector(makeErrorSelector("stats"));

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  // 🔸 Dummy Revenue Breakdown Data
  const revenueBreakdown = [
    { name: "Food Orders", value: 48000 },
    { name: "Delivery Fees", value: 12000 },
    { name: "Subscriptions", value: 8000 },
    { name: "Others", value: 4000 },
  ];
  const COLORS = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28"];

  // 🔸 Dummy Top Performing Items
  const topItems = [
    { name: "Margherita Pizza", orders: 280 },
    { name: "Cheese Burger", orders: 250 },
    { name: "Cold Coffee", orders: 180 },
    { name: "Pasta Alfredo", orders: 150 },
  ];

  // 🔸 Dummy Recent Orders
  const recentOrders = [
    { id: "ORD101", customer: "Amit Sharma", amount: 480, status: "Delivered" },
    { id: "ORD102", customer: "Neha Patel", amount: 720, status: "Pending" },
    { id: "ORD103", customer: "Ravi Kumar", amount: 350, status: "Cancelled" },
  ];

  return (
    <>
      <Header
        title={`Welcome ${user?.name || "Admin"}!`}
        subtitle="Overview of your restaurant performance"
      />

      {/* ========== Stats Section ========== */}
      {statsLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : statsError ? (
        <Text color="red.400">Failed to load stats: {statsError}</Text>
      ) : (
        <>
          {/* 🔹 Summary Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
            <CountStat
              count={stats?.users || 1024}
              label="Total Users"
              growth="25 new users joined last week"
            />
            <CountStat
              count={stats?.orders || 2300}
              label="Total Orders"
              growth="Up by 14% this month"
            />
            <CountStat
              count={stats?.item || 120}
              label="All Menu Items"
              growth="12 new dishes added recently"
            />
          </SimpleGrid>

          {/* 🔹 Growth Charts */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
            <GrowthChart
              title="User Growth"
              data={stats?.userGrowth || [
                { month: "Jan", count: 120 },
                { month: "Feb", count: 160 },
                { month: "Mar", count: 210 },
                { month: "Apr", count: 270 },
                { month: "May", count: 320 },
              ]}
              dataKey="count"
            />

            <GrowthChart
              title="Order Growth"
              data={stats?.orderGrowth || [
                { month: "Jan", count: 500 },
                { month: "Feb", count: 620 },
                { month: "Mar", count: 750 },
                { month: "Apr", count: 810 },
                { month: "May", count: 920 },
              ]}
              dataKey="count"
            />
          </SimpleGrid>

          {/* 🔹 Revenue Breakdown */}
          <Box
            bg="whiteAlpha.100"
            p={6}
            rounded="2xl"
            boxShadow="xl"
            mb={6}
          >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Revenue Breakdown
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* 🔹 Top Performing Items */}
          <Box bg="whiteAlpha.200" p={6} rounded="2xl" boxShadow="xl">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Top Performing Items
            </Text>
            <VStack align="stretch" spacing={3}>
              {topItems.map((item, index) => (
                <Box
                  key={index}
                  p={4}
                  rounded="lg"
                  bg="whiteAlpha.100"
                  border="1px solid rgba(255,255,255,0.08)"
                >
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">{item.name}</Text>
                    <Text color="gray.400">{item.orders} orders</Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>


          {/* 🔹 Recent Orders */}
          <Box bg="whiteAlpha.200" p={6} rounded="2xl" boxShadow="xl" mt={6}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Recent Orders
            </Text>
            <VStack align="stretch" spacing={3}>
              {recentOrders.map((order) => (
                <Box
                  key={order.id}
                  p={4}
                  rounded="lg"
                  bg="whiteAlpha.100"
                  border="1px solid rgba(255,255,255,0.08)"
                >
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">{order.customer}</Text>
                    <Text color="gray.400">₹{order.amount}</Text>
                  </HStack>
                  <Stat>

                    <StatHelpText>Status: {order.status}</StatHelpText>
                  </Stat>
                </Box>
              ))}
            </VStack>
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
