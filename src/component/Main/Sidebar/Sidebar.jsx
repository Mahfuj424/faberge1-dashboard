import React, { useState } from "react";
import {
  DashboardOutlined,
  SettingOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TransactionOutlined,
  UserAddOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { IoNotificationsOutline } from "react-icons/io5";
import logo from "/public/logo/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ConfirmationModal from "../../ui/Modals/ConfirmationModal";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <DashboardOutlined /> },
  { name: "Profile", path: "/profile", icon: <UsergroupAddOutlined /> },
  {
    name: "Notifications",
    path: "/notification",
    icon: <IoNotificationsOutline />,
  },
  { name: "Settings", path: "/settings", icon: <SettingOutlined /> },
  { name: "Analytics", path: "/analytics", icon: <LineChartOutlined /> },
  { name: "Users", path: "/users", icon: <UsergroupAddOutlined /> },
  { name: "Services", path: "/services", icon: <AppstoreOutlined /> },
  { name: "States", path: "/states", icon: <EnvironmentOutlined /> },
  { name: "Bookings", path: "/bookings", icon: <CalendarOutlined /> },
  { name: "Transaction", path: "/transaction", icon: <TransactionOutlined /> },
  {
    name: "Create Manager",
    path: "/create-manager",
    icon: <UserAddOutlined />,
  },
  {
    name: "Manager Management",
    path: "/manager-management",
    icon: <TeamOutlined />,
  },
  { name: "Help & Support", path: "/help", icon: <QuestionCircleOutlined /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowModal(false);
    toast.success("User Logged Out!");
    navigate("/auth/sign-in");
  };

  return (
    <>
      {/* 🔹 Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-[#e8aebf] text-white px-4 py-3 fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl"
        >
          {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {/* 🔹 Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-80 bg-[#e8aebf] text-white flex-col z-30 shadow-md">
        {/* Scrollable container */}
        <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#f7c1d0] scrollbar-track-[#e8aebf]/40">
          {/* Logo */}
          <div className="flex flex-col items-start justify-end mt-4 ps-3">
            <img src={logo} alt="logo" className="w-[90px] mb-2" />
          </div>

          {/* Menu Items */}
          <ul className="flex-1 mt-6 flex flex-col gap-1 pb-24">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-2 mx-3 rounded-md text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-white text-[#e91e63]"
                      : "hover:bg-[#f4c5d0] text-white"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xl">{item.name}</span>
              </NavLink>
            ))}
          </ul>

          {/* Logout Button */}
          <div
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-6 py-4 border-t border-white/20 hover:bg-[#f4c5d0] cursor-pointer rounded-br-xl"
          >
            <LogoutOutlined className="text-lg" />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* 🔹 Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#e8aebf] text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col items-center mt-4">
          <img src={logo} alt="logo" className="w-[90px] mb-2" />
          <h2 className="text-lg font-semibold">IHBS</h2>
        </div>

        {/* ✅ Scrollable mobile menu */}
        <ul className="flex-1 mt-6 flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#f7c1d0] scrollbar-track-[#e8aebf]/40">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2 mx-3 rounded-md text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-white text-[#e91e63] font-semibold"
                    : "hover:bg-[#f4c5d0] text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </ul>

        {/* Logout Button */}
        <div
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 px-6 py-4 border-t border-white/20 hover:bg-[#f4c5d0] cursor-pointer"
        >
          <LogoutOutlined className="text-lg" />
          <span>Logout</span>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default Sidebar;
