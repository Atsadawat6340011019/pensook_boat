import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const UnloggedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/feed" /> : <Outlet />;
};
