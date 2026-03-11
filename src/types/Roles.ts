import z from "zod";

export interface Roles {
  _id: string;
  roleName: string;
  description: string;
  permissions: string[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRole {
  roleName: string;
  description?: string;
  permissions: string[];
}

export const roleSchema = z.object({
  roleName: z.string().min(3, "Role Name is required"),
  description: z.string().optional(),
});

export type RoleFormData = z.infer<typeof roleSchema>;

export interface CustomRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleToEdit?: Roles | null;
}
