import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import type { SupplierFormData } from "../types/Supplier";

export const useSuppliers = () => {
  const queryClient = useQueryClient();

  const allSuppliers = useQuery({
    queryKey: ["allSuppliers"],
    queryFn: async () =>
      await api.get("/suppliers", {
        withCredentials: true,
      }),
  });

  const createSupplier = useMutation({
    mutationFn: async (data: SupplierFormData) =>
      await api.post("/suppliers", data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSuppliers"] });
    },
  });

  const updateSupplier = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<SupplierFormData>;
    }) =>
      await api.patch(`/suppliers/${id}`, data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSuppliers"] });
    },
  });

  const deleteSupplier = useMutation({
    mutationFn: async (id: string) =>
      await api.delete(`/suppliers/${id}`, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSuppliers"] });
    },
  });

  return { allSuppliers, createSupplier, updateSupplier, deleteSupplier };
};
