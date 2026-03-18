import { z } from "zod";

export interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export type PasswordFormData = z.infer<typeof PasswordSchema>;
