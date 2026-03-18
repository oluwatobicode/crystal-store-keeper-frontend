import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const getNotifications = useQuery({
    queryKey: ["allNotifications"],
    queryFn: async () =>
      await api.get("notifications", {
        withCredentials: true,
      }),
    staleTime: 0,
    gcTime: 0,
  });

  const markAllNotificationsRead = useMutation({
    mutationKey: ["allNotifications"],
    mutationFn: async () => await api.patch(`notifications/read-all`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotifications"] });
    },
  });

  const markNotificationRead = useMutation({
    mutationKey: ["allNotifications"],
    mutationFn: async (id: string) =>
      await api.patch(`notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotifications"] });
    },
  });

  const deleteNotifications = useMutation({
    mutationKey: ["allNotifications"],
    mutationFn: async (id: string) => await api.delete(`notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotifications"] });
    },
  });

  const deleteAllNotifications = useMutation({
    mutationKey: ["allNotifications"],
    mutationFn: async () => await api.delete(`notifications`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotifications"] });
    },
  });

  const notificationCount = useQuery({
    queryKey: ["notificationCount"],
    queryFn: async () =>
      await api.get("notifications/unread-count", {
        withCredentials: true,
      }),
    staleTime: 0,
    gcTime: 0,
  });

  return {
    getNotifications,

    markAllNotificationsRead,
    markNotificationRead,
    deleteNotifications,
    deleteAllNotifications,
    notificationCount,
  };
};
