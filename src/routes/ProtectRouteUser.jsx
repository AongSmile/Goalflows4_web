import React from "react";
import { Outlet } from "react-router-dom";
import useEcomStore from "../store/eom-store";
import LoadingToRedirect from "./LoadingToRedirect";

// Wrap any route tree that requires a logged-in user (any role).
const ProtectRouteUser = () => {
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  if (user && token) {
    return <Outlet />;
  }
  return <LoadingToRedirect to="/login" />;
};

export default ProtectRouteUser;
