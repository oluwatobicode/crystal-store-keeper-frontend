import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

type ProtectedRoutesProps = {
  children: React.ReactNode;
  requiredPermission?: string;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  children,
  requiredPermission,
}) => {
  const { state } = useAuth();

  // not logged in → redirect to login
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // logged in but lacks required permission → redirect to dashboard
  if (requiredPermission) {
    const hasPermission =
      state.userData?.permissions?.includes(requiredPermission);
    if (!hasPermission) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
