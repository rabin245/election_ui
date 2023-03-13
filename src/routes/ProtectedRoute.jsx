import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);

  if (!isAdmin) return <Navigate to="/" replace={true} />;
  return children;
};

export default ProtectedRoute;
