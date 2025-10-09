import { Box, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const GrowthChart = ({ title, data, dataKey }) => {
  return (
    <Box p={4} bg="whiteAlpha.200" borderRadius="lg" shadow="dark-lg">
      <Heading size="md" mb={4} color="#fff">
        {title}
      </Heading>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff0080" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#050b16",
              borderColor: "#ff0080",
              color: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#ff0080"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

GrowthChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
};

export default GrowthChart;
