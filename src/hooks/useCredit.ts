import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import toast from "react-hot-toast";
import type { CreditSale, Repayment } from "../types/Customers";
import { AxiosError } from "axios";

export interface CreditHistory {
  creditLimit: number;
  currentBalance: number;
  creditSales: CreditSale[];
  repayments: Repayment[];
}

export const useCredit = (customerId: string | undefined) => {
  const queryClient = useQueryClient();

  const creditHistory = useQuery({
    queryKey: ["creditHistory", customerId],
    queryFn: async () => {
      const response = await api.get(
        `/credit/customer/${customerId}/credit-history`,
      );
      return response.data;
    },
    enabled: !!customerId,
  });

  const recordRepayment = useMutation({
    mutationFn: async (data: {
      customerId: string;
      amount: number;
      paymentMethod: "cash" | "bank_transfer";
      reference?: string;
      note?: string;
    }) => {
      const response = await api.post("/credit/record-repayment", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["creditHistory", customerId],
      });
      queryClient.invalidateQueries({ queryKey: ["allCustomers"] });
      queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
      toast.success("Repayment recorded successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message || "Failed to record repayment",
      );
    },
  });

  return { creditHistory, recordRepayment };
};
