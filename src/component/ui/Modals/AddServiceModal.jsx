import React, { useState } from "react";
import { Modal } from "antd";

const AddServiceModal = ({ isOpen, onClose, onAddService }) => {
  const [newService, setNewService] = useState({
    name: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleAdd = () => {
    if (!newService.name || !newService.price) {
      alert("Please provide both Service Name and Price");
      return;
    }

    onAddService(newService);
    onClose();
    setNewService({
      name: "",
      price: "",
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="create-service-modal"
    >
      <h2 className="text-lg font-semibold mb-4">Add New Service</h2>

      <div>
        {/* Service Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Service Name</label>
          <input
            type="text"
            name="name"
            value={newService.name}
            onChange={handleInputChange}
            className="border border-pink-100 rounded-md px-3 py-2 w-full focus:border-[#e91e63] focus:outline-none"
            placeholder="Enter Service Name"
          />
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price ($)</label>
          <input
            type="number"
            name="price"
            value={newService.price}
            onChange={handleInputChange}
            className="border border-pink-100 rounded-md px-3 py-2 w-full focus:border-[#e91e63] focus:outline-none"
            placeholder="Enter Price"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleAdd}
          className="bg-[#e91e63] text-white py-2 px-6 rounded-md hover:bg-pink-600 transition-all"
        >
          Add Service
        </button>
        <button
          onClick={onClose}
          className="border border-[#e91e63] text-[#e91e63] py-2 px-6 rounded-md hover:bg-pink-50 transition-all"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddServiceModal;
