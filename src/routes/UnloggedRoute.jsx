import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

export const UnloggedRoute = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();

  return token && id ? (
    <Navigate to={`/feed/${id}`} />
  ) : token ? (
    <Navigate to="/feed" />
  ) : (
    <Outlet />
  );
};
