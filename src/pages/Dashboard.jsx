import { Center, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../Components/common/EmptyState';
import Header from '../Components/common/Heading';
import CountStat from '../Components/CountStat';
import GrowthChart from '../Components/GrowthChart';
import { fetchStats } from '../features/report/reportAction';
import { makeErrorSelector, makeLoadingSelector, makeReportSelector } from '../features/report/reportSelector';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Stats
  const stats = useSelector(makeReportSelector("stats"));
  const statsLoading = useSelector(makeLoadingSelector("stats"));
  const statsError = useSelector(makeErrorSelector("stats"));

  // Order Stats
  // const orderStats = useSelector(makeReportSelector("orders"));
  // const orderStatsLoading = useSelector(makeLoadingSelector("orders"));
  // const orderStatsError = useSelector(makeErrorSelector("orders"));


  useEffect(() => {
    dispatch(fetchStats());
    // dispatch(fetchOderReportApi());
  }, [dispatch]);

  return (
    <>
      <Header
        title={`Welcome ${user?.name}!`}
        subtitle={"Overview of your admin panel and insights"}
      />

      {/* ========== Stats Section ========== */}
      {statsLoading ? (
        <Center><Spinner size="xl" /></Center>
      ) : statsError ? (
        <Text color="red.400">Failed to load stats: {statsError}</Text>
      ) : stats ? (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
            <CountStat
              count={stats?.users || 0}
              label="Total Users"
              growth={`${stats.users} new users joined the platform in the last month`}
            />
            <CountStat
              count={stats?.orders || 0}
              label="Total Orders"
              growth={`${stats.orders} orders placed in the last week`}
            />
            <CountStat
              count={stats?.item || 0}
              label="All Menus"
              growth={`${stats.item} items added to the menu recently`}
            />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
            {stats?.userGrowth?.length > 0 ? (
              <GrowthChart title="User Growth" data={stats.userGrowth} dataKey="count" />
            ) : <Text>No User Growth Data Found</Text>}

            {stats?.orderGrowth?.length > 0 ? (
              <GrowthChart title="Order Growth" data={stats.orderGrowth} dataKey="count" />
            ) : <Text>No Order Growth Data Found</Text>}

            {stats?.itemGrowth?.length > 0 ? (
              <GrowthChart title="Menu Growth" data={stats.itemGrowth} dataKey="count" />
            ) : <Text>No Menu Growth Data Found</Text>}
          </SimpleGrid>
        </>
      ) : (
        <EmptyState label="Stats" subLabel="No stats available." />
      )}
    </>
  );
};

export default Dashboard;
