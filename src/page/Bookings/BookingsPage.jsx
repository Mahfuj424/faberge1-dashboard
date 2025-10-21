import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import BookingDetailsModal from "../../component/ui/Modals/BookingDetailsModal";
import ConfirmationModal from "../../component/ui/Modals/ConfirmationModal";

// ... your mockBookings array stays the same

const mockBookings = [
  {
    id: 1,
    customerName: "John S.",
    workerName: "Sophia R.",
    userId: "ID# 6592",
    service: "Manicure + Pedicure + Water + Gel",
    date: "10/12/2025, 10 AM",
    status: "Upcoming",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    customerName: "Alice M.",
    workerName: "David P.",
    userId: "ID# 7834",
    service: "Pedicure + Gel",
    date: "12/01/2025, 3 PM",
    status: "Completed",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    id: 3,
    customerName: "John D.",
    workerName: "Clara L.",
    userId: "ID# 2319",
    service: "Nail Art + Water",
    date: "12/15/2025, 11 AM",
    status: "Upcoming",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
];

const BookingsPage = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchValue, setSearchValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null); // ✅ new state

  const filteredBookings = bookings.filter((b) =>
    b.customerName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleView = (booking) => {
    setSelectedBooking(booking); // ✅ open modal
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    setBookings(bookings.filter((b) => b.id !== deleteId));
    setDeleteId(null);
  };

  const cancelDelete = () => setDeleteId(null);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Bookings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-pink-100 mt-4">
        {/* 🔍 Search Bar */}
        <div className="p-5 border-b border-pink-100">
          <Input
            placeholder="Search bookings..."
            prefix={<SearchOutlined className="text-[#e91e63]" />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border border-pink-200 rounded-md py-3 focus:border-[#e91e63] focus:shadow-md"
          />
        </div>

        {/* 🧾 Table */}
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-pink-50">
          <table className="min-w-[900px] w-full text-sm text-left text-gray-700">
            <thead className="bg-pink-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 w-[200px]">Customer</th>
                <th className="px-6 py-3 w-[200px]">Worker</th>
                <th className="px-6 py-3 w-[200px]">Service</th>
                <th className="px-6 py-3 w-[160px]">Date & Time</th>
                <th className="px-6 py-3 w-[120px]">Status</th>
                <th className="px-6 py-3 text-right w-[100px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-pink-100 hover:bg-pink-50 transition-all"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.avatar}
                          alt={booking.customerName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <p className="text-sm font-semibold text-[#e91e63] cursor-pointer hover:underline">
                          {booking.customerName}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-3">
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-gray-700">
                          {booking.workerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.userId}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-3 text-gray-600">
                      {booking.service}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{booking.date}</td>

                    <td className="px-6 py-3">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          booking.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-pink-100 text-[#e91e63]"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-right text-[#e91e63]">
                      <div className="flex justify-end gap-4">
                        <EyeOutlined
                          className="cursor-pointer hover:text-pink-500 text-lg"
                          onClick={() => handleView(booking)}
                        />
                        <DeleteOutlined
                          className="cursor-pointer hover:text-red-500 text-lg"
                          onClick={() => handleDelete(booking.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🗑️ Delete Modal */}
        <ConfirmationModal
          isOpen={!!deleteId}
          title="Delete Booking"
          message="Are you sure you want to delete this booking?"
          confirmText="Yes, Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />

        {/* 👁️ View Details Modal */}
        <BookingDetailsModal
          isOpen={!!selectedBooking}
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      </div>
    </div>
  );
};

export default BookingsPage;
