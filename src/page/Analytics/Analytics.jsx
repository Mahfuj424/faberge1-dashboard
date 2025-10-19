import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs } from "antd";

const Analytics = () => {
  const [activeKey, setActiveKey] = useState("1");

  // ✅ Mock Data
  const serviceData = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 300 },
    { month: "Mar", value: 200 },
    { month: "Apr", value: 280 },
    { month: "May", value: 190 },
    { month: "Jun", value: 240 },
    { month: "Jul", value: 350 },
    { month: "Aug", value: 280 },
    { month: "Sep", value: 320 },
    { month: "Oct", value: 290 },
    { month: "Nov", value: 310 },
    { month: "Dec", value: 380 },
  ];

  const workerData = [
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

  const bookingTrends = [
    { month: "Jan", pink: 300, blue: 400 },
    { month: "Feb", pink: 300, blue: 0 },
    { month: "Mar", pink: 200, blue: 0 },
    { month: "Apr", pink: 0, blue: 280 },
    { month: "May", pink: 190, blue: 0 },
    { month: "Jun", pink: 240, blue: 0 },
    { month: "Jul", pink: 0, blue: 360 },
    { month: "Aug", pink: 280, blue: 0 },
    { month: "Sep", pink: 320, blue: 0 },
    { month: "Oct", pink: 290, blue: 0 },
    { month: "Nov", pink: 310, blue: 0 },
    { month: "Dec", pink: 380, blue: 0 },
  ];

  // ✅ Reusable Chart Container
  const ChartWrapper = ({ children }) => (
    <div className="bg-white shadow-sm rounded-xl p-6 w-full mt-3">
      <ResponsiveContainer width="100%" height={400}>
        {children}
      </ResponsiveContainer>
    </div>
  );

  // ✅ Tabs Configuration
  const items = [
    {
      key: "1",
      label: "Service Popularity",
      children: (
        <ChartWrapper>
          <BarChart
            data={serviceData}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3d2db" />
            <XAxis dataKey="month" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Bar dataKey="value" fill="#e91e63" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartWrapper>
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
            <XAxis dataKey="name" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Bar dataKey="value" fill="#e91e63" radius={[6, 6, 0, 0]} />
            <Bar
              dataKey="light"
              data={workerData.map((d) => ({
                ...d,
                light: d.value * 0.7,
              }))}
              fill="#f8c6d5"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartWrapper>
      ),
    },
    {
      key: "3",
      label: "Booking Trends",
      children: (
        <ChartWrapper>
          <BarChart
            data={bookingTrends}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3d2db" />
            <XAxis dataKey="month" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Bar dataKey="blue" fill="#2979ff" radius={[6, 6, 0, 0]} />
            <Bar dataKey="pink" fill="#e91e63" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartWrapper>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h1>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={items}
          className="analytics-tabs"
          tabBarGutter={30}
          size="large"
          tabBarStyle={{ marginBottom: "20px" }}
        />
      </div>
    </div>
  );
};

export default Analytics;
