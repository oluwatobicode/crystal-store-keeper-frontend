import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import type { CreateCustomerData } from "../types/Customers";

type UpdateCustomerData = Partial<CreateCustomerData>;

export const useCustomers = () => {
  const queryClient = useQueryClient();

  //   getting all customers
  const allCustomers = useQuery({
    queryKey: ["allCustomers"],
    queryFn: async () =>
      await api.get("/customers", {
        withCredentials: true,
      }),
  });

  const createCustomer = useMutation({
    mutationFn: async (data: CreateCustomerData) =>
      await api.post("/customers", data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCustomers"] });
    },
  });

  const updateCustomer = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCustomerData;
    }) =>
      await api.patch(`/customers/${id}`, data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCustomers"] });
    },
  });

  return { allCustomers, createCustomer, updateCustomer };
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: async () =>
      await api.get(`/customers/${id}`, {
        withCredentials: true,
      }),
    enabled: !!id,
  });
};
