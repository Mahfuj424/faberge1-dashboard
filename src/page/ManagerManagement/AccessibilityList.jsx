import React from "react";
import {
  FaChartBar,
  FaUsers,
  FaChartLine,
  FaCar,
  FaCalendarAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const modules = [
  { key: "dashboard", label: "Dashboard", icon: <FaChartBar /> },
  { key: "analytics", label: "Analytics", icon: <FaChartLine /> },
  { key: "users", label: "Users", icon: <FaUsers /> },
  { key: "services", label: "Services", icon: <FaCar /> },
  { key: "bookings", label: "Bookings", icon: <FaCalendarAlt /> },
  { key: "transaction", label: "Transaction", icon: <FaMoneyCheckAlt /> },
];

const AccessibilityList = ({ managers, onToggleAccess }) => {
  const firstManager = managers[0]; // read any one’s state for UI

  return (
    <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search modules..."
          className="w-full border border-pink-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#e91e63]"
        />
      </div>

      <div className="flex flex-col divide-y divide-pink-100">
        {modules.map((module) => {
          const isActive = firstManager?.access[module.key];

          return (
            <div
              key={module.key}
              className="flex justify-between items-center py-3 px-4 hover:bg-pink-50 rounded-md transition-all"
            >
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-lg text-[#e91e63]">{module.icon}</span>
                <p className="font-medium">{module.label}</p>
              </div>

              {/* Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => onToggleAccess(module.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#e91e63] transition-all"></div>
                <div className="absolute left-1 top-[3px] w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccessibilityList;
