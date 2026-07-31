import React from "react";
import { Outlet } from "react-router-dom";
import useEcomStore from "../store/eom-store";
import AccessDenied from "../components/admin/AccessDenied";

// Nested guard for admin-only screens inside /admin (Category, Subcategory,
// Brand, User, Role & Permission - per the spec, Staff never gets these no
// matter what). Unlike ProtectRouteCMS/ProtectRouteAdmin, this assumes
// you're already authenticated (ProtectRouteCMS ran first) - a staff member
// hitting this just sees AccessDenied inline, not a redirect.
const RequireAdmin = () => {
  const user = useEcomStore((state) => state.user);
  if (user?.role === "admin") {
    return <Outlet />;
  }
  return <AccessDenied />;
};

export default RequireAdmin;
