import * as z from "zod";

export const SupplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
});

export type SupplierFormData = z.infer<typeof SupplierSchema>;

export interface Supplier extends SupplierFormData {
  _id: string;
  businessId: string;
  createdAt: string;
  updatedAt: string;
}
