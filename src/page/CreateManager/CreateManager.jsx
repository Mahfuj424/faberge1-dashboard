import React, { useState, useRef } from "react";
import {
  UploadOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const CreateManager = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    email: "",
    managerId: "",
    newPassword: "",
    confirmPassword: "",
    profileImage: "",
  });

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormData({ ...formData, profileImage: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex justify-center py-10 px-4 ">
      <div className="w-full shadow-md rounded-2xl p-8 ">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Create Manager
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              placeholder="Enter Address"
              required
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
                placeholder="City"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
                placeholder="State"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Manager ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Create ID
            </label>
            <input
              type="text"
              name="managerId"
              value={formData.managerId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              placeholder="252 441 654"
              required
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-[#e91e63]"
                placeholder="Enter password"
                required
              />
              <span
                className="absolute right-3 top-[35px] cursor-pointer text-gray-500 hover:text-[#e91e63]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeTwoTone twoToneColor="#e91e63" />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-[#e91e63]"
                placeholder="Confirm password"
                required
              />
              <span
                className="absolute right-3 top-[35px] cursor-pointer text-gray-500 hover:text-[#e91e63]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeTwoTone twoToneColor="#e91e63" />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </span>
            </div>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div
              onClick={handleFileClick}
              className="border-2 border-dashed border-pink-200 rounded-lg h-36 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-all"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <>
                  <UploadOutlined className="text-2xl text-[#e91e63] mb-2" />
                  <p className="text-sm text-gray-500">Upload Image</p>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#ff3679] hover:bg-[#ff307c] text-white py-2.5 rounded-lg font-semibold mt-4 transition-all"
          >
            Create Manager
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateManager;
