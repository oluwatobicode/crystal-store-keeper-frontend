import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import type { UsersData } from "../types/User";

export const useUsers = () => {
  const queryClient = useQueryClient();

  // all users
  const allUsers = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () =>
      await api.get("/users", {
        withCredentials: true,
      }),
  });

  //   create a user
  const createUser = useMutation({
    mutationFn: async (data: UsersData) => {
      await api.post("/users", data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  // delete a user
  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      const response = await api.delete(`/users/${userId}`, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  const updateUser = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<UsersData>;
    }) => {
      const response = await api.patch(`/users/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  return { allUsers, createUser, deleteUser, updateUser };
};
