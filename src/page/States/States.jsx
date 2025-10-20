import { useState } from "react";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import statesData from "../../constants/states.json";

const States = () => {
  // handle both array and object json
  const statesArray = Array.isArray(statesData)
    ? statesData
    : statesData?.states || [];

  const sortedStates = [...statesArray].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [activeStates, setActiveStates] = useState(["New York"]);

  const toggleState = (stateName) => {
    setActiveStates((prev) =>
      prev.includes(stateName)
        ? prev.filter((s) => s !== stateName)
        : [...prev, stateName]
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">States</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedStates.map((state) => {
          const isActive = activeStates.includes(state.name);
          return (
            <button
              key={state.code}
              onClick={() => toggleState(state.name)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all 
                ${
                  isActive
                    ? "bg-green-500 text-white"
                    : "bg-[#ffdfd3] text-gray-700"
                }`}
            >
              {isActive ? (
                <UnlockOutlined className="text-white" />
              ) : (
                <LockOutlined className="text-[#e91e63]" />
              )}
              {state.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default States;
