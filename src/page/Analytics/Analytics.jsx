import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Tabs, Select, Space } from "antd";
import { RiInfinityLine } from "react-icons/ri";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthOptions = months.map((m) => ({ label: m, value: m }));
const current = new Date();
const defaultMonth = months[current.getMonth()];
const defaultYear = current.getFullYear();
const yearOptions = [
  defaultYear - 2,
  defaultYear - 1,
  defaultYear,
  defaultYear + 1,
].map((y) => ({ label: String(y), value: y }));

const baseWorkerData = [
  { name: "John", value: 400 },
  { name: "Liam", value: 300 },
  { name: "Jack", value: 200 },
  { name: "Hershali", value: 280 },
  { name: "Maksud", value: 190 },
  { name: "Kutub", value: 240 },
  { name: "Jangu", value: 350 },
  { name: "Monalisa", value: 270 },
  { name: "Orries", value: 320 },
  { name: "Mories", value: 290 },
  { name: "Nova", value: 310 },
  { name: "Don Kiele", value: 380 },
];

const monthIndex = (m) => months.indexOf(m);
const seeded = (seed, mod) => ((seed % mod) + mod) % mod;

// ✅ Service data: always at least 2 services; "Other" optional
function getServiceData(selectedMonth, selectedYear) {
  const idx = monthIndex(selectedMonth);
  const seed = (selectedYear % 97) * 31 + idx * 17;

  const candidates = ["Manicure", "Pedicure", "Gel", "Padicure", "Other"];
  const count = 2 + seeded(seed, 2); // 2 or 3 services

  const offset = seeded(seed, candidates.length);
  const rotated = [...candidates.slice(offset), ...candidates.slice(0, offset)];
  const picked = rotated
    .filter((s) => !(s === "Other" && seeded(seed * 7, 2) === 0))
    .slice(0, count);

  return picked.map((service, i) => {
    const base = 60 + seeded(seed * (i + 3), 140);
    return { service, value: base };
  });
}

function getWorkerData(selectedMonth, selectedYear) {
  const idx = monthIndex(selectedMonth);
  const factor = 0.88 + ((selectedYear + idx) % 8) * 0.02;
  return baseWorkerData.map((w, i) => ({
    ...w,
    value: Math.round(w.value * (factor + (i % 4) * 0.02)),
  }));
}

function getBookingTrends(selectedYear) {
  return months.map((m, i) => {
    const omega = (i / 12) * Math.PI * 2;
    const confirmed = 260 + Math.sin(omega) * 90 + 70;
    const cancelled = 30 + Math.cos(omega) * 18 + 20;
    return {
      month: m,
      confirmed: Math.round(confirmed),
      cancelled: Math.round(cancelled),
    };
  });
}

const ChartWrapper = ({ children, height = 380 }) => (
  <div className="bg-white shadow-sm rounded-xl p-4 md:p-6 w-full mt-3">
    <ResponsiveContainer width="100%" height={height}>
      {children}
    </ResponsiveContainer>
  </div>
);

const Analytics = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const serviceData = useMemo(
    () => getServiceData(selectedMonth, selectedYear),
    [selectedMonth, selectedYear]
  );
  const workerData = useMemo(
    () => getWorkerData(selectedMonth, selectedYear),
    [selectedMonth, selectedYear]
  );
  const bookingTrends = useMemo(
    () => getBookingTrends(selectedYear),
    [selectedYear]
  );

  const serviceCount = serviceData.length;
  const chartWidth = Math.max(serviceCount * 120, 300);

  const extraFilters = (
    <Space size={8} className="ml-auto">
      <Select
        value={selectedMonth}
        onChange={setSelectedMonth}
        options={monthOptions}
        size="middle"
        className="w-28"
      />
      <Select
        value={selectedYear}
        onChange={setSelectedYear}
        options={yearOptions}
        size="middle"
        className="w-24"
      />
    </Space>
  );

  const items = [
    {
      key: "1",
      label: "Service Popularity",
      children: (
        <div className="bg-white shadow-sm rounded-xl p-4 md:p-6 w-full mt-3">
          <div className="overflow-x-auto" style={{ width: "100%" }}>
            <div style={{ width: `${chartWidth}px`, minWidth: "280px" }}>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart
                  data={serviceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  barCategoryGap="15%"
                  barGap={10}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3d2db" />
                  <XAxis
                    dataKey="service"
                    stroke="#555"
                    interval={0}
                    tickMargin={10}
                  />
                  <YAxis
                    ticks={[0, 150, 300, 450, 600]}
                    domain={[0, 600]}
                    tick={{ fill: "#666", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => (val === 600 ? "Ꝏ" : val)}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#e91e63"
                    barSize={40}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Worker Popularity",
      children: (
        <ChartWrapper>
          <BarChart
            data={workerData}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3d2db" />
            <XAxis
              dataKey="name"
              stroke="#555"
              interval={0}
              angle={-20}
              height={60}
              tickMargin={10}
            />
            <YAxis
              ticks={[0, 150, 300, 450, 600]}
              domain={[0, 600]}
              tick={{ fill: "#666", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => (val === 600 ? "Ꝏ" : val)}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#e91e63" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartWrapper>
      ),
    },
    {
      key: "3",
      label: "Booking Trends",
      children: (
        <div className="bg-white shadow-sm rounded-xl p-4 md:p-6 w-full mt-3 border border-pink-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Booking Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={bookingTrends}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e91e63" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#e91e63" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorCancelled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2979ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2979ff" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3d1dc"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#666", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                ticks={[0, 150, 300, 450, 600]}
                domain={[0, 600]}
                tick={{ fill: "#666", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => (val === 600 ? "Ꝏ" : val)}
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
                dataKey="confirmed"
                stroke="#e91e63"
                fill="url(#colorConfirmed)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="cancelled"
                stroke="#2979ff"
                fill="url(#colorCancelled)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h1>

      <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={items}
          className="analytics-tabs"
          tabBarGutter={24}
          size="large"
          tabBarStyle={{ marginBottom: 16 }}
          tabBarExtraContent={extraFilters}
        />
      </div>
    </div>
  );
};

export default Analytics;
