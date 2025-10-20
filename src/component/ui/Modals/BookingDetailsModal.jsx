import { CloseOutlined } from "@ant-design/icons";
import React from "react";

const BookingDetailsModal = ({ isOpen, booking, onClose }) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative">
        {/* 🔹 Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#e91e63]"
        >
          <CloseOutlined className="text-lg" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Service Details
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          See all details about Service
        </p>

        {/* Service Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {booking.service}
        </h3>

        {/* Details List */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">Customer</span>
            <span>{booking.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Worker</span>
            <span>{booking.workerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Location</span>
            <span>{booking.location || "New York"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Service</span>
            <span>$35</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Water</span>
            <span>$10</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Add-Ons</span>
            <span>$10</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Gel</span>
            <span>$10</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">$45</span>
          </div>

          <div className="flex justify-between mt-2">
            <span className="font-semibold">Status</span>
            <span
              className={`font-semibold ${
                booking.status === "Completed"
                  ? "text-green-600"
                  : "text-[#e91e63]"
              }`}
            >
              {booking.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
