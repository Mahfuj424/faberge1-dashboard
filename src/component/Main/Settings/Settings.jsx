/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Form, Modal, Switch } from "antd";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdOutlineCloudUpload,
} from "react-icons/md";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { useState, useRef } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();

  // 👇 New States for Banner Section
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const onChange = (checked) => console.log(`switch to ${checked}`);

  const settingsItem = [
    {
      title: "About us",
      path: "about-us",
    },
    {
      title: "Home Banner",
      path: "home-banner",
    },
  ];

  const handleNavigate = (value) => {
    if (value === "notification") return;

    if (value === "change-password") {
      setModelTitle("Change password");
      setIsModalOpen(true);
    } else if (value === "home-banner") {
      setBannerOpen(!bannerOpen);
    } else {
      navigate(`/site-content/${value}`);
    }
  };

  // 📸 File Upload Handlers
  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleUploadBanner = () => {
    if (!bannerFile) {
      console.warn("No file selected!");
      return;
    }
    console.log("✅ Uploaded Banner File:", bannerFile);

    // Close section after upload
    setBannerOpen(false);
    setBannerFile(null);
    setPreview(null);
  };

  // Password Related (existing)
  const handleChangePassword = async (values) => console.log(values);
  const handleForgetPassword = async (values) =>
    console.log("Forget password", values);
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log("OTP:", otp);
  };
  const handleResetPassword = async (values) =>
    console.log("Reset password", values);

  return (
    <section className="w-full py-6">
      {settingsItem.map((setting, index) => (
        <div key={index} className="w-full">
          {/* Each Setting Row */}
          <div
            className="w-full p-4 mb-2 text-sm border-gray-300 border-b flex items-center justify-between cursor-pointer transition-all"
            onClick={() => handleNavigate(setting.path)}
          >
            <h2 className="text-xl">{setting.title}</h2>

            {setting.path === "home-banner" ? (
              bannerOpen ? (
                <MdKeyboardArrowDown size={35} />
              ) : (
                <MdKeyboardArrowRight size={35} />
              )
            ) : (
              <MdKeyboardArrowRight size={35} />
            )}
          </div>

          {/* 🖼️ Home Banner Upload Section */}
          {setting.path === "home-banner" && bannerOpen && (
            <div className="bg-white p-6 border border-pink-100 rounded-lg mb-4 shadow-sm animate-fadeIn">
              <p className="text-gray-600 mb-3">
                Upload a Home Banner Image or Video
              </p>

              <div
                onClick={handleFileClick}
                className="border-2 border-dashed border-pink-200 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-all"
              >
                {preview ? (
                  <>
                    {bannerFile?.type?.startsWith("video/") ? (
                      <video
                        src={preview}
                        controls
                        className="h-40 rounded-lg"
                      />
                    ) : (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-40 rounded-lg object-cover"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <MdOutlineCloudUpload className="text-3xl text-[#e91e63] mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload image or video
                    </p>
                  </>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
              />

              <div className="mt-4 text-right">
                <button
                  onClick={handleUploadBanner}
                  className="bg-[#e91e63] hover:bg-[#d81b60] text-white px-4 py-2 rounded-md shadow transition-all"
                >
                  Upload Banner
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 🔒 Change/Forget Password Modal (existing) */}
      <Modal
        title={
          <div
            onClick={() => setIsModalOpen(false)}
            className="flex bg-primary items-center cursor-pointer text-black"
          >
            <h1 className="text-xl font-medium mb-5">{modelTitle}</h1>
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        centered
      >
        {modelTitle === "Change password" && (
          <div className="w-full px-5">
            <p className="text-[14px] mb-[14px]">
              Your password must be 8-10 character long.
            </p>
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              layout="vertical"
              className="space-y-4"
              onFinish={handleChangePassword}
            >
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
              >
                <CustomInput placeholder="Enter your old password" isPassword />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <CustomInput placeholder="Set your new password" isPassword />
              </Form.Item>

              <Form.Item
                name="reenterPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please re-enter your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <CustomInput placeholder="Re-enter password" isPassword />
              </Form.Item>

              <p className="text-secondary font-medium">
                <button
                  type="button"
                  onClick={() => setModelTitle("Forget password")}
                  className="underline text-blue-500"
                >
                  Forget Password
                </button>
              </p>

              <Form.Item>
                <CustomButton className="w-full">Update Password</CustomButton>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Settings;
