import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import type { SaleDetailResponse, SalesResponse } from "../types/SalesRecord";

export const useSaleById = (id: string | null) =>
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

export const useSales = () => {
  const queryClient = useQueryClient();

  const allSales = useQuery({
    queryKey: ["allSales"],
    queryFn: async (): Promise<SalesResponse> => {
      const response = await api.get("/sales", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const createSale = useMutation({
    mutationFn: async (saleData: {
      items: { productId: string; quantity: number }[];
      payments: {
        method: "cash" | "pos" | "bank_transfer" | "credit";
        amount: number;
        reference: string | null;
      }[];
      discountAmount: number;
      customerId: string | null;
      vatRate: number;
      vatAmount: number;
    }) => {
      const response = await api.post("/sales", saleData, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSales"] });
      // Also invalidate products since stock changed
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
  });

  return { allSales, createSale };
};
