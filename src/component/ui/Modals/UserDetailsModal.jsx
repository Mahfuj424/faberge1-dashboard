import React from "react";
import { CloseOutlined } from "@ant-design/icons";

const UserDetailsModal = ({ isOpen, user, type, onClose, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="relative bg-white rounded-xl shadow-lg w-[400px] p-6">
        {/* 🔹 Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-[#e91e63] transition-colors"
          aria-label="Close"
        >
          <CloseOutlined className="text-lg" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
          {type === "worker" ? "Worker Details" : "Customer Details"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          See all details about {user?.name}
        </p>

        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-16 h-16 rounded-full mb-2 object-cover"
          />
          <p className="font-semibold text-gray-800">{user?.name}</p>
          {type === "worker" && (
            <p className="text-sm text-gray-500">(ID #{user?.workerId})</p>
          )}
        </div>

        {/* Details */}
        <div className="text-sm text-gray-700 space-y-2 mb-4">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Address:</strong> {user?.address || "New York"}
          </p>
          <p>
            <strong>City:</strong> {user?.city || "New York"}
          </p>
          <p>
            <strong>State:</strong> {user?.state || "New York"}
          </p>

          {/* Customer Info */}
          {type === "customer" && (
            <>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Phone:</strong> {user?.phone}
              </p>
              <p>
                <strong>User Type:</strong> Customer
              </p>
            </>
          )}

          {/* Worker Info */}
          {type === "worker" && (
            <>
              <p>
                <strong>User Type:</strong> Worker
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {user?.skills?.map((skill, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-1 text-sm text-gray-700"
                  >
                    <input type="checkbox" checked readOnly />
                    {skill}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => onAction(user)}
            className="bg-[#e91e63] text-white px-4 py-2 rounded hover:bg-pink-600 w-full mr-2"
          >
            Block
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 w-full"
          >
            {type === "worker" ? "Edit" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
