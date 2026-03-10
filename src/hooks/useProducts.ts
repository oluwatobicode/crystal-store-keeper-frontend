import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

interface CreateProductData {
  name: string;
  SKU: string;
  brand: string;
  location: string;
  unit: string;
  reorderLevel: number;
  preferredStockLevel: number;
  currentStock: number;
}

export const useProducts = () => {
  const queryClient = useQueryClient();

  // getting all the products
  const allProducts = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () =>
      await api.get("/products", {
        withCredentials: true,
      }),
  });

  // create a product
  const createProduct = useMutation({
    mutationFn: async (data: CreateProductData) =>
      await api.post("/products", data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
  });

  // for low stocks
  const lowStockProducts = useQuery({
    queryKey: ["low-stock-products"],
    queryFn: async () =>
      await api.get("/inventory/low-stock", {
        withCredentials: true,
      }),
  });

  return { allProducts, lowStockProducts, createProduct };
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () =>
      await api.get(`/products/${id}`, {
        withCredentials: true,
      }),
    enabled: !!id,
  });
};
