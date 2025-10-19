
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Basic Pedicure", value: 120 },
  { name: "Manicure", value: 95 },
  { name: "Water Gel", value: 85 },
  { name: "Facial", value: 75 },
  { name: "Nail Art", value: 65 },
];

const ServicePopularityChart = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 border border-pink-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Service Popularity
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f3d1dc"
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip cursor={{ fill: "#fde6ef" }} />
          <Bar dataKey="value" fill="#e91e63" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServicePopularityChart;
