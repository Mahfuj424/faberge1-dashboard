import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import UserTable from "../../ui/UserTable";
import UserDetailsModal from "../../ui/Modals/UserDetailsModal";
import ConfirmationModal from "../../ui/Modals/ConfirmationModal";
import CreateWorkerModal from "../../ui/Modals/CreateWorkerModal";
import { allServices } from "../../../constants/service";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("worker");

  // ✅ Default worker data (full structure)
  const [workers, setWorkers] = useState([
    {
      id: 1,
      firstName: "Mahfuj",
      lastName: "Alam",
      address: "Dhaka, Mohakhali",
      city: "Dhaka",
      state: "Bangladesh",
      email: "mahfujalam5795@gmail.com",
      phone: "67356345656",
      workerId: "4585694",
      password: "fasdfa",
      confirmPassword: "fasdfasdf",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      selectedServices: [
        {
          name: "Manicure",
          price: 25,
          subServices: [
            { id: 101, name: "Gel", price: 10, water: 5 },
            { id: 102, name: "Water", price: 7, water: 3 },
          ],
        },
      ],
      status: "active",
    },
  ]);

  const [customers, setCustomers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 🧠 Helper: convert selectedServices array → service string
  const generateServiceString = (selectedServices = []) => {
    return selectedServices
      .map((srv) => {
        if (srv.subServices && srv.subServices.length > 0) {
          const subs = srv.subServices.map((s) => s.name).join(" + ");
          return `${srv.name} (${subs})`;
        } else {
          return srv.name;
        }
      })
      .join(" + ");
  };

  // 🧩 Delete logic
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setWorkers((prev) => prev.filter((w) => w.id !== userToDelete.id));
    setConfirmModalOpen(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => setConfirmModalOpen(false);

  // ➕ Create Modal open
  const handleAddNew = () => setIsCreateModalOpen(true);

  // ✅ Save worker
  const handleSaveWorker = (workerData) => {
    const newWorker = {
      ...workerData,
      id: Date.now(),
      status: "active",
    };

    setWorkers((prev) => [...prev, newWorker]);
    setIsCreateModalOpen(false);
  };

  const filteredData =
    activeTab === "worker"
      ? workers.map((worker) => ({
          id: worker.id,
          name: `${worker.firstName} ${worker.lastName}`,
          workerId: worker.workerId || "N/A",
          location: `${worker.city}, ${worker.state}`,
          services: generateServiceString(worker.selectedServices),
          status: worker.status || "active",
          avatar: worker.image,
        }))
      : customers;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">User Management</h1>
      </div>

      {/* Tabs + Add Button */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-3 bg-white py-2 px-2 rounded-md shadow-sm border border-pink-100">
          <button
            onClick={() => setActiveTab("worker")}
            className={`px-4 font-medium ${
              activeTab === "worker"
                ? "text-[#e91e63] border-b-2 border-[#e91e63]"
                : "text-gray-700"
            }`}
          >
            Worker
          </button>
          <button
            onClick={() => setActiveTab("customer")}
            className={`px-4 font-medium ${
              activeTab === "customer"
                ? "text-[#e91e63] border-b-2 border-[#e91e63]"
                : "text-gray-700"
            }`}
          >
            Customer
          </button>
        </div>

        {activeTab === "worker" && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-[#e91e63] hover:bg-[#d81b60] border-none text-white font-medium"
            onClick={handleAddNew}
          >
            Add New
          </Button>
        )}
      </div>

      {/* Table */}
      <UserTable
        data={filteredData}
        type={activeTab}
        onView={setSelectedUser}
        onDelete={handleDeleteClick}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={!!selectedUser}
        user={selectedUser}
        type={activeTab}
        onClose={() => setSelectedUser(null)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        title="Delete Worker"
        message={`Are you sure you want to delete ${
          userToDelete?.firstName || "this worker"
        }?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Create Worker Modal */}
      <CreateWorkerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveWorker}
        allServices={allServices}
      />
    </div>
  );
};

export default UserManagement;
