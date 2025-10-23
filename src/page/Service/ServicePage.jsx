import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateServiceModal from "../../component/ui/Modals/UpdateServiceModal";
import ConfirmationModal from "../../component/ui/Modals/ConfirmationModal";
import AddServiceModal from "../../component/ui/Modals/AddServiceModal";
import { allServices } from "../../constants/service";

const ServicePage = () => {
  const [services, setServices] = useState(allServices);

  const [deleteId, setDeleteId] = useState(null);
  const [editService, setEditService] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // 🗑️ Delete Confirmation
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    setServices(services.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  };

  const cancelDelete = () => setDeleteId(null);

  // ✏️ Edit Modal
  const handleEdit = (service) => {
    setEditService(service);
  };

  const handleUpdate = (updated) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditService(null);
  };

  const handleAddService = (newService) => {
    const newServiceObj = {
      id: services.length + 1,
      name: newService.name,
      price: newService.price,
      gel: newService.gel || "N/A",
      water: newService.water || "N/A",
    };
    setServices((prev) => [...prev, newServiceObj]);
    setShowAddModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Services</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-pink-600 text-white py-2 px-4 rounded"
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-pink-100 shadow-sm">
        <table className="w-full text-left text-sm text-gray-700 min-w-[600px]">
          <thead className="bg-pink-50 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Service Name</th>
              <th className="px-6 py-3">Price ($)</th>
              <th className="px-6 py-3">Gel ($)</th>
              <th className="px-6 py-3">Water ($)</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-pink-100 hover:bg-pink-50 transition-all"
              >
                <td className="px-6 py-3">{service.name}</td>
                <td className="px-6 py-3">${service.price}</td>
                <td className="px-6 py-3">
                  {service.subServices?.map((s) => s.name === "Gel" && s.price)}
                </td>
                <td className="px-6 py-3">
                  {service.subServices?.map((s) => s.name === "Water" && s.price)}
                </td>
                <td className="px-6 py-3 text-right flex justify-end gap-4 text-[#e91e63]">
                  <EditOutlined
                    onClick={() => handleEdit(service)}
                    className="cursor-pointer hover:text-pink-500 text-lg"
                  />
                  <DeleteOutlined
                    onClick={() => handleDelete(service.id)}
                    className="cursor-pointer hover:text-red-500 text-lg"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🗑️ Delete Modal */}
      <ConfirmationModal
        isOpen={!!deleteId}
        title="Delete Service"
        message="Are you sure you want to delete this service?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* ✏️ Update Modal */}
      <UpdateServiceModal
        isOpen={!!editService}
        service={editService}
        onClose={() => setEditService(null)}
        onSave={handleUpdate}
      />

      {/* Add New Service Modal */}
      <AddServiceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddService={handleAddService}
      />
    </div>
  );
};

export default ServicePage;
