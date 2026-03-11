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
