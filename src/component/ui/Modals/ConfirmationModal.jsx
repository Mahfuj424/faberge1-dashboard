import React from "react";

const ConfirmationModal = ({
  isOpen,
  title = "Are you sure?",
  message = "Do you want to continue?",
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        {/* Title */}
        <h3 className="text-lg font-bold mb-4 text-gray-700">{title}</h3>

        {/* Message */}
        <p className="mb-6 font-bold text-gray-600">{message}</p>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
