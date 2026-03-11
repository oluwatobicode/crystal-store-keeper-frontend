import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import type { SaleDetailResponse, SalesResponse } from "../types/SalesRecord";

export const useSales = () => {
  const allSales = useQuery({
    queryKey: ["allSales"],
    queryFn: async (): Promise<SalesResponse> => {
      const response = await api.get("/sales", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const getSaleById = (id: string | null) =>
    useQuery({
      queryKey: ["sale", id],
      queryFn: async (): Promise<SaleDetailResponse> => {
        const response = await api.get(`/sales/${id}`, {
          withCredentials: true,
        });
        return response.data;
      },
      enabled: !!id,
    });

  return { allSales, getSaleById };
};
