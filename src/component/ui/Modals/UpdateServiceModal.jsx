import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const UpdateServiceModal = ({ isOpen, service, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    gel: "",
    water: "",
  });

  useEffect(() => {
    if (service) {
      // ✅ সাব-সার্ভিস থেকে Gel এবং Water এর দাম বের করছি
      const gelSub = service.subServices?.find((s) => s.name === "Gel");
      const waterSub = service.subServices?.find((s) => s.name === "Water");

      setFormData({
        id: service.id || "",
        name: service.name || "",
        price: service.price || "",
        gel: gelSub?.price || "",
        water: waterSub?.price || "",
      });
    }
  }, [service]);

  // ✅ ইনপুট পরিবর্তন হ্যান্ডেল
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ ফর্ম সাবমিট
  const handleSubmit = (e) => {
    e.preventDefault();

    // clean data বানাচ্ছি
    const updatedData = {
      id: formData.id,
      name: formData.name.trim(),
      price: Number(formData.price),
      subServices: [],
    };

    // যদি Manicure বা Pedicure হয়, তাহলে subServices যোগ হবে
    if (formData.name === "Manicure" || formData.name === "Pedicure") {
      updatedData.subServices.push(
        { name: "Gel", price: Number(formData.gel) || 0 },
        { name: "Water", price: Number(formData.water) || 0 }
      );
    }

    console.log("🛠 Final Updated Service:", updatedData);
    onSave(updatedData);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="update-service-modal"
    >
      <h2 className="text-lg font-semibold mb-4">
        Update {service?.name || "Service"}
      </h2>
      <hr className="border-gray-300 mb-5" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 🔹 Service Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter service name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63] focus:outline-none"
            required
          />
        </div>

        {/* 🔹 Price Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63] focus:outline-none"
            required
          />
        </div>

        {/* 🔹 Conditional Fields for Manicure/Pedicure */}
        {(formData.name === "Manicure" || formData.name === "Pedicure") && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gel Price ($)
              </label>
              <input
                type="number"
                name="gel"
                placeholder="Enter gel price"
                value={formData.gel}
                onChange={handleChange}
                className="w-full border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Water Price ($)
              </label>
              <input
                type="number"
                name="water"
                placeholder="Enter water price"
                value={formData.water}
                onChange={handleChange}
                className="w-full border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63] focus:outline-none"
              />
            </div>
          </>
        )}

        {/* 🔹 Buttons */}
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
