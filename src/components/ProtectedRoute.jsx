import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, role } = useContext(AuthContext);

  const isUserPath = location.pathname.includes("users");
  const isCaptainPath = location.pathname.includes("captains");

  if (!user || (isUserPath && role !== "user") || (isCaptainPath && role !== "captain")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;