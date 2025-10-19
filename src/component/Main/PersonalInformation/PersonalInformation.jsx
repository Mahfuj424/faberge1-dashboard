import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const ProfileForm = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [profile, setProfile] = useState({
    username: "userdemo",
    email: "email@gmail.com",
    phone: "+1 222 333 4444",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password Change Request:", passwords);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex  items-center my-6">
          <Link to="/">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white shadow-sm rounded-xl p-8 flex flex-col items-center mb-8 relative">
        <div className="relative">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-pink-100"
          />
          <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">
            <EditOutlined className="text-[#e91e63]" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-3">Mr. Admin</h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-pink-100 mb-6">
        <button
          className={`px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === "edit"
              ? "text-[#e91e63] border-b-2 border-[#e91e63]"
              : "text-gray-500 hover:text-[#e91e63]"
          }`}
          onClick={() => setActiveTab("edit")}
        >
          Edit Profile
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === "password"
              ? "text-[#e91e63] border-b-2 border-[#e91e63]"
              : "text-gray-500 hover:text-[#e91e63]"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-lg mx-auto">
        {activeTab === "edit" ? (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Contact No
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#e91e63] text-white py-2 rounded-lg hover:bg-pink-600 transition-all font-semibold mt-4"
            >
              Update Profile
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#e91e63]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#e91e63] text-white py-2 rounded-lg hover:bg-pink-600 transition-all font-semibold mt-4"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
