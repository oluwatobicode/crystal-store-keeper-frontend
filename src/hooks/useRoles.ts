import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

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
    mutationFn: async (data) => {
      await api.post("/roles", data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRoles"] });
    },
  });

  return { allRoles, createRole };
};
