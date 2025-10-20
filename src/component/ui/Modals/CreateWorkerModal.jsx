import React, { useRef, useState } from "react";
import { Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CreateWorkerModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    workerId: "",
    password: "",
    confirmPassword: "",
  });

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("👷 Worker Profile Data:", { ...formData, imagePreview });
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      className="create-worker-modal"
    >
      <h2 className="text-lg font-semibold mb-4">Create Worker Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Upload Photo Section */}
        <div
          className="col-span-2 flex flex-col items-center border border-dashed border-pink-200 rounded-md py-6 hover:bg-pink-50 transition cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-pink-200"
            />
          ) : (
            <>
              <UploadOutlined className="text-3xl text-[#e91e63]" />
              <p className="text-sm text-gray-600 mt-2">
                Upload a professional photo of the worker
              </p>
              <p className="text-xs text-gray-400">JPG, PNG, GIF up to 1MB</p>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Input Fields */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63] focus:outline-none"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63] focus:outline-none"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="col-span-2 border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63]"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63]"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63]"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63]"
        />

        <input
          type="text"
          name="workerId"
          placeholder="Worker ID"
          value={formData.workerId}
          onChange={handleChange}
          className="col-span-2 border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63]"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63]"
        />

        {/* Buttons */}
        <div className="col-span-2 flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-[#e91e63] text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-all"
          >
            Create Profile
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-[#e91e63] text-[#e91e63] px-6 py-2 rounded-md hover:bg-pink-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateWorkerModal;
