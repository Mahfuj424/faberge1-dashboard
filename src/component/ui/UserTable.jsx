import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";

const UserTable = ({ data, type, onView, onDelete }) => {
  const [searchValue, setSearchValue] = useState("");

  // ✅ Filter Data
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-pink-100 mt-4">
      {/* Search Bar */}
      <div className="p-5 border-b border-pink-100">
        <Input
          placeholder={`Search ${type}s...`}
          prefix={<SearchOutlined className="text-[#e91e63]" />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border border-pink-200 rounded-md py-3 focus:border-[#e91e63] focus:shadow-md"
        />
      </div>

      {/* ✅ Responsive Scroll Container */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-pink-50">
        <table className="min-w-[900px] w-full text-sm text-left text-gray-700">
          <thead className="bg-pink-50 text-gray-700 uppercase text-xs">
            <tr>
              {type === "worker" ? (
                <>
                  <th className="px-6 py-3 w-[200px]">Worker</th>
                  <th className="px-6 py-3 w-[120px]">ID</th>
                  <th className="px-6 py-3 w-[160px]">Location</th>
                  <th className="px-6 py-3 w-[240px]">Services</th>
                  <th className="px-6 py-3 w-[120px]">Status</th>
                  <th className="px-6 py-3 text-right w-[100px]">Actions</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-3 w-[200px]">Customer</th>
                  <th className="px-6 py-3 w-[160px]">Location</th>
                  <th className="px-6 py-3 w-[240px]">Email</th>
                  <th className="px-6 py-3 w-[160px]">Phone</th>
                  <th className="px-6 py-3 text-right w-[100px]">Actions</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-pink-50 border-b border-pink-100 transition-all"
                >
                  {/* ✅ Avatar + Name */}
                  <td className="px-6 py-3 flex items-center gap-3 w-[200px] shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span
                      className="text-[#e91e63] font-medium cursor-pointer hover:underline"
                      onClick={() => onView(user)}
                    >
                      {user.name}
                    </span>
                  </td>

                  {/* ✅ Worker Columns */}
                  {type === "worker" ? (
                    <>
                      <td className="px-6 py-3 w-[120px] shrink-0">
                        {user.workerId}
                      </td>
                      <td className="px-6 py-3 w-[160px] shrink-0">
                        {user.location}
                      </td>
                      <td className="px-6 py-3 w-[240px] shrink-0">
                        {user.services}
                      </td>
                      <td className="px-6 py-3 w-[120px] shrink-0">
                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                          {user.status}
                        </span>
                      </td>
                    </>
                  ) : (
                    /* ✅ Customer Columns */
                    <>
                      <td className="px-6 py-3 w-[160px] shrink-0">
                        {user.location}
                      </td>
                      <td className="px-6 py-3 w-[240px] shrink-0">
                        {user.email}
                      </td>
                      <td className="px-6 py-3 w-[160px] shrink-0">
                        {user.phone}
                      </td>
                    </>
                  )}

                  {/* ✅ Actions */}
                  <td className="px-6 py-3 text-right flex justify-end gap-4 text-[#e91e63] w-[100px] shrink-0">
                    <EyeOutlined
                      className="cursor-pointer hover:text-pink-500 text-lg"
                      onClick={() => onView(user)}
                    />
                    <DeleteOutlined
                      className="cursor-pointer hover:text-red-500 text-lg"
                      onClick={() => onDelete(user)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={type === "worker" ? 6 : 5}
                  className="text-center py-6 text-gray-500"
                >
                  No {type}s found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
