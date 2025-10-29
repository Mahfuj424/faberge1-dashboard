import React, { useRef, useState } from "react";
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
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/men/45.jpg"
  );
  const fileInputRef = useRef(null);

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

  // 🔹 Open file picker
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  // 🔹 Handle file selection & preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex  items-center">
          <Link to="/">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
      </div>

      <div className="w-[400px] mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow-sm rounded-xl p-8 flex flex-col items-center mb-8 relative">
          <div className="relative">
            {/* Profile Image */}
            <img
              src={profileImage}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-pink-100"
            />

            {/* Edit Icon */}
            <div
              onClick={handleIconClick}
              className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow cursor-pointer hover:bg-pink-50 transition-all"
            >
              <EditOutlined className="text-[#e91e63] text-lg" />
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-3">
            Mr. Admin
          </h2>
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
        <div className="bg-white rounded-xl shadow-sm p-8 w-full">
          <div className="max-w-lg mx-auto">
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
                  <label className="block text-sm font-semibold mb-1">
                    Email
                  </label>
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
                    placeholder="Current Password..."
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
                    placeholder="New Password..."
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
                    placeholder="Confirm Password..."
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
      </div>
    </div>
  );
};

export default ProfileForm;
