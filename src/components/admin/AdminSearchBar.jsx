import React from "react";

// Shared search box + status filter dropdown for the admin list pages.
// `status` is "" (all) | "true" (enabled only) | "false" (disabled only) -
// passed straight through as the API's ?status= param.
const AdminSearchBar = ({ search, onSearchChange, status, onStatusChange }) => (
  <div className="flex flex-col sm:flex-row gap-2 mb-4 max-w-xl">
    <input
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="ค้นหา..."
      className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b6e]"
    />
    {onStatusChange && (
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm"
      >
        <option value="">ทุกสถานะ</option>
        <option value="true">เปิดใช้งาน</option>
        <option value="false">ปิดใช้งาน</option>
      </select>
    )}
  </div>
);

export default AdminSearchBar;
