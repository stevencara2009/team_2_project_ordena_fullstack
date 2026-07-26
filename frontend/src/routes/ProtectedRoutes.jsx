import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/Loader/Loader";
import AccessDenied from "../components/AccessDenied/AccessDenied";


export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  // No loguedo
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Sin permisos
  if (!allowedRoles.includes(user.role)) {
    return (
      <AccessDenied />
    )
  }

  return children;
};
