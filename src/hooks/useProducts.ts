import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

interface CreateProductData {
  name: string;
  brand: string;
  businessId?: string;
  location: string;
  unit: string;
  SKU: string;
  currentStock: number;
  reorderLevel: number;
  preferredStockLevel: number;
  purchaseCost: number;
  sellingPrice: number;
  supplierId?: string;
  isActive: boolean;
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

  // receive stock
  const receiveStock = useMutation({
    mutationFn: async (data: {
      productId: string;
      quantity: number;
      supplierId: string;
      notes?: string;
    }) =>
      await api.post("/inventory/receive", data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      queryClient.invalidateQueries({ queryKey: ["low-stock-products"] });
    },
  });

  // adjust stock
  const adjustStock = useMutation({
    mutationFn: async (data: {
      productId: string;
      adjustmentType: string;
      quantityChange: number;
      reason: string;
    }) =>
      await api.post("/inventory/adjust", data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      queryClient.invalidateQueries({ queryKey: ["low-stock-products"] });
    },
  });

  return {
    allProducts,
    lowStockProducts,
    createProduct,
    receiveStock,
    adjustStock,
  };
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
