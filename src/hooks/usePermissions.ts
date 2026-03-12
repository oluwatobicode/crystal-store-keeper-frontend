import { useAuth } from "../contexts/AuthProvider";

export const usePermission = () => {
  const { state } = useAuth();
  const permissions = state.userData?.permissions ?? [];

  const can = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  const canAny = (perms: string[]): boolean => {
    return perms.some((p) => permissions.includes(p));
  };

  return { can, canAny };
};
