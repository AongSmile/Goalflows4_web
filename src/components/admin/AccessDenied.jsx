import React from "react";

// Shown (not redirected!) when a logged-in staff/user hits a CMS route they
// don't have permission for - unlike LoadingToRedirect, this person IS
// authenticated, they just lack a specific permission, so bouncing them to
// /login would be confusing. They can still use the rest of the sidebar.
const AccessDenied = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-2 text-center">
    <p className="text-2xl">🔒</p>
    <p className="text-lg font-semibold text-[#003b6e]">ไม่มีสิทธิ์เข้าถึงหน้านี้</p>
    <p className="text-sm text-gray-500">
      กรุณาติดต่อผู้ดูแลระบบหากคิดว่าควรมีสิทธิ์เข้าถึง
    </p>
  </div>
);

export default AccessDenied;
