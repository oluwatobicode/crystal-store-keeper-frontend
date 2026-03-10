import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useDashboard = () => {
  const stats = useQuery({
    queryKey: ["stats"],
    queryFn: async () =>
      await api.get("/dashboard/analysis", {
        withCredentials: true,
      }),
  });

  const recentSales = useQuery({
    queryKey: ["sales"],
    queryFn: async () =>
      await api.get("/dashboard/recent-transactions", {
        withCredentials: true,
      }),
  });

  const lowStocks = useQuery({
    queryKey: ["lowStocks"],
    queryFn: async () =>
      await api.get("/dashboard/low-stock", {
        withCredentials: true,
      }),
  });

  return { stats, recentSales, lowStocks };
};
