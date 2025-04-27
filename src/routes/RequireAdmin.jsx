import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RequireAdmin = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!auth.roles.includes("ADMIN")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
