import React, { useState } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import UserTable from "../../ui/UserTable";
import UserDetailsModal from "../../ui/Modals/UserDetailsModal";
import ConfirmationModal from "../../ui/Modals/ConfirmationModal";
import CreateWorkerModal from "../../ui/Modals/CreateWorkerModal";

const mockWorkers = [
  {
    id: 1,
    name: "John S.",
    workerId: "458 56 94",
    location: "New York, NY",
    services: "Manicure + Pedicure + Water + Gel",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: ["Manicure $25", "Pedicure $25", "Water ($10)", "Gel ($10)"],
  },
];

const mockCustomers = [
  {
    id: 1,
    name: "John S.",
    location: "New York, NY",
    email: "example@gmail.com",
    phone: "+44 65 59 626",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("worker");
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // view modal open
  const handleView = (user) => setSelectedUser(user);

  // delete / block modal open
  const handleDeleteClick = (user) => {
    setUserToBlock(user);
    setConfirmModalOpen(true);
  };

  const handleBlock = () => {
    console.log(`${userToBlock.name} blocked!`);
    setConfirmModalOpen(false);
    setUserToBlock(null);
  };

  const handleCancelBlock = () => {
    setConfirmModalOpen(false);
    setUserToBlock(null);
  };

  const handleAddNew = () => {
    setIsCreateModalOpen(true);
  };

  const filteredData =
    activeTab === "worker"
      ? mockWorkers.filter((w) =>
          w.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : mockCustomers.filter((c) =>
          c.name.toLowerCase().includes(searchValue.toLowerCase())
        );

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">User Management</h1>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
        {/* Tabs */}
        <div className="flex gap-3 bg-white w-fit py-2 px-2 rounded-md shadow-sm border border-pink-100">
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
      {activeTab === "worker" ? (
        <UserTable
          data={filteredData}
          type="worker"
          onView={handleView}
          onDelete={handleDeleteClick}
        />
      ) : (
        <UserTable
          data={filteredData}
          type="customer"
          onView={handleView}
          onDelete={handleDeleteClick}
        />
      )}

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={!!selectedUser}
        user={selectedUser}
        type={activeTab}
        onClose={() => setSelectedUser(null)}
        onAction={(user) => {
          console.log("Block", user.name);
          setSelectedUser(null);
        }}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        title="Block User"
        message={`Are you sure you want to block ${
          userToBlock?.name || "this user"
        }?`}
        confirmText="Block"
        cancelText="Cancel"
        onConfirm={handleBlock}
        onCancel={handleCancelBlock}
      />

      {/* create worker modal */}
      <CreateWorkerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default UserManagement;
