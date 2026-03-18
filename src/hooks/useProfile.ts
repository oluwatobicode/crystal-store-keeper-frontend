import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export const useProfile = () => {
  const queryClient = useQueryClient();

  const getProfile = useQuery({
    queryKey: ["profile"],
    queryFn: async () =>
      await api.get("users/me", {
        withCredentials: true,
      }),
    staleTime: 0,
    gcTime: 0,
  });

  const updateAvatar = useMutation({
    mutationFn: async (formData: FormData) =>
      await api.patch("users/me/avatar", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const updatePassword = useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
    }) =>
      await api.patch("users/me/password", data, {
        withCredentials: true,
      }),
  });

  return { getProfile, updateAvatar, updatePassword };
};
