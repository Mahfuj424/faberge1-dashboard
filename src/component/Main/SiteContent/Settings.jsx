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

  // 👇 States for Home Banner
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // 👇 States for Service Banner (Manicure/Pedicure)
  const [serviceBannerOpen, setServiceBannerOpen] = useState(false);
  const [manicureBanner, setManicureBanner] = useState(null);
  const [pedicureBanner, setPedicureBanner] = useState(null);
  const [manicurePreview, setManicurePreview] = useState(null);
  const [pedicurePreview, setPedicurePreview] = useState(null);
  const manicureRef = useRef(null);
  const pedicureRef = useRef(null);

  const settingsItem = [
    { title: "About us", path: "about-us" },
    { title: "Home Banner", path: "home-banner" },
    { title: "Service Banner", path: "service-banner" },
  ];

  // 📍 Handle Navigation or Toggle
  const handleNavigate = (value) => {
    if (value === "notification") return;
    if (value === "change-password") {
      setModelTitle("Change password");
      setIsModalOpen(true);
    } else if (value === "home-banner") {
      setBannerOpen(!bannerOpen);
    } else if (value === "service-banner") {
      setServiceBannerOpen(!serviceBannerOpen);
    } else {
      navigate(`/site-content/${value}`);
    }
  };

  // 📸 Home Banner Upload Handlers
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
    if (!bannerFile) return;
    console.log("✅ Home Banner Uploaded:", bannerFile);
    setBannerOpen(false);
    setBannerFile(null);
    setPreview(null);
  };

  // 📸 Manicure / Pedicure Upload Handlers
  const handleServiceUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    if (type === "manicure") {
      setManicureBanner(file);
      setManicurePreview(url);
    } else {
      setPedicureBanner(file);
      setPedicurePreview(url);
    }
  };

  const handleUploadServiceBanner = (type) => {
    if (type === "manicure" && manicureBanner) {
      console.log("✅ Manicure Banner Uploaded:", manicureBanner);
      setManicureBanner(null);
      setManicurePreview(null);
    } else if (type === "pedicure" && pedicureBanner) {
      console.log("✅ Pedicure Banner Uploaded:", pedicureBanner);
      setPedicureBanner(null);
      setPedicurePreview(null);
    }
  };

  // 🧠 Password Modal Logic
  const handleChangePassword = async (values) => console.log(values);

  return (
    <section className="w-full py-6">
      <h1 className="text-xl font-semibold text-gray-800 py-4 ms-4">
        Site Content
      </h1>
      {settingsItem.map((setting, index) => (
        <div key={index} className="w-full">
          {/* Setting Row */}
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
            ) : setting.path === "service-banner" ? (
              serviceBannerOpen ? (
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
            <div className="bg-white p-6 border border-pink-100 rounded-lg mb-4 shadow-sm">
              <p className="text-gray-600 mb-3">Upload Image or Video</p>
              <div
                onClick={handleFileClick}
                className="border-2 border-dashed border-pink-200 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-all"
              >
                {preview ? (
                  bannerFile?.type?.startsWith("video/") ? (
                    <video src={preview} controls className="h-40 rounded-lg" />
                  ) : (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-40 rounded-lg object-cover"
                    />
                  )
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

          {/* 🧴 Service Banner Section */}
          {setting.path === "service-banner" && serviceBannerOpen && (
            <div className="bg-white p-6 border border-pink-100 rounded-lg mb-4 shadow-sm space-y-6">
              <p className="text-gray-600 mb-3">
                Upload separate banners for Manicure and Pedicure services.
              </p>

              {/* Manicure Banner */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Manicure Banner
                </h3>
                <div
                  onClick={() => manicureRef.current.click()}
                  className="border-2 border-dashed border-pink-200 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-all"
                >
                  {manicurePreview ? (
                    manicureBanner?.type?.startsWith("video/") ? (
                      <video
                        src={manicurePreview}
                        controls
                        className="h-40 rounded-lg"
                      />
                    ) : (
                      <img
                        src={manicurePreview}
                        alt="Preview"
                        className="h-40 rounded-lg object-cover"
                      />
                    )
                  ) : (
                    <>
                      <MdOutlineCloudUpload className="text-3xl text-[#e91e63] mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload Manicure banner
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={manicureRef}
                  onChange={(e) => handleServiceUpload("manicure", e)}
                  accept="image/*,video/*"
                  className="hidden"
                />
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleUploadServiceBanner("manicure")}
                    className="bg-[#e91e63] hover:bg-[#d81b60] text-white px-4 py-2 rounded-md shadow transition-all"
                  >
                    Upload Banner
                  </button>
                </div>
              </div>

              {/* Pedicure Banner */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Pedicure Banner
                </h3>
                <div
                  onClick={() => pedicureRef.current.click()}
                  className="border-2 border-dashed border-pink-200 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-all"
                >
                  {pedicurePreview ? (
                    pedicureBanner?.type?.startsWith("video/") ? (
                      <video
                        src={pedicurePreview}
                        controls
                        className="h-40 rounded-lg"
                      />
                    ) : (
                      <img
                        src={pedicurePreview}
                        alt="Preview"
                        className="h-40 rounded-lg object-cover"
                      />
                    )
                  ) : (
                    <>
                      <MdOutlineCloudUpload className="text-3xl text-[#e91e63] mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload Pedicure banner
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={pedicureRef}
                  onChange={(e) => handleServiceUpload("pedicure", e)}
                  accept="image/*,video/*"
                  className="hidden"
                />
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleUploadServiceBanner("pedicure")}
                    className="bg-[#e91e63] hover:bg-[#d81b60] text-white px-4 py-2 rounded-md shadow transition-all"
                  >
                    Upload Banner
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 🔒 Password Modal */}
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
                  { required: true, message: "Please input old password!" },
                ]}
              >
                <CustomInput placeholder="Enter old password" isPassword />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  { required: true, message: "Please input new password!" },
                ]}
              >
                <CustomInput placeholder="Set new password" isPassword />
              </Form.Item>

              <Form.Item
                name="reenterPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please re-enter your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <CustomInput placeholder="Re-enter password" isPassword />
              </Form.Item>

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
