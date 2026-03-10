import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useReports = () => {
  // sales analysis report
  const salesAnalysis = useQuery({
    queryKey: ["salesAnalysis"],
    queryFn: async () =>
      await api.get("/reports/sales-analysis", {
        withCredentials: true,
      }),
  });

  // product analysis report
  const productAnalysis = useQuery({
    queryKey: ["productAnalysis"],
    queryFn: async () =>
      await api.get("/reports/product-analysis", {
        withCredentials: true,
      }),
  });

  // payment method analysis report
  const paymentMethodAnalysis = useQuery({
    queryKey: ["paymentMethodAnalysis"],
    queryFn: async () =>
      await api.get("/reports/payment-method", {
        withCredentials: true,
      }),
  });

  // stock movement report
  const stockMovement = useQuery({
    queryKey: ["stockMovement"],
    queryFn: async () =>
      await api.get("/reports/stock-movement", {
        withCredentials: true,
      }),
  });

  return {
    salesAnalysis,
    productAnalysis,
    paymentMethodAnalysis,
    stockMovement,
  };
};
