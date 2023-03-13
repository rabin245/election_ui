import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to="/" replace={true} />;
  return children;
};

export default ProtectedAuthRoute;
