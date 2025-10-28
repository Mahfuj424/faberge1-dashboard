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

  const handleDelete = (id) => setDeleteId(id);
  const confirmDelete = () => {
    setServices((prev) => prev.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  };
  const cancelDelete = () => setDeleteId(null);

  const handleEdit = (service) => setEditService(service);

  const handleUpdate = (updated) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditService(null);
  };

  // 🟣 Add Service with Sub-services
  const handleAddService = (newServices) => {
    const formatted = newServices.map((srv, i) => ({
      id: services.length + i + 1,
      name: srv.name,
      price: srv.price,
      subServices: srv.subServices || [],
    }));

    setServices((prev) => [...prev, ...formatted]);
    setShowAddModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Services</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#e91e63] text-white py-2 px-5 rounded-md shadow hover:bg-pink-600 transition-all"
        >
          + Add New
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-pink-100 shadow-sm">
        <table className="w-full text-left text-sm text-gray-700 min-w-[600px]">
          <thead className="bg-pink-50 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Service Name</th>
              <th className="px-6 py-3">Price ($)</th>
              <th className="px-6 py-3">Add-Ons</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-pink-100 hover:bg-pink-50 transition-all"
              >
                <td className="px-6 py-3">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    {/* Show sub-services if any */}
                  </div>
                </td>
                <td className="px-6 py-3">${service.price}</td>
                <td className="px-6 py-3">
                  {service.subServices?.length > 0 && (
                    <ul className="text-xs text-gray-500 mt-1 list-disc ml-5">
                      {service.subServices.map((sub, idx) => (
                        <li key={idx}>
                          {sub.name} — ${sub.price}
                        </li>
                      ))}
                    </ul>
                  )}
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

      <ConfirmationModal
        isOpen={!!deleteId}
        title="Delete Service"
        message="Are you sure you want to delete this service?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <UpdateServiceModal
        isOpen={!!editService}
        service={editService}
        onClose={() => setEditService(null)}
        onSave={handleUpdate}
      />

      <AddServiceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddService={handleAddService}
      />
    </div>
  );
};

export default ServicePage;
