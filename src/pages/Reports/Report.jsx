import { Box, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Components/common/Heading';
import DeliveryPerformanceReport from '../../Components/report/DeliveryPerformanceReport';
import SalesReportChat from '../../Components/report/SalesReportChat';
import TopItemsReport from '../../Components/report/TopItemsReport';
import { getCustomerReport, getDeliveryPerformanceReport, getSalesReport, getTopItemsReport } from '../../features/report/reportAction';
import { makeReportSelector } from '../../features/report/reportSelector';
const Report = () => {

  const dispatch = useDispatch()

  const salesReport = useSelector(makeReportSelector('sales'));
  const topItemsReport = useSelector(makeReportSelector('topItems'));
  const customersReport = useSelector(makeReportSelector('customers'));
  // const deliveryPerformanceReport = useSelector(makeReportSelector('deliveryPerformance'));

  // console.log(salesReport);
  // console.log("Top Items Report:", topItemsReport);
  // console.log(customersReport);
  // console.log(deliveryPerformanceReport);
  // 
  const report = {
    success: true,
    message: "Top items report fetched successfully",
    data: [
      { sold: 5, item: "Burger" },
      { sold: 3, item: "Pizza" },
      { sold: 10, item: "Pasta" },
    ],
  };

  const deliveryPerformanceReport = {
    success: true,
    message: 'No delivered orders found',
    data: {
      avgDeliveryTime: '0 min',
      onTimeDeliveries: 0,
      lateDeliveries: 0,
      deliverySuccessRate: '0%'
    }
  };





  useEffect(() => {
    dispatch(getSalesReport());
    dispatch(getTopItemsReport())
    dispatch(getCustomerReport())
    dispatch(getDeliveryPerformanceReport())
  }, [dispatch])
  return (
    <Box  >
      <Header title={'Report Statics'} subtitle={'Overview of all reports'} />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} >
        <SalesReportChat report={salesReport} />
        <TopItemsReport report={report} />
        <DeliveryPerformanceReport report={deliveryPerformanceReport} />
      </SimpleGrid>
    </Box>
  )
}

export default Report