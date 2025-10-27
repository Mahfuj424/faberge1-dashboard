import { useRef, useState } from "react";
import { Modal, Select, Table } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { allServices } from "../../../constants/service";

const CreateWorkerModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  // 🔹 Worker Info
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    title:"",
    workerId: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 🔹 Static Services

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSubServices, setSelectedSubServices] = useState({});

  // 🔹 Handle input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🔹 Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  // 🔹 Select main service
  const handleSelectMainService = (value) => {
    if (!selectedServices.includes(value)) {
      setSelectedServices([...selectedServices, value]);
    }
  };

  // 🔹 Select sub-service
  const handleSelectSubService = (mainName, value) => {
    setSelectedSubServices((prev) => ({
      ...prev,
      [mainName]: value,
    }));
  };

  // 🔹 Remove service
  const handleDeleteService = (name) => {
    setSelectedServices(selectedServices.filter((s) => s !== name));
    const newSub = { ...selectedSubServices };
    delete newSub[name];
    setSelectedSubServices(newSub);
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      image: imagePreview,
      selectedServices: selectedServices.map((srv) => {
        const found = allServices.find((s) => s.name === srv);
        return {
          name: found.name,
          price: found.price,
          subServices:
            found.subServices.length > 0
              ? (selectedSubServices[srv] || []).map((sub) =>
                  found.subServices.find((ss) => ss.name === sub)
                )
              : [],
        };
      }),
    };

    console.log("👷 Worker Created:", payload);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={900}
      className="create-worker-modal"
    >
      <h2 className="text-lg font-semibold mb-4 text-[#e91e63]">
        Create Worker Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Upload Photo */}
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
                Upload a professional photo
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

        {/* Basic Info */}
        {Object.keys(formData).map((key) => {
          // ✅ Custom placeholder labels
          let placeholder = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase());

          if (key === "workerId") placeholder = "Worker ID#";
          if (key === "zip") placeholder = "Zip Code";

          return (
            <div key={key} className="col-span-1">
              <input
                type={
                  key.includes("password")
                    ? "password"
                    : key === "email"
                    ? "email"
                    : "text"
                }
                name={key}
                placeholder={placeholder}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border border-pink-100 rounded-md px-3 py-2 focus:border-[#e91e63] focus:outline-none"
              />
            </div>
          );
        })}

        {/* Main Services */}
        <div className="col-span-2 mt-3">
          <label className="font-medium text-gray-700 mb-2 block">
            Select Main Services
          </label>
          <Select
            placeholder="Select a service"
            style={{ width: "100%" }}
            onSelect={handleSelectMainService}
            options={allServices.map((s) => ({ label: s.name, value: s.name }))}
          />
        </div>

        {/* Selected Services Table */}
        {selectedServices.length > 0 && (
          <div className="col-span-2 mt-6 bg-pink-50 border border-pink-100 rounded-lg p-4">
            <h3 className="text-md font-semibold text-[#e91e63] mb-3">
              Selected Services
            </h3>

            {selectedServices.map((srv) => {
              const service = allServices.find((s) => s.name === srv);
              const hasSub = service.subServices.length > 0;

              return (
                <div
                  key={srv}
                  className="bg-white border border-pink-100 rounded-lg mb-4 p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {srv} —{" "}
                      <span className="text-gray-500">${service.price}</span>
                    </h4>
                    <DeleteOutlined
                      onClick={() => handleDeleteService(srv)}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    />
                  </div>

                  {hasSub ? (
                    <>
                      <p className="text-sm text-gray-600 mb-2">
                        Select Extra Services:
                      </p>
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Select sub-services"
                        value={selectedSubServices[srv] || []}
                        onChange={(v) => handleSelectSubService(srv, v)}
                        options={service.subServices.map((ss) => ({
                          label: `${ss.name} ($${ss.price})`,
                          value: ss.name,
                        }))}
                      />

                      {selectedSubServices[srv]?.length > 0 && (
                        <Table
                          className="mt-3"
                          dataSource={service.subServices
                            .filter((ss) =>
                              selectedSubServices[srv]?.includes(ss.name)
                            )
                            .map((ss, i) => ({
                              key: i,
                              name: ss.name,
                              price: `$${ss.price}`,
                              water: `$${ss.water}`,
                            }))}
                          pagination={false}
                          size="small"
                          bordered
                          columns={[
                            { title: "Sub Service", dataIndex: "name" },
                            { title: "Price", dataIndex: "price" },
                            { title: "Water", dataIndex: "water" },
                          ]}
                        />
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-600 italic">
                      No sub-services (Base price ${service.price})
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

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
