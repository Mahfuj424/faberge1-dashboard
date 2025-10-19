/* eslint-disable react/prop-types */
import { Input } from "antd";

const CustomInput = ({
  icon: Icon,
  placeholder,
  className,
  type = "text",
  isPassword = false,
  isTextArea = false,
  isFile = false,
  rows = 4,
  name,
  ...rest
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        {/* 🔹 TextArea */}
        {isTextArea ? (
          <Input.TextArea
            placeholder={placeholder || "Enter text"}
            rows={rows}
            className={`w-full px-4 py-2 text-[16px] border border-[#e91e63] text-[#0a0a0a] rounded-lg resize-none focus:border-[#d81b60] focus:shadow-md ${className}`}
            {...rest}
          />
        ) : isPassword ? (
          /* 🔹 Password Input */
          <Input.Password
            prefix={Icon && <Icon className="text-[#e91e63] text-xl" />}
            placeholder={placeholder || "Enter password"}
            className={`w-full px-4 py-2 text-[16px] border border-[#e91e63] text-[#0a0a0a] rounded-lg focus:border-[#d81b60] focus:shadow-md ${className}`}
            {...rest}
          />
        ) : isFile ? (
          /* 🔹 File Input */
          <input
            type="file"
            name={name}
            className={`w-full px-4 py-2 text-[16px] border border-[#e91e63] text-[#0a0a0a] rounded-lg file:cursor-pointer file:bg-[#e91e63] file:text-white file:rounded-md file:px-3 file:py-1 file:border-none hover:file:bg-[#d81b60] transition-all ${className}`}
            accept="image/*"
            {...rest}
          />
        ) : (
          /* 🔹 Default Text Input */
          <Input
            prefix={Icon && <Icon className="text-[#e91e63] text-xl" />}
            placeholder={placeholder || "Enter value"}
            className={`w-full px-4 py-2 text-[16px] border border-[#e91e63] text-[#0a0a0a] rounded-lg focus:border-[#d81b60] focus:shadow-md ${className}`}
            type={type}
            {...rest}
          />
        )}
      </div>
    </div>
  );
};

export default CustomInput;
