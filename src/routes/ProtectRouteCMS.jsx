import React from "react";
import { Outlet } from "react-router-dom";
import useEcomStore from "../store/eom-store";
import LoadingToRedirect from "./LoadingToRedirect";

// Top-level guard for the whole /admin tree: lets in "admin" AND "staff"
// (unlike the old all-or-nothing ProtectRouteAdmin). Which specific pages
// each of them can actually see/use is then narrowed per-route by
// RequireAdmin / RequirePermission, and the sidebar hides links they can't
// use anyway (see AdminLayout.jsx) - this guard is just "are you CMS staff
// at all".
const ProtectRouteCMS = () => {
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  if (user && token && (user.role === "admin" || user.role === "staff")) {
    return <Outlet />;
  }
  return <LoadingToRedirect to="/login" />;
};

export default ProtectRouteCMS;
