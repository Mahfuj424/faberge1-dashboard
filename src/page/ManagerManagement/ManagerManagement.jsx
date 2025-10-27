import React, { useState } from "react";
import ManagerList from "./ManagerList";
import ConfirmationModal from "../../component/ui/Modals/ConfirmationModal";
import AccessModal from "../../component/ui/Modals/AccessModal";
import CreateManagerModal from "../../component/ui/Modals/CreateManagerModal";

const ManagerManagement = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
        dashboard: false,
        analytics: true,
        users: false,
        services: false,
        bookings: true,
        transaction: false,
      },
    },
  ]);

  // 🗑️ Delete Manager
  const handleDelete = (id) => setDeleteId(id);
  const confirmDelete = () => {
    setManagers(managers.filter((m) => m.id !== deleteId));
    setDeleteId(null);
  };
  const cancelDelete = () => setDeleteId(null);

  // 🔐 Access Modal
  const handleOpenAccess = (manager) => setSelectedManager(manager);
  const handleCloseAccess = () => setSelectedManager(null);

  // ⚙️ Toggle access
  const handleToggleAccess = (managerId, moduleName, value) => {
    const updatedManagers = managers.map((m) =>
      m.id === managerId
        ? { ...m, access: { ...m.access, [moduleName]: value } }
        : m
    );
    setManagers(updatedManagers);

    if (selectedManager?.id === managerId) {
      setSelectedManager(
        updatedManagers.find((m) => m.id === selectedManager.id)
      );
    }
  };

  // ➕ Add new manager
  const handleAddManager = (newManagerData) => {
    const newManager = {
      id: managers.length + 1,
      name: newManagerData.name,
      email: newManagerData.email,
      managerId: newManagerData.managerId,
      avatar:
        newManagerData.profileImage instanceof File
          ? URL.createObjectURL(newManagerData.profileImage)
          : "https://randomuser.me/api/portraits/men/50.jpg",
      status: "active",
      access: {
        dashboard: false,
        analytics: false,
        users: false,
        services: false,
        bookings: false,
        transaction: false,
      },
    };

    setManagers([...managers, newManager]);
    setShowCreateModal(false);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Manager Management
        </h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#e91e63] text-white px-4 py-2 rounded-md shadow hover:bg-[#d81b60] transition-all"
        >
          + Add New
        </button>
      </div>

      <ManagerList
        managers={managers}
        onDelete={handleDelete}
        onOpenAccess={handleOpenAccess}
      />

      {/* 🗑️ Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!deleteId}
        title="Delete Manager"
        message="Are you sure you want to delete this manager?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* 🔐 Access Modal */}
      {selectedManager && (
        <AccessModal
          isOpen={!!selectedManager}
          manager={selectedManager}
          onClose={handleCloseAccess}
          onToggleAccess={handleToggleAccess}
        />
      )}

      {/* ➕ Create Manager Modal */}
      {showCreateModal && (
        <CreateManagerModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleAddManager}
        />
      )}
    </div>
  );
};

export default ManagerManagement;
