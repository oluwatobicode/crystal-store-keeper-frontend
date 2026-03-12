import z from "zod";

export interface Products {
  _id: string;
  name: string;
  brand: string;
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
  createdAt: string;
  updatedAt: string;
}

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  location: z.string().min(1, "Location is required"),
  unit: z.string().min(1, "Unit is required"),
  SKU: z.string().min(1, "SKU is required"),
  currentStock: z.number().min(0, "Current stock must be at least 0"),
  reorderLevel: z.number().min(0, "Reorder level must be at least 0"),
  preferredStockLevel: z
    .number()
    .min(0, "Preferred stock level must be at least 0"),
  purchaseCost: z.number().min(0, "Purchase cost must be at least 0"),
  sellingPrice: z.number().min(0, "Selling price must be at least 0"),
  supplierId: z.string().optional(),
  isActive: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}
