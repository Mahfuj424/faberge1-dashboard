import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

const ManagerList = ({ managers, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-4">
      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search managers..."
          className="w-full border border-pink-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#e91e63]"
        />
      </div>

      {/* ✅ Responsive Scrollable Table */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-pink-50 rounded-lg">
        <table className="min-w-[700px] w-full text-sm text-gray-700">
          <thead className="bg-pink-50 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Manager</th>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Mail</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {managers.length > 0 ? (
              managers.map((manager) => (
                <tr
                  key={manager.id}
                  className="border-b border-pink-100 hover:bg-pink-50 transition-all"
                >
                  {/* Manager Info */}
                  <td className="px-6 py-3 flex items-center gap-3">
                    <img
                      src={manager.avatar}
                      alt={manager.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="text-[#e91e63] font-medium cursor-pointer hover:underline">
                      {manager.name}
                    </span>
                  </td>

                  {/* ID */}
                  <td className="px-6 py-3">{manager.managerId}</td>

                  {/* Email */}
                  <td className="px-6 py-3 truncate max-w-[180px]">
                    {manager.email}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        manager.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {manager.status}
                    </span>
                  </td>

                  {/* Delete Action */}
                  <td className="px-6 py-3 text-right">
                    <DeleteOutlined
                      className="text-red-500 cursor-pointer hover:text-red-600 text-lg"
                      onClick={() => onDelete(manager.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No managers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerList;
