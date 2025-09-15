import { Box, Heading } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const OrderStatsChart = ({ stats, title }) => {
  return (
    <Box p={4} bg="transparent" borderRadius="lg" shadow="dark-lg">
      <Heading size="md" mb={4} color="white">
        {title}
      </Heading>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={stats}
          margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
        >
          {/* Add Grid Lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />

          {/* X-Axis */}
          <XAxis
            dataKey="status"
            stroke="#ccc"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#8884d8" }}
            tickLine={false}
          />

          {/* Y-Axis */}
          <YAxis
            stroke="#ccc"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#8884d8" }}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            hasArrow
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{ backgroundColor: "#1a202c", borderColor: "#e00b6b", color: "#fff" }}
            labelStyle={{ color: "#e00b6b" }}
          />

          {/* Optional Legend */}
          <Legend verticalAlign="top" height={36} />

          {/* Main Bar */}
          <Bar
            dataKey="totalPrice"
            fill="#e00b6b"
            name="Revenue (₹)"
            radius={[3, 3, 0, 0]}
            barSize={40}
          >
            <LabelList dataKey="totalPrice" position="top" fill="#fff" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};


export default OrderStatsChart;

OrderStatsChart.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};
