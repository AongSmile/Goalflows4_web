import React from "react";

// Shared enable/disable pill-button for the admin list tables (Category,
// Subcategory, Brand, Article all have a boolean `status` now).
const StatusToggle = ({ status, onToggle }) => (
  <button
    onClick={onToggle}
    className={`text-xs px-2 py-1 rounded-lg ${
      status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
    }`}
  >
    {status ? "เปิดใช้งาน" : "ปิดใช้งาน"}
  </button>
);

export default StatusToggle;
