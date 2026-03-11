import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export const useSettings = () => {
  const queryClient = useQueryClient();

  const getSettings = useQuery({
    queryKey: ["settings"],
    queryFn: async () =>
      await api.get("/settings", {
        withCredentials: true,
      }),
  });

  const updateSettings = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const response = await api.patch("/settings", data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  const generateTelegramCode = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        "/settings/telegram/generate-code",
        {},
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return { getSettings, updateSettings, generateTelegramCode };
};
