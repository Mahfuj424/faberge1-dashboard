import React, { useState } from "react";
import ManagerList from "./ManagerList";
import AccessibilityList from "./AccessibilityList";
import ConfirmationModal from "../../component/ui/Modals/ConfirmationModal";

const ManagerManagement = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [deleteId, setDeleteId] = useState(null);

  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "John S.",
      email: "example@gmail.com",
      managerId: "458 56 94",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      status: "active",
      access: {
        dashboard: true,
        analytics: false,
        users: false,
        services: false,
        bookings: false,
        transaction: false,
      },
    },
    {
      id: 2,
      name: "Alice M.",
      email: "alice@gmail.com",
      managerId: "123 45 67",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      status: "active",
      access: {
        dashboard: true,
        analytics: false,
        users: false,
        services: false,
        bookings: false,
        transaction: false,
      },
    },
  ]);

  // 🗑️ Delete handlers
  const handleDelete = (id) => setDeleteId(id);
  const confirmDelete = () => {
    setManagers(managers.filter((m) => m.id !== deleteId));
    setDeleteId(null);
  };
  const cancelDelete = () => setDeleteId(null);

  // ⚙️ Toggle Access for all managers
  const handleToggleAccess = (moduleName, value) => {
    const updatedManagers = managers.map((m) => ({
      ...m,
      access: { ...m.access, [moduleName]: value },
    }));
    setManagers(updatedManagers);

    // 🔹 Collect affected manager IDs
    const affectedManagerIds = updatedManagers.map((m) => m.id);

    console.log(`✅ Access "${moduleName}" changed to: ${value}`);
    console.log("👥 Manager IDs affected:", affectedManagerIds);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Manager Management
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 rounded-t-md font-medium ${
            activeTab === "list"
              ? "bg-white text-[#e91e63] border-b-2 border-[#e91e63]"
              : "text-gray-500 bg-pink-100 hover:text-[#e91e63]"
          }`}
        >
          Manager List
        </button>

        <button
          onClick={() => setActiveTab("access")}
          className={`px-4 py-2 rounded-t-md font-medium ${
            activeTab === "access"
              ? "bg-white text-[#e91e63] border-b-2 border-[#e91e63]"
              : "text-gray-500 bg-pink-100 hover:text-[#e91e63]"
          }`}
        >
          Accessibility
        </button>
      </div>

      {/* Content */}
      {activeTab === "list" ? (
        <ManagerList managers={managers} onDelete={handleDelete} />
      ) : (
        <AccessibilityList
          managers={managers}
          onToggleAccess={handleToggleAccess}
        />
      )}

      {/* 🗑️ Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteId}
        title="Delete Manager"
        message="Are you sure you want to delete this manager?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default ManagerManagement;
