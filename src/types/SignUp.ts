import z from "zod";

export const SignUpSchema = z.object({
  // Business Details
  businessName: z.string().min(2, "Business name is required"),
  businessEmail: z.string().email("Invalid business email"),
  businessPhone: z.string().min(10, "Invalid business phone number"),
  businessAddress: z.string().min(5, "Business address is required"),
  businessLogo: z.string().optional(),
  // Owner Details
  ownerFullname: z.string().min(2, "Full name is required"),
  ownerUsername: z.string().min(3, "Username must be at least 3 characters"),
  ownerEmail: z.string().email("Invalid owner email"),
  ownerPassword: z.string().min(5, "Password must be at least 5 characters"),
  ownerPhone: z.string().min(10, "Invalid owner phone number"),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;
