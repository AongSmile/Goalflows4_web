import React from "react";
import { Outlet } from "react-router-dom";
import useEcomStore from "../store/eom-store";
import AccessDenied from "../components/admin/AccessDenied";

// Nested guard for a specific permission key (product.*, article.*) inside
// /admin. Admins always pass (see hasPermission in the store); staff pass
// only if their assigned Role was granted this exact key.
//
// Usage in AppRoutes.jsx:
//   { element: <RequirePermission permission="product.create" />, children: [...] }
const RequirePermission = ({ permission }) => {
  const hasPermission = useEcomStore((state) => state.hasPermission);
  if (hasPermission(permission)) {
    return <Outlet />;
  }
  return <AccessDenied />;
};

export default RequirePermission;
