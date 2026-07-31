import React from "react";

// Shared prev/next pager for the admin list pages. `meta` is what every
// list* adminApi call now returns: { total, page, limit, totalPages }.
const AdminPagination = ({ meta, onPageChange }) => {
  if (!meta || meta.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
      <p>
        ทั้งหมด {meta.total} รายการ · หน้า {meta.page}/{meta.totalPages}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={meta.page <= 1}
          className="px-3 py-1 rounded-lg border disabled:opacity-40 hover:bg-gray-50"
        >
          ก่อนหน้า
        </button>
        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={meta.page >= meta.totalPages}
          className="px-3 py-1 rounded-lg border disabled:opacity-40 hover:bg-gray-50"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;
