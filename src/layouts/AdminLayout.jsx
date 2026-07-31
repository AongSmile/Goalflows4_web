import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useEcomStore from "../store/eom-store";

// Each item's `show` decides whether it appears in the sidebar at all - per
// the spec, a Staff member should never even SEE a menu entry they can't
// use (not just be blocked after clicking). `requiresAdmin` items are
// admin-only regardless of any permission; `permission` items check that
// specific key (admins always pass, via hasPermission()).
const navItems = [
  { to: "/admin", label: "ภาพรวม", end: true, permission: "dashboard.view" },
  { to: "/admin/products", label: "สินค้า", permission: "product.view" },
  { to: "/admin/categories", label: "หมวดหมู่", requiresAdmin: true },
  { to: "/admin/brands", label: "แบรนด์", requiresAdmin: true },
  { to: "/admin/orders", label: "ออร์เดอร์", requiresAdmin: true },
  { to: "/admin/users", label: "ผู้ใช้", requiresAdmin: true },
  { to: "/admin/roles", label: "จัดการสิทธิ์", requiresAdmin: true },
  { to: "/admin/articles", label: "บทความ", permission: "article.view" },
];

const AdminLayout = () => {
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);
  const hasPermission = useEcomStore((state) => state.hasPermission);
  const hydrateUser = useEcomStore((state) => state.hydrateUser);
  const navigate = useNavigate();

  // Refresh permissions on every visit to the admin panel, so a Staff
  // member whose Role an admin just edited sees the up-to-date sidebar
  // without needing to log out/in (see the long comment in eom-store.jsx).
  useEffect(() => {
    hydrateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleItems = navItems.filter((item) => {
    if (item.requiresAdmin) return user?.role === "admin";
    if (item.permission) return hasPermission(item.permission);
    return true;
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-56 bg-[#003b6e] text-white flex flex-col shrink-0">
        <div className="p-4 border-b border-white/10">
          <p className="font-bold">GoalFlows Admin</p>
          {user?.email && <p className="text-xs text-white/70 mt-1">{user.email}</p>}
          {user?.role === "staff" && (
            <p className="text-[10px] text-white/50 mt-0.5">
              พนักงาน{user.roleName ? ` · ${user.roleName}` : ""}
            </p>
          )}
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm transition ${
                  isActive ? "bg-white text-[#003b6e] font-semibold" : "hover:bg-white/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/10"
          >
            ออกจากระบบ
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
