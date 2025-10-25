import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ja", value: 400 },
  { name: "Fe", value: 320 },
  { name: "Ma", value: 540 },
  { name: "Ap", value: 180 },
  { name: "My", value: 200 },
  { name: "Ju", value: 300 },
  { name: "Jl", value: 350 },
  { name: "Au", value: 470 },
  { name: "Se", value: 430 },
  { name: "Oc", value: 410 },
  { name: "No", value: 480 },
  { name: "De", value: 560 },
];

const RevenueReportChart = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 border border-pink-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Revenue Report
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e91e63" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#e91e63" stopOpacity={0.05} />
            </linearGradient>
          </defs>

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
          <Tooltip
            cursor={{ stroke: "#e91e63", strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #f3d1dc",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#e91e63"
            fill="url(#colorRevenue)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueReportChart;
