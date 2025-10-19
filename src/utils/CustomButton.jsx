/* eslint-disable react/prop-types */
import { Button } from "antd";

const CustomButton = ({
  loading = false,
  children,
  className,
  htmlType = "submit",
  onClick,
  type = "default",
}) => {
  return (
    <div className={`${className} p-0.5 rounded-lg inline-block`}>
      <Button
        type={type}
        htmlType={htmlType}
        loading={loading}
        onClick={onClick}
        className="w-full px-5 py-2 flex justify-center items-center gap-3 rounded-lg border-none font-medium text-white bg-[#e91e63] hover:bg-[#d81b60] active:bg-[#c2185b] transition-all duration-200"
        size="large"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          backgroundColor: "#e91e63",
          color: "#fff",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#d81b60";
          e.target.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#e91e63";
          e.target.style.color = "#fff";
        }}
      >
        {children}
      </Button>
    </div>
  );
};

export default CustomButton;
