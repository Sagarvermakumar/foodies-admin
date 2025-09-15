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

const GrowthChart = ({ title, data, dataKey }) => {
  return (
    <Box p={4} bg="transparent" borderRadius="lg" shadow="dark-lg">
      <Heading size="md" mb={4} color="#fff">
        {title}
      </Heading>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
        >
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />

          {/* X Axis - Months */}
          <XAxis
            dataKey="month"
            stroke="#ccc"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#8884d8" }}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            stroke="#ccc"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#ff0080" }}
            tickLine={false}
          />

          {/* Tooltip with custom styles */}
          <Tooltip
            hasArrow
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{
              backgroundColor: "#050b16ff",
              borderColor: "#e00b6b",
              color: "#fff",
            }}
            labelStyle={{ color: "#e00b6b" }}
          />

          <Legend verticalAlign="top" height={36} />

          {/* Bar with labels */}
          <Bar
            dataKey={dataKey}
            fill="#e00b6b"
            barSize={40}
            radius={[10, 10, 0, 0]}
            name="Count"
          >
            <LabelList dataKey={dataKey} position="top" fill="#fff" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};


GrowthChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      [PropTypes.string]: PropTypes.number.isRequired,
    })
  ).isRequired,
  dataKey: PropTypes.string.isRequired,
};

export default GrowthChart;