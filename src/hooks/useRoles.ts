import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import type { CreateRole } from "../types/Roles";

export const useRoles = () => {
  const queryClient = useQueryClient();

  // getting all roles
  const allRoles = useQuery({
    queryKey: ["allRoles"],
    queryFn: async () =>
      await api.get("/roles", {
        withCredentials: true,
      }),
  });

  const createRole = useMutation({
    mutationFn: async (data: CreateRole) =>
      await api.post("/roles", data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRoles"] });
    },
  });

  const deleteRole = useMutation({
    mutationFn: async (id: string) =>
      await api.delete(`roles/${id}`, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRoles"] });
    },
  });

  const editRoles = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CreateRole }) =>
      await api.patch(`roles/${id}`, data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRoles"] });
    },
  });

  return { allRoles, createRole, deleteRole, editRoles };
};
