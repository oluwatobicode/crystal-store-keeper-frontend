import z from "zod";

interface Role {
  _id: string;
  businessId: string;
  roleName: string;
  description: string;
  permissions: string[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersData {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  role: Role;
  contactNumber: string;
  status: string;
  mustChangePassword: boolean;
  lastLogin: string | null;
  businessId: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AllUsersProps {
  onAddUserClick: () => void;
  onEditClick: (user: UsersData) => void;
  onDeleteClick: (user: UsersData) => void;
  onViewClick: (user: UsersData) => void;
}

export const userSchema = z
  .object({
    fullname: z.string().min(3, "Full Name is required"),
    email: z.string().email("Email must be valid"),
    username: z.string().min(3, "Username is required"),
    role: z.string().min(1, "Please select a role"),
    contactNumber: z.string().optional(),
    status: z.string().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserFormData = z.infer<typeof userSchema>;

export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit?: UsersData | null;
}
