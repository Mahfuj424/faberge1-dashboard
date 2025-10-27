import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const UpdateServiceModal = ({ isOpen, service, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    subServices: [],
  });

  // 🔹 When service data comes in, load it into form
  useEffect(() => {
    if (service) {
      setFormData({
        id: service.id || "",
        name: service.name || "",
        price: service.price || "",
        subServices: service.subServices ? [...service.subServices] : [],
      });
    }
  }, [service]);

  // 🔹 Handle main service input
  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle sub-service input
  const handleSubChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.subServices];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, subServices: updated }));
  };

  // 🔹 Add a new sub-service
  const handleAddSub = () => {
    setFormData((prev) => ({
      ...prev,
      subServices: [...prev.subServices, { name: "", price: "" }],
    }));
  };

  // 🔹 Remove sub-service
  const handleRemoveSub = (index) => {
    const updated = [...formData.subServices];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, subServices: updated }));
  };

  // 🔹 Save updated data
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      id: formData.id,
      name: formData.name.trim(),
      price: Number(formData.price),
      subServices: formData.subServices.filter(
        (sub) => sub.name.trim() !== "" && sub.price !== ""
      ),
    };

    onSave(updatedData);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      className="update-service-modal"
    >
      <h2 className="text-lg font-semibold mb-4 text-[#e91e63]">
        Update Service
      </h2>
      <hr className="border-gray-300 mb-5" />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 🔹 Main Service Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleMainChange}
            placeholder="Enter Service Name"
            className="w-full border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleMainChange}
            placeholder="Enter Price"
            className="w-full border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63] focus:outline-none"
            required
          />
        </div>

        {/* 🔹 Sub-Services (If Exist) */}
        <div className="bg-pink-50 border border-pink-100 rounded-md p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-700">Add Ones (Optional)</h4>
            <button
              type="button"
              onClick={handleAddSub}
              className="border border-[#e91e63] text-[#e91e63] bg-white py-1 px-3 rounded-md hover:bg-pink-50 transition-all text-sm font-medium"
            >
              + Add Ones
            </button>
          </div>

          {formData.subServices.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              No sub-service added yet.
            </p>
          )}

          {formData.subServices.map((sub, i) => (
            <div
              key={i}
              className="grid grid-cols-2 gap-4 mb-3 relative bg-white border border-pink-100 rounded-md p-3"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  value={sub.name}
                  onChange={(e) => handleSubChange(i, e)}
                  className="border border-pink-100 rounded-md px-3 py-2 w-full focus:border-[#e91e63] focus:outline-none"
                  placeholder="Sub-service Name"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="price"
                  value={sub.price}
                  onChange={(e) => handleSubChange(i, e)}
                  className="border border-pink-100 rounded-md px-3 py-2 w-full focus:border-[#e91e63] focus:outline-none"
                  placeholder="Price ($)"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSub(i)}
                className="absolute -right-2 top-2 text-red-500 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* 🔹 Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-[#e91e63] text-white px-8 py-2 rounded-md hover:bg-pink-600 transition-all font-medium"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-[#e91e63] text-[#e91e63] px-8 py-2 rounded-md hover:bg-pink-50 transition-all font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateServiceModal;
