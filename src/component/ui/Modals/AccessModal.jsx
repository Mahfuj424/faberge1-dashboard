import React, { useState, useEffect } from "react";
import AccessibilityList from "../../../page/ManagerManagement/AccessibilityList";

const AccessModal = ({ isOpen, manager, onClose, onToggleAccess }) => {
  const [localManager, setLocalManager] = useState(manager);

  // Sync when manager changes
  useEffect(() => {
    setLocalManager(manager);
  }, [manager]);

  if (!isOpen) return null;

  // Handle toggle instantly (updates parent + local state)
  const handleToggle = (module, value) => {
    const updated = {
      ...localManager,
      access: { ...localManager.access, [module]: value },
    };
    setLocalManager(updated);
    onToggleAccess(localManager.id, module, value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-[#e91e63] mb-4">
          Manage Access for {localManager.name}
        </h2>

        <AccessibilityList
          managers={[localManager]}
          onToggleAccess={handleToggle}
        />

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#e91e63] text-white rounded-md hover:bg-[#c2185b]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessModal;
